import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clients } from '../data/clients';

const ClientList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 6;

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  const handleEvaluate = (entityId) => {
    navigate(`/evaluate/${entityId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Entity ID</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Country</th>
            <th>Revenue (USD M)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client) => (
            <tr key={client.entity_id}>
              <td>{client.entity_id}</td>
              <td>{client.entity_name}</td>
              <td>{client.sector}</td>
              <td>{client.country}</td>
              <td>{client.revenue_usd_m}</td>
              <td>
                <button onClick={() => handleEvaluate(client.entity_id)}>
                  Evaluate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        
        {currentPage < totalPages && (
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientList;
