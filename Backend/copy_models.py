"""Helper script to copy model files from ../Model to Backend/Model."""
import shutil
from pathlib import Path

def copy_models():
    source_dir = Path("../Model")
    dest_dir = Path("Model")
    
    # Create destination directory
    dest_dir.mkdir(exist_ok=True)
    
    # Required files
    required_files = [
        "encoder.h5",
        "preprocessor.joblib",
        "bottleneck_scaler.joblib",
        "classifier.joblib"
    ]
    
    # Optional files
    optional_files = [
        "metadata.joblib",
        "autoencoder.h5"
    ]
    
    print("Copying model files...")
    print(f"Source: {source_dir.absolute()}")
    print(f"Destination: {dest_dir.absolute()}\n")
    
    copied = []
    missing = []
    
    # Copy required files
    for file in required_files:
        source = source_dir / file
        dest = dest_dir / file
        
        if source.exists():
            shutil.copy2(source, dest)
            copied.append(file)
            print(f"✅ Copied: {file}")
        else:
            missing.append(file)
            print(f"❌ Missing: {file}")
    
    # Copy optional files
    for file in optional_files:
        source = source_dir / file
        dest = dest_dir / file
        
        if source.exists():
            shutil.copy2(source, dest)
            copied.append(file)
            print(f"✅ Copied (optional): {file}")
    
    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Copied: {len(copied)} files")
    if missing:
        print(f"  Missing: {len(missing)} required files")
        print(f"  Please generate models first by running the notebook!")
    else:
        print(f"  ✅ All required files copied successfully!")
    print(f"{'='*50}")

if __name__ == "__main__":
    copy_models()

