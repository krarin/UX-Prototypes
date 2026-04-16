// LOCKED — do not modify without explicit instruction
// See CLAUDE.md: "Shell (topbar, stepper, left panel) is a shared locked component"

import React from 'react';
import '../styles/design-system.css';
import '../styles/typography.css';
import './Shell.css';

const STEPS = [
  { id: 1, label: 'Angebotssuche' },
  { id: 2, label: 'Einreichung' },
];

/**
 * StepIndicator
 * Renders the shape for each step status.
 * Shape + color always used together — never color alone (colorblind-safe).
 *
 * active → diamond   (--color-status-review)
 * done   → filled circle  (--color-status-success)
 * idle   → outlined circle (--color-border-secondary)
 */
function StepIndicator({ status }) {
  if (status === 'active') {
    return (
      <span className="step-indicator step-indicator--active" aria-label="Aktiv">
        {/* Diamond shape */}
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
          <rect
            x="7" y="1.5"
            width="7.78" height="7.78"
            rx="1"
            transform="rotate(45 7 7)"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  }

  if (status === 'done') {
    return (
      <span className="step-indicator step-indicator--done" aria-label="Abgeschlossen">
        {/* Filled circle */}
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
          <circle cx="7" cy="7" r="6" fill="currentColor" />
        </svg>
      </span>
    );
  }

  // idle
  return (
    <span className="step-indicator step-indicator--idle" aria-label="Ausstehend">
      {/* Outlined circle */}
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
        <circle cx="7" cy="7" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

/**
 * Shell
 * Shared top bar: client context pill + 2-step stepper.
 *
 * Props:
 *   activeStep {number} — 1-based index of the current step (default: 1)
 */
export default function Shell({ activeStep = 1 }) {
  return (
    <header className="shell" role="banner">

      {/* Client context pill */}
      <div className="shell-client-pill" aria-label="Kundenkontext">
        Müller, Thomas · € 350.000 · 15J
      </div>

      {/* 2-step stepper */}
      <nav className="shell-stepper" aria-label="Prozessschritte">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const status =
            stepNum < activeStep ? 'done'
            : stepNum === activeStep ? 'active'
            : 'idle';

          return (
            <React.Fragment key={step.id}>
              <div
                className={`shell-step shell-step--${status}`}
                aria-current={status === 'active' ? 'step' : undefined}
              >
                <StepIndicator status={status} />
                <span className="shell-step-label">{step.label}</span>
              </div>

              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <span className="shell-step-connector" aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </nav>

    </header>
  );
}
