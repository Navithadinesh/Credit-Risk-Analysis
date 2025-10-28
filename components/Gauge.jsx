import React from 'react';

function getPercentFromCategorical(label) {
  const normalized = String(label || '').toLowerCase();
  if (normalized === 'high') return 90;
  if (normalized === 'mid' || normalized === 'medium') return 60;
  if (normalized === 'low') return 25;
  return 0;
}

function getColorForPercent(percent) {
  if (percent >= 75) return '#2e7d32';
  if (percent >= 50) return '#f9a825';
  return '#c62828';
}

export default function Gauge({ value, kind = 'numeric01', label }) {
  let percent = 0;
  let displayLabel = label;

  if (kind === 'numeric01') {
    const numeric = typeof value === 'number' ? value : parseFloat(value);
    const clamped = Number.isFinite(numeric) ? Math.max(0, Math.min(1, numeric)) : 0;
    percent = Math.round(clamped * 100);
    if (!displayLabel) displayLabel = `${percent}%`;
  } else if (kind === 'categorical') {
    percent = getPercentFromCategorical(value);
    if (!displayLabel) displayLabel = String(value ?? '').toString();
  } else if (kind === 'percent100') {
    const numeric = typeof value === 'number' ? value : parseFloat(value);
    const clamped = Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 0;
    percent = Math.round(clamped);
    if (!displayLabel) displayLabel = `${percent}%`;
  }

  const fillStyle = {
    width: `${percent}%`,
    backgroundColor: getColorForPercent(percent)
  };

  return (
    <div className="gauge" title={displayLabel}>
      <div className="gauge-track">
        <div className="gauge-fill" style={fillStyle} />
      </div>
      <div className="gauge-label">{displayLabel}</div>
    </div>
  );
}

