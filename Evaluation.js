import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { clients } from '../data/clients';
import { calculateOverallScore, calculateParameterScore } from '../utils/evaluation';

ChartJS.register(ArcElement, Tooltip, Legend);

const Evaluation = () => {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const chartRef = useRef();

  const client = clients.find(c => c.entity_id === entityId);

  if (!client) {
    return (
      <div>
        <h1>Client not found</h1>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Clients
        </button>
      </div>
    );
  }

  // Calculate comprehensive credit risk score
  const score = calculateOverallScore(client);

  const chartData = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Clients
      </button>
      
      <h1>Evaluation: {client.entity_name}</h1>
      
      <div className="chart-container">
        <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
      </div>

      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h2>Credit Risk Score: {score}/100</h2>
        <p><strong>Entity ID:</strong> {client.entity_id}</p>
        <p><strong>Sector:</strong> {client.sector}</p>
        <p><strong>Country:</strong> {client.country}</p>
        <p><strong>Revenue:</strong> ${client.revenue_usd_m.toLocaleString()}M USD</p>
      </div>

      {/* Parameter Scores Breakdown */}
      <div style={{ margin: '40px auto', maxWidth: '800px', padding: '20px' }}>
        <h3>Parameter Scores Breakdown</h3>
        <table style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Parameter</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Value</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Score</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'current_ra', label: 'Current Ratio', value: client.current_ra, weight: '15%' },
              { key: 'quick_rati', label: 'Quick Ratio', value: client.quick_rati, weight: '10%' },
              { key: 'dso_days', label: 'Days Sales Outstanding', value: client.dso_days, weight: '10%' },
              { key: 'revenue_c', label: 'Revenue Change (%)', value: client.revenue_c, weight: '10%' },
              { key: 'pd_1y_pct', label: 'Probability of Default (%)', value: client.pd_1y_pct, weight: '20%' },
              { key: 'lgd_pct', label: 'Loss Given Default (%)', value: client.lgd_pct, weight: '15%' },
              { key: 'auditor', label: 'Auditor Type', value: client.auditor, weight: '3%' },
              { key: 'country_ri', label: 'Country Risk', value: client.country_ri, weight: '2%' },
              { key: 'legal_covenant', label: 'Legal Covenant', value: client.legal_covenant, weight: '5%' },
              { key: 'years_in_ownership', label: 'Years in Ownership', value: client.years_in_ownership, weight: '5%' },
              { key: 'tig_governanc', label: 'Governance Score', value: client.tig_governanc, weight: '5%' },
              { key: 'collateral_cove', label: 'Collateral Coverage (%)', value: client.collateral_cove, weight: '5%' }
            ].map(param => {
              const paramScore = calculateParameterScore(param.key, param.value, param.key);
              return (
                <tr key={param.key} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{param.label}</td>
                  <td style={{ padding: '10px' }}>{param.value}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span style={{ 
                      color: paramScore >= 70 ? '#4CAF50' : paramScore >= 50 ? '#FF9800' : '#f44336',
                      fontWeight: 'bold'
                    }}>
                      {paramScore}/100
                    </span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{param.weight}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluation;
