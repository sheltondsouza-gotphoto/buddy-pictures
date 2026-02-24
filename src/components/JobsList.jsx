import React from 'react';
import './List.css';
import CurrentlyChosen from './CurrentlyChosen';

function JobsList({ jobs, onJobClick }) {
  return (
    <div className="list-container">
      <CurrentlyChosen />
      <div className="list-header">
        <h2 className="list-title">Entagged jobs</h2>
        <button className="icon-button" aria-label="Search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="#2B2851" strokeWidth="2"/>
            <path d="M20 20L16 16" stroke="#2B2851" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="list">
        {jobs.map((job, index) => (
          <React.Fragment key={job}>
            {index > 0 && <div className="list-divider"></div>}
            <div className="list-item" onClick={() => onJobClick(job)}>
              <div className="list-item-text">
                <p>{job}</p>
              </div>
              <div className="list-item-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#2B2851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default JobsList;
