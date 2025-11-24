import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../landing.css'

function Landing() {
  const navigate = useNavigate()

  const handlePredictNow = () => {
    navigate('/predict')
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              🏦 AI-Powered Loan Default Prediction
            </h1>
            <p className="hero-subtitle">
              Advanced Information-Theoretic Machine Learning Model
            </p>
            <p className="hero-description">
              Predict loan default risk with cutting-edge ML techniques including
              Mutual Information, Shannon Entropy, Information Bottleneck, and Information Gain.
              Make data-driven lending decisions in seconds.
            </p>
            <button className="btn-hero" onClick={handlePredictNow}>
              🔮 Predict Now
            </button>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <div className="illustration-card">
                <div className="card-icon">📊</div>
                <h3>Smart Analysis</h3>
              </div>
              <div className="illustration-card">
                <div className="card-icon">⚡</div>
                <h3>Instant Results</h3>
              </div>
              <div className="illustration-card">
                <div className="card-icon">🎯</div>
                <h3>Accurate Predictions</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Information-Theoretic ML Pipeline</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Mutual Information</h3>
              <p>
                Automatically selects the most informative features using information theory,
                reducing dimensionality while preserving predictive power.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌀</div>
              <h3>Shannon Entropy</h3>
              <p>
                Quantifies borrower risk instability through entropy analysis,
                identifying unpredictable financial profiles.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Information Bottleneck</h3>
              <p>
                Compresses features into a minimal representation using deep learning,
                retaining only information relevant for default prediction.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌳</div>
              <h3>Information Gain</h3>
              <p>
                Provides interpretable insights through entropy-based decision trees,
                explaining which features matter most for predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">74.88%</div>
              <div className="stat-label">ROC AUC Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">88.45%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">16</div>
              <div className="stat-label">Input Features</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">ITML Techniques</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Predict Loan Default Risk?</h2>
          <p>Get instant, accurate predictions powered by Information-Theoretic Machine Learning</p>
          <button className="btn-hero btn-large" onClick={handlePredictNow}>
            Start Predicting →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Loan Default Prediction System | Information Theory in Machine Learning</p>
          <p className="footer-subtitle">Powered by Mutual Information, Shannon Entropy, Information Bottleneck & Information Gain</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing

