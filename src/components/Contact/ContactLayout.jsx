import React from 'react';
import StandardForm from './StandardForm';
import WorkWithUsForm from './WorkWithUsForm';

export default function ContactLayout({ activeForm = 'standard' }) {
  return (
    <div className="contact-layout">
      <header className="contact-header">
        <h1>Contact</h1>
      </header>
      <main className="contact-content">
        {activeForm === 'work' ? (
          <WorkWithUsForm />
        ) : (
          <StandardForm />
        )}
      </main>
    </div>
  );
}
