# Loan/Card Default Prediction Model - Information-Theoretic ML

A complete full-stack application for predicting loan defaults using Information-Theoretic Machine Learning concepts: Mutual Information, Shannon Entropy, Information Bottleneck, and Information Gain.

## 📁 Project Structure

```
ITML/
├── Backend/                 # FastAPI backend
│   ├── main.py             # API server with prediction endpoint
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend setup instructions
├── Frontend/               # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Styling
│   ├── package.json       # Node.js dependencies
│   └── README.md         # Frontend setup instructions
├── saved_models/          # Model files (created after running notebook)
│   ├── encoder.h5         # ⭐ Required: Keras encoder
│   ├── autoencoder.h5     # Autoencoder (optional)
│   ├── preprocessor.joblib # ⭐ Required: Data preprocessor
│   ├── bottleneck_scaler.joblib # ⭐ Required: Feature scaler
│   ├── classifier.joblib  # ⭐ Required: Logistic regression
│   └── metadata.joblib    # Metadata (optional)
├── ITML_Loan_Default.ipynb # Jupyter notebook with full pipeline
└── Loan_default.csv        # Dataset
```

## 📦 Files to Download for Deployment

To deploy and use the model, you need to download these files from the `saved_models/` directory:

### ⭐ Required Files (Minimum):

1. **`encoder.h5`** (Keras model)
   - The Information Bottleneck encoder
   - Compresses features to 16-dimensional representation
   - Size: ~500KB - 2MB

2. **`preprocessor.joblib`** (sklearn pipeline)
   - Handles missing values, encoding, scaling
   - Essential for preprocessing input data
   - Size: ~500KB - 1MB

3. **`bottleneck_scaler.joblib`** (sklearn scaler)
   - StandardScaler for bottleneck features
   - Size: ~10KB

4. **`classifier.joblib`** (sklearn model)
   - Logistic Regression classifier
   - Makes final predictions
   - Size: ~50KB - 200KB

### 📋 Optional Files:

5. **`metadata.joblib`** - Feature names and metadata (helpful for debugging)
6. **`autoencoder.h5`** - Full autoencoder model (only needed for reconstruction tasks)

**Total size**: Approximately 1-4 MB

## 🚀 Quick Start

### Step 1: Generate Model Files

Run the Jupyter notebook `ITML_Loan_Default.ipynb` to train and save all model files to `saved_models/`.

### Step 2: Set Up Backend

```bash
cd Backend
pip install -r requirements.txt

# Copy model files to Backend/saved_models/ (or keep in parent saved_models/)
# Make sure these files exist:
# - encoder.h5
# - preprocessor.joblib
# - bottleneck_scaler.joblib
# - classifier.joblib

# Run the server
python main.py
```

The API will be available at `http://localhost:8000`

### Step 3: Set Up Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Deployment Options

### Local Development
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`
- Both run simultaneously

### Production Deployment

#### Option 1: Same Server
1. Build React app: `cd Frontend && npm run build`
2. Serve `dist/` folder as static files in FastAPI
3. Update CORS settings if needed

#### Option 2: Separate Servers
1. Deploy FastAPI to cloud (Heroku, AWS, GCP, etc.)
2. Deploy React to Netlify, Vercel, or similar
3. Update `API_URL` in `Frontend/src/App.jsx`

### Model Files Location

The backend looks for model files in:
- `Backend/saved_models/` (relative to main.py)
- Or update `MODEL_DIR` path in `Backend/main.py`

## 📊 API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /predict` - Predict loan default
  - Request: JSON with loan features
  - Response: Prediction, probability, risk level, risk entropy

See `http://localhost:8000/docs` for interactive API documentation.

## 🎯 Features

### Information-Theoretic Components

1. **Mutual Information**: Feature selection (top 15 features)
2. **Shannon Entropy**: Borrower-level risk entropy feature
3. **Information Bottleneck**: 16-dim compressed representation via autoencoder
4. **Information Gain**: Decision tree interpretability

### Web Interface

- Clean, modern UI
- Form validation
- Real-time predictions
- Visual risk indicators
- Responsive design

## 📝 Input Features

The model requires these 16 features:

- Age (18-100)
- Income (annual)
- LoanAmount
- CreditScore (300-850)
- MonthsEmployed
- NumCreditLines
- InterestRate (%)
- LoanTerm (months)
- DTIRatio (0-1)
- Education (High School, Bachelor's, Master's, Doctorate)
- EmploymentType (Full-time, Part-time, Self-employed, Unemployed)
- MaritalStatus (Single, Married, Divorced)
- HasMortgage (Yes/No)
- HasDependents (Yes/No)
- LoanPurpose (Auto, Business, Education, Home, Other)
- HasCoSigner (Yes/No)

## 🐛 Troubleshooting

### Backend Issues

- **Model files not found**: Check `saved_models/` directory exists with all required files
- **Import errors**: Run `pip install -r requirements.txt`
- **Port already in use**: Change port in `main.py` or kill process using port 8000

### Frontend Issues

- **Cannot connect to API**: Check backend is running on port 8000
- **CORS errors**: Update `allow_origins` in `Backend/main.py`
- **Build errors**: Run `npm install` again

## 📚 Documentation

- Backend: See `Backend/README.md`
- Frontend: See `Frontend/README.md`
- Model: See notebook `ITML_Loan_Default.ipynb`

## 🏆 Best Model Performance

**InfoBottleneck-LogReg** (Best Performing Model)
- ROC AUC: 0.7488
- Accuracy: 0.8845
- Uses Information Bottleneck compression + Logistic Regression

## 📄 License

This project is for educational purposes (Information Theory in ML course project).

