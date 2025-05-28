import React, { useState, useEffect } from 'react';
import CandidateForm from './CandidateForm';

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  education: string | null;
  experience: string | null;
  resumePath: string | null;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3010/api/candidates');
      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }
      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      setError('Error fetching candidates. Please try again later.');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchCandidates(); // Refresh the candidate list
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
      </header>

      <main className="dashboard-content">
        {!showForm ? (
          <div className="dashboard-main">
            <div className="dashboard-actions">
              <button
                className="add-candidate-btn"
                onClick={() => setShowForm(true)}
                aria-label="Add new candidate"
              >
                Add New Candidate
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading candidates...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : candidates.length === 0 ? (
              <p>No candidates found. Add a new candidate to get started.</p>
            ) : (
              <div className="candidates-list">
                <h2>Candidates ({candidates.length})</h2>
                <div className="table-responsive">
                  <table className="candidates-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Education</th>
                        <th>Work Experience</th>
                        <th>Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((candidate) => (
                        <tr key={candidate.id}>
                          <td>{candidate.firstName}</td>
                          <td>{candidate.lastName}</td>
                          <td>{candidate.email}</td>
                          <td>{candidate.phone || '-'}</td>
                          <td>{candidate.address || '-'}</td>
                          <td>
                            <div className="truncate-text">
                              {candidate.education || '-'}
                            </div>
                          </td>
                          <td>
                            <div className="truncate-text">
                              {candidate.experience || '-'}
                            </div>
                          </td>
                          <td>
                            {candidate.resumePath ? (
                              <a
                                href={`http://localhost:3010${candidate.resumePath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="download-button"
                              >
                                Download Resume
                              </a>
                            ) : (
                              'No resume'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="form-container">
            <button
              className="back-btn"
              onClick={() => setShowForm(false)}
            >
              Back to Dashboard
            </button>
            <CandidateForm onSuccess={handleFormSuccess} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
