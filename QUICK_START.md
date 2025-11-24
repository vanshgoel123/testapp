# 🚀 Quick Start Guide

## Step 1: Generate Model Files

First, run the Jupyter notebook to train and save models:

```bash
# Open and run: ITML_Loan_Default.ipynb
# Execute all cells, especially the model saving cell
```

This creates the `saved_models/` directory with all required files.

## Step 2: Set Up Backend

### Option A: Copy Models to Backend (Recommended)

```bash
cd Backend
python copy_models.py  # Copies models from parent directory
```

### Option B: Manual Copy

Copy these 4 files to `Backend/saved_models/`:
- `encoder.h5`
- `preprocessor.joblib`
- `bottleneck_scaler.joblib`
- `classifier.joblib`

### Install Dependencies and Run

```bash
cd Backend
pip install -r requirements.txt
python main.py
```

✅ Backend running at: `http://localhost:8000`

## Step 3: Set Up Frontend

```bash
cd Frontend
npm install
npm run dev
```

✅ Frontend running at: `http://localhost:3000`

## Step 4: Test the Application

1. Open `http://localhost:3000` in your browser
2. Fill out the loan application form
3. Click "Predict Default Risk"
4. View the prediction results!

## 📋 Checklist

- [ ] Model files generated from notebook
- [ ] Models copied to `Backend/saved_models/`
- [ ] Backend dependencies installed
- [ ] Backend server running (port 8000)
- [ ] Frontend dependencies installed
- [ ] Frontend server running (port 3000)

## 🐛 Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Verify all 4 model files exist in `Backend/saved_models/`
- Run: `pip install -r requirements.txt`

### Frontend can't connect to API
- Verify backend is running: `http://localhost:8000/health`
- Check CORS settings in `Backend/main.py`

### Models not found
- Run `python Backend/copy_models.py`
- Or manually copy files from `saved_models/` to `Backend/saved_models/`

## 📦 Files You Need

**Minimum 4 files** in `Backend/saved_models/`:
1. ✅ `encoder.h5`
2. ✅ `preprocessor.joblib`
3. ✅ `bottleneck_scaler.joblib`
4. ✅ `classifier.joblib`

See `DEPLOYMENT_FILES.md` for details.

