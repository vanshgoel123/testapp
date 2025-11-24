from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from scipy.stats import entropy
import os
import warnings
from pathlib import Path

# Suppress sklearn version mismatch warnings (models saved with older version)
warnings.filterwarnings('ignore', category=UserWarning, module='sklearn')

# Import sklearn modules needed for joblib-loaded models
try:
    from sklearn.preprocessing import StandardScaler, OneHotEncoder
    from sklearn.impute import SimpleImputer
    from sklearn.compose import ColumnTransformer
    from sklearn.linear_model import LogisticRegression
except ImportError as e:
    raise ImportError(f"sklearn (scikit-learn) is not installed. Please run: pip install scikit-learn\nError: {e}")

app = FastAPI(
    title="Loan Default Prediction API",
    description="Information-Theoretic ML Model for Predicting Loan Defaults",
    version="1.0.0"
)

# CORS middleware to allow React frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models (lazy loading)
# Model files are in the Model folder (parent directory)
# Resolve to absolute path to avoid issues when running from different directories
BACKEND_DIR = Path(__file__).parent.resolve()
MODEL_DIR = (BACKEND_DIR.parent / "Model").resolve()
encoder = None
preprocessor = None
scaler_z = None
classifier = None
metadata = None


def load_models():
    """Load all model components"""
    global encoder, preprocessor, scaler_z, classifier, metadata
    
    if encoder is None:
        encoder_path = MODEL_DIR / "encoder.h5"
        if not encoder_path.exists():
            raise FileNotFoundError(f"Encoder model not found at {encoder_path}")
        encoder = tf.keras.models.load_model(str(encoder_path))
    
    if preprocessor is None:
        preprocessor_path = MODEL_DIR / "preprocessor.joblib"
        if not preprocessor_path.exists():
            raise FileNotFoundError(f"Preprocessor not found at {preprocessor_path}")
        preprocessor = joblib.load(str(preprocessor_path))
    
    if scaler_z is None:
        scaler_path = MODEL_DIR / "bottleneck_scaler.joblib"
        if not scaler_path.exists():
            raise FileNotFoundError(f"Scaler not found at {scaler_path}")
        scaler_z = joblib.load(str(scaler_path))
    
    if classifier is None:
        classifier_path = MODEL_DIR / "classifier.joblib"
        if not classifier_path.exists():
            raise FileNotFoundError(f"Classifier not found at {classifier_path}")
        classifier = joblib.load(str(classifier_path))
    
    if metadata is None:
        metadata_path = MODEL_DIR / "metadata.joblib"
        if metadata_path.exists():
            metadata = joblib.load(str(metadata_path))


def compute_risk_entropy(row_data: dict) -> float:
    """Compute borrower-level risk entropy feature"""
    def categorize_credit(score):
        if score < 580:
            return 'risky'
        if score < 670:
            return 'neutral'
        return 'safe'
    
    def categorize_dti(dti):
        if dti > 0.45:
            return 'risky'
        if dti > 0.25:
            return 'neutral'
        return 'safe'
    
    def categorize_tenure(months):
        if months < 12:
            return 'risky'
        if months < 60:
            return 'neutral'
        return 'safe'
    
    def collateral_proxy(row):
        if row.get('HasMortgage') == 'Yes' or row.get('HasCoSigner') == 'Yes':
            return 'safe'
        return 'neutral'
    
    buckets = [
        categorize_credit(row_data['CreditScore']),
        categorize_dti(row_data['DTIRatio']),
        categorize_tenure(row_data['MonthsEmployed']),
        collateral_proxy(row_data)
    ]
    
    counts = pd.Series(buckets).value_counts()
    probs = counts.reindex(['risky', 'neutral', 'safe'], fill_value=0).to_numpy(dtype=float)
    if probs.sum() == 0:
        return 0.0
    probs = probs / probs.sum()
    return entropy(probs, base=2)


