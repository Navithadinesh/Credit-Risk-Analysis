import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

export default function Evaluation() {
  const { entityId } = useParams();
  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/credit_risk_assessment_final_20250927_153147.csv`);
        if (!res.ok) throw new Error(`Failed to load CSV (${res.status})`);
        const text = await res.text();
        const rows = parseCsv(text);
        const found = rows.find((r) => r.entity_id === entityId);
        setRow(found || null);
      } catch (e) {
        setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [entityId]);

  if (loading) return <h1>Loading…</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!row) return <h1>Not found</h1>;

  return (
    <div>
      <Link className="back-button" to="/">Back</Link>
      <h1>Evaluation: {row.entity_name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Entity ID</td>
            <td>{row.entity_id}</td>
          </tr>
          <tr>
            <td>Sector</td>
            <td>{row.sector}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{row.country}</td>
          </tr>
          <tr>
            <td>Model Evaluation</td>
            <td>
              <Gauge value={row.model_evaluation} kind="categorical" />
            </td>
          </tr>
          <tr>
            <td>Model Confidence</td>
            <td>
              <Gauge value={parseFloat(row.model_confidence)} kind="numeric01" />
            </td>
          </tr>
          <tr>
            <td>Rule-Based Evaluation</td>
            <td>
              <Gauge value={row.rule_based_evaluation} kind="categorical" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

