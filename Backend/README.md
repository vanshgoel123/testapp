# Loan Default Prediction - FastAPI Backend

FastAPI backend for the Information-Theoretic ML Loan Default Prediction model.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Copy model files** from `saved_models/` directory:
   - `encoder.h5`
   - `preprocessor.joblib`
   - `bottleneck_scaler.joblib`
   - `classifier.joblib`
   - `metadata.joblib` (optional)

3. **Run the server:**
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /predict` - Predict loan default probability

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Model Files Required

You need these files from the `saved_models/` directory:
1. `encoder.h5` - Keras encoder model (Information Bottleneck)
2. `preprocessor.joblib` - Data preprocessing pipeline
3. `bottleneck_scaler.joblib` - Scaler for bottleneck features
4. `classifier.joblib` - Logistic Regression classifier
5. `metadata.joblib` - Metadata (optional, but recommended)

