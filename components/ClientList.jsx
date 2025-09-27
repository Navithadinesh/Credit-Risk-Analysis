import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Gauge from './Gauge';

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cells[i];
    });
    return row;
  });
}

export default function ClientList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/credit_risk_assessment_final_20250927_153147.csv`);
        if (!res.ok) throw new Error(`Failed to load CSV (${res.status})`);
        const text = await res.text();
        const parsed = parseCsv(text);
        setRows(parsed);
      } catch (e) {
        setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const columns = useMemo(
    () => [
      { key: 'entity_id', label: 'Entity ID' },
      { key: 'entity_name', label: 'Name' },
      { key: 'sector', label: 'Sector' },
      { key: 'country', label: 'Country' },
      { key: 'model_evaluation', label: 'Model Evaluation' },
      { key: 'model_confidence', label: 'Model Confidence' },
      { key: 'rule_based_evaluation', label: 'Rule-Based Evaluation' }
    ],
    []
  );

  if (loading) return <h1>Loading…</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.entity_id}>
              <td>{r.entity_id}</td>
              <td>{r.entity_name}</td>
              <td>{r.sector}</td>
              <td>{r.country}</td>
              <td>
                <Gauge value={r.model_evaluation} kind="categorical" />
              </td>
              <td>
                <Gauge value={parseFloat(r.model_confidence)} kind="numeric01" />
              </td>
              <td>
                <Gauge value={r.rule_based_evaluation} kind="categorical" />
              </td>
              <td>
                <Link to={`/evaluate/${encodeURIComponent(r.entity_id)}`}>Evaluate</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

