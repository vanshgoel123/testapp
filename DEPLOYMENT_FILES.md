# 📦 Files to Download for Model Deployment

## Required Model Files

Download these files from the `saved_models/` directory to use the prediction model:

### ✅ Essential Files (Must Have)

| File | Description | Size (approx.) | Location |
|------|-------------|----------------|----------|
| `encoder.h5` | Keras encoder model (Information Bottleneck) | 500KB - 2MB | `saved_models/encoder.h5` |
| `preprocessor.joblib` | Data preprocessing pipeline (imputation, encoding, scaling) | 500KB - 1MB | `saved_models/preprocessor.joblib` |
| `bottleneck_scaler.joblib` | StandardScaler for bottleneck features | ~10KB | `saved_models/bottleneck_scaler.joblib` |
| `classifier.joblib` | Logistic Regression classifier | 50KB - 200KB | `saved_models/classifier.joblib` |

### 📋 Optional Files (Recommended)

| File | Description | Size (approx.) | Location |
|------|-------------|----------------|----------|
| `metadata.joblib` | Feature names and metadata | ~50KB | `saved_models/metadata.joblib` |
| `autoencoder.h5` | Full autoencoder model | 500KB - 2MB | `saved_models/autoencoder.h5` |

## 📂 Where to Place Files

### For Backend Deployment:

Place all files in:
```
Backend/saved_models/
  ├── encoder.h5
  ├── preprocessor.joblib
  ├── bottleneck_scaler.joblib
  ├── classifier.joblib
  └── metadata.joblib (optional)
```

Or keep them in the parent directory and update `MODEL_DIR` in `Backend/main.py`:
```python
MODEL_DIR = Path("../saved_models")  # Adjust path as needed
```

## ✅ Verification

To verify all files are present, check:
```bash
# In Backend directory
ls saved_models/
```

Should show:
- ✅ encoder.h5
- ✅ preprocessor.joblib
- ✅ bottleneck_scaler.joblib
- ✅ classifier.joblib
- (optional) metadata.joblib

## 🚀 Quick Setup

1. **After running the notebook**, model files are in `saved_models/` directory
2. **Copy these 4 essential files** to `Backend/saved_models/`
3. **Start the backend**: `cd Backend && python main.py`
4. **Verify**: Visit `http://localhost:8000/health` - should return `"status": "healthy"`

## 📝 Notes

- All `.h5` files are Keras/TensorFlow models (HDF5 format)
- All `.joblib` files are scikit-learn objects (pickle-based)
- Total download size: ~1-4 MB
- These files are generated when you run the Jupyter notebook and execute the saving cell

