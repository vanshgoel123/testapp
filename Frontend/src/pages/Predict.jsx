import React, { useState } from 'react'
import axios from 'axios'
import '../index.css'

const API_URL = 'http://localhost:8000'

function Predict() {
  const [formData, setFormData] = useState({
    Age: '',
    Income: '',
    LoanAmount: '',
    CreditScore: '',
    MonthsEmployed: '',
    NumCreditLines: '',
    InterestRate: '',
    LoanTerm: '',
    DTIRatio: '',
    Education: '',
    EmploymentType: '',
    MaritalStatus: '',
    HasMortgage: '',
    HasDependents: '',
    LoanPurpose: '',
    HasCoSigner: ''
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Convert string inputs to appropriate types
      const payload = {
        ...formData,
        Age: parseInt(formData.Age),
        Income: parseFloat(formData.Income),
        LoanAmount: parseFloat(formData.LoanAmount),
        CreditScore: parseInt(formData.CreditScore),
        MonthsEmployed: parseInt(formData.MonthsEmployed),
        NumCreditLines: parseInt(formData.NumCreditLines),
        InterestRate: parseFloat(formData.InterestRate),
        LoanTerm: parseInt(formData.LoanTerm),
        DTIRatio: parseFloat(formData.DTIRatio)
      }

      const response = await axios.post(`${API_URL}/predict`, payload)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getRiskClass = () => {
    if (!result) return ''
    return result.risk_level.toLowerCase().replace(' ', '-')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🏦 Loan Default Prediction System</h1>
        <p>Information-Theoretic Machine Learning Model</p>
      </div>

      <div className="content-grid">
        <div className="card">
          <h2>📝 Enter Loan Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Age">Age *</label>
                <input
                  type="number"
                  id="Age"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Income">Annual Income ($) *</label>
                <input
                  type="number"
                  id="Income"
                  name="Income"
                  value={formData.Income}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="LoanAmount">Loan Amount ($) *</label>
                <input
                  type="number"
                  id="LoanAmount"
                  name="LoanAmount"
                  value={formData.LoanAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="CreditScore">Credit Score *</label>
                <input
                  type="number"
                  id="CreditScore"
                  name="CreditScore"
                  value={formData.CreditScore}
                  onChange={handleChange}
                  required
                  min="300"
                  max="850"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="MonthsEmployed">Months Employed *</label>
                <input
                  type="number"
                  id="MonthsEmployed"
                  name="MonthsEmployed"
                  value={formData.MonthsEmployed}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="NumCreditLines">Number of Credit Lines *</label>
                <input
                  type="number"
                  id="NumCreditLines"
                  name="NumCreditLines"
                  value={formData.NumCreditLines}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="InterestRate">Interest Rate (%) *</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="LoanTerm">Loan Term (months) *</label>
                <input
                  type="number"
                  id="LoanTerm"
                  name="LoanTerm"
                  value={formData.LoanTerm}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="DTIRatio">Debt-to-Income Ratio *</label>
              <input
                type="number"
                id="DTIRatio"
                name="DTIRatio"
                value={formData.DTIRatio}
                onChange={handleChange}
                required
                min="0"
                max="1"
                step="0.01"
                placeholder="0.00 - 1.00"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Education">Education Level *</label>
                <select
                  id="Education"
                  name="Education"
                  value={formData.Education}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="Doctorate">Doctorate</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="EmploymentType">Employment Type *</label>
                <select
                  id="EmploymentType"
                  name="EmploymentType"
                  value={formData.EmploymentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="MaritalStatus">Marital Status *</label>
              <select
                id="MaritalStatus"
                name="MaritalStatus"
                value={formData.MaritalStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="HasMortgage">Has Mortgage *</label>
                <select
                  id="HasMortgage"
                  name="HasMortgage"
                  value={formData.HasMortgage}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="HasDependents">Has Dependents *</label>
                <select
                  id="HasDependents"
                  name="HasDependents"
                  value={formData.HasDependents}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="LoanPurpose">Loan Purpose *</label>
                <select
                  id="LoanPurpose"
                  name="LoanPurpose"
                  value={formData.LoanPurpose}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Auto">Auto</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Home">Home</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="HasCoSigner">Has Co-Signer *</label>
                <select
                  id="HasCoSigner"
                  name="HasCoSigner"
                  value={formData.HasCoSigner}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Predicting...' : '🔮 Predict Default Risk'}
            </button>

            {error && (
              <div className="error">
                <strong>Error:</strong> {error}
              </div>
            )}
          </form>
        </div>

        <div className="card result-card">
          <h2>📊 Prediction Results</h2>
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing loan application...</p>
            </div>
          )}

          {result && !loading && (
            <>
              <div className={`result-box ${getRiskClass()}-risk`}>
                <div className={`risk-badge ${result.risk_level.toLowerCase()}`}>
                  {result.risk_level} Risk
                </div>
                <div className="probability">
                  {(result.probability * 100).toFixed(2)}%
                </div>
                <p className="prediction-text">
                  {result.prediction === 1 ? '⚠️ Default Predicted' : '✅ No Default Predicted'}
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Risk Level</div>
                  <div className="stat-value">{result.risk_level}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Risk Entropy</div>
                  <div className="stat-value">{result.risk_entropy}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Probability</div>
                  <div className="stat-value">{(result.probability * 100).toFixed(2)}%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Prediction</div>
                  <div className="stat-value">
                    {result.prediction === 1 ? 'Default' : 'No Default'}
                  </div>
                </div>
              </div>
            </>
          )}

          {!result && !loading && (
            <div className="loading">
              <p>Fill out the form and click "Predict Default Risk" to see results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Predict