# Pydantic models for request/response
class LoanFeatures(BaseModel):
    Age: int = Field(..., ge=18, le=100, description="Borrower's age")
    Income: float = Field(..., ge=0, description="Annual income")
    LoanAmount: float = Field(..., ge=0, description="Loan amount requested")
    CreditScore: int = Field(..., ge=300, le=850, description="Credit score")
    MonthsEmployed: int = Field(..., ge=0, description="Months at current employment")
    NumCreditLines: int = Field(..., ge=0, description="Number of credit lines")
    InterestRate: float = Field(..., ge=0, le=100, description="Interest rate (%)")
    LoanTerm: int = Field(..., ge=1, description="Loan term in months")
    DTIRatio: float = Field(..., ge=0, le=1, description="Debt-to-income ratio")
    Education: Literal["High School", "Bachelor's", "Master's", "Doctorate"] = Field(..., description="Education level")
    EmploymentType: Literal["Full-time", "Part-time", "Self-employed", "Unemployed"] = Field(..., description="Employment type")
    MaritalStatus: Literal["Single", "Married", "Divorced"] = Field(..., description="Marital status")
    HasMortgage: Literal["Yes", "No"] = Field(..., description="Has mortgage")
    HasDependents: Literal["Yes", "No"] = Field(..., description="Has dependents")
    LoanPurpose: Literal["Auto", "Business", "Education", "Home", "Other"] = Field(..., description="Loan purpose")
    HasCoSigner: Literal["Yes", "No"] = Field(..., description="Has co-signer")


class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="Predicted class: 0 = No Default, 1 = Default")
    probability: float = Field(..., description="Probability of default (0-1)")
    risk_level: str = Field(..., description="Risk level: Low, Medium, High")
    risk_entropy: float = Field(..., description="Computed risk entropy")


@app.on_event("startup")
async def startup_event():
    """Load models when server starts"""
    try:
        print(f"🔍 Looking for models in: {MODEL_DIR}")
        print(f"📁 Model directory exists: {MODEL_DIR.exists()}")
        if MODEL_DIR.exists():
            files = list(MODEL_DIR.glob("*.h5")) + list(MODEL_DIR.glob("*.joblib"))
            print(f"📄 Found {len(files)} model files: {[f.name for f in files]}")
        load_models()
        print("✅ All models loaded successfully!")
    except Exception as e:
        print(f"⚠️ Warning: Could not load models at startup: {e}")
        print(f"📍 Model directory path: {MODEL_DIR}")
        print(f"📍 Model directory absolute path: {MODEL_DIR.resolve()}")
        print("Models will be loaded on first prediction request.")


@app.get("/")
async def root():
    return {
        "message": "Loan Default Prediction API",
        "status": "active",
        "endpoints": {
            "predict": "/predict",
            "health": "/health"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        load_models()
        return {
            "status": "healthy",
            "models_loaded": encoder is not None and preprocessor is not None
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }


@app.post("/predict", response_model=PredictionResponse)
async def predict_default(features: LoanFeatures):
    """
    Predict loan default probability based on borrower features.
    
    Uses the Information Bottleneck model with:
    - Mutual Information feature selection
    - Shannon Entropy risk feature
    - Autoencoder compression
    - Logistic Regression classifier
    """
    try:
        # Ensure models are loaded
        load_models()
        
        # Convert Pydantic model to dict
        feature_dict = features.dict()
        
        # Compute risk entropy
        risk_entropy = compute_risk_entropy(feature_dict)
        feature_dict['RiskEntropy'] = risk_entropy
        
        # Create DataFrame with single row
        df = pd.DataFrame([feature_dict])
        
        # Drop LoanID and Default if present (they shouldn't be, but just in case)
        df = df.drop(columns=['LoanID', 'Default'], errors='ignore')
        
        # Preprocess
        X_processed = preprocessor.transform(df)
        
        # Encode to bottleneck representation
        Z = encoder.predict(X_processed, verbose=0)
        
        # Scale bottleneck features
        Z_scaled = scaler_z.transform(Z)
        
        # Predict
        probability = float(classifier.predict_proba(Z_scaled)[0, 1])
        prediction = int(classifier.predict(Z_scaled)[0])
        
        # Determine risk level
        if probability < 0.3:
            risk_level = "Low"
        elif probability < 0.6:
            risk_level = "Medium"
        else:
            risk_level = "High"
        
        return PredictionResponse(
            prediction=prediction,
            probability=round(probability, 4),
            risk_level=risk_level,
            risk_entropy=round(risk_entropy, 4)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

