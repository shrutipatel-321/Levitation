// src/components/SubmissionTable.tsx
import React, { useState } from 'react';
import './SubmissionTable.css'; // Import the CSS file for styling

const SubmissionTable: React.FC<any> = ({ submissions }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const filteredSubmissions = submissions.filter((submission: any) => {
    const matchSearch = submission.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDate =
      (!startDate || new Date(submission.date) >= new Date(startDate)) &&
      (!endDate || new Date(submission.date) <= new Date(endDate));

    return matchSearch && matchDate;
  });

  return (
    <div className="submission-table">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Submission</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission: any) => (
            <tr key={submission.id}>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>{submission.date}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
