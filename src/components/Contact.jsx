import { useState } from 'react';
import { CONTACT_EMAIL, GENERIC_SEND_ERROR } from '../constants/contact';
import { Reveal } from './Reveal';

const REASONS = [
  { value: 'partner', label: 'Partnership' },
  { value: 'investor', label: 'Investment' },
  { value: 'government', label: 'Government / institution' },
  { value: 'builder', label: 'Fellow builder' },
  { value: 'press', label: 'Press / media' },
  { value: 'other', label: 'Other' },
];

const API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

const initialForm = {
  name: '',
  email: '',
  organization: '',
  reason: 'partner',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  function updateField(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (status !== 'idle') setStatus('idle');
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setFeedback(
          data.error?.includes('hello@velttora.com')
            ? GENERIC_SEND_ERROR
            : data.error || GENERIC_SEND_ERROR,
        );
        return;
      }

      setStatus('success');
      setFeedback(data.message || 'Thank you. We will contact you soon.');
      setForm(initialForm);
    } catch {
      setStatus('error');
      setFeedback(GENERIC_SEND_ERROR);
    }
  }

  return (
    <section className="cta" id="contact">
      <div className="cta-glow" />
      <div className="container">
        <Reveal className="section-eyebrow" style={{ justifyContent: 'center' }}>
          Let&apos;s talk
        </Reveal>
        <Reveal delay={1} className="cta-title">
          Ready to build
          <br />
          something <em>real?</em>
        </Reveal>
        <Reveal delay={2} className="cta-subtitle">
          Whether you&apos;re a potential partner, investor, government institution, or fellow
          builder — we&apos;d love to hear from you.
        </Reveal>

        <Reveal delay={3}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-grid">
              <label className="contact-field">
                <span className="contact-label">Name *</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField('name')}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </label>
              <label className="contact-field">
                <span className="contact-label">Email *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField('email')}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </label>
              <label className="contact-field">
                <span className="contact-label">Organization</span>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={updateField('organization')}
                  autoComplete="organization"
                  placeholder="Company or institution (optional)"
                />
              </label>
              <label className="contact-field">
                <span className="contact-label">I&apos;m reaching out about *</span>
                <select name="reason" value={form.reason} onChange={updateField('reason')} required>
                  {REASONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="contact-field contact-field--full">
              <span className="contact-label">Message *</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField('message')}
                required
                rows={5}
                placeholder="Tell us about your project, partnership idea, or question..."
              />
            </label>
            <button
              type="submit"
              className="btn-primary contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {feedback && (
              <p
                className={`contact-feedback contact-feedback--${status === 'success' ? 'success' : 'error'}`}
                role="status"
              >
                {feedback}
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={4} className="cta-contact-row">
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact-item">
            <span>✉</span> {CONTACT_EMAIL}
          </a>
          <a href="https://velttora.com" className="contact-item">
            <span>🌐</span> velttora.com
          </a>
          <div className="contact-item">
            <span>📍</span> Cali, Colombia · Wyoming, USA
          </div>
        </Reveal>
      </div>
    </section>
  );
}
