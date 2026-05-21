import { useState } from 'react';
import { CONTACT_EMAIL } from '../constants/contact';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

const API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

const initialForm = {
  name: '',
  email: '',
  organization: '',
  reason: 'partner',
  message: '',
};

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
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
        setFeedback(data.error || c.error);
        return;
      }

      setStatus('success');
      setFeedback(data.message || c.success);
      setForm(initialForm);
    } catch {
      setStatus('error');
      setFeedback(c.error);
    }
  }

  return (
    <section className="cta" id="contact">
      <div className="cta-glow" />
      <div className="container">
        <Reveal className="section-eyebrow" style={{ justifyContent: 'center' }}>
          {c.eyebrow}
        </Reveal>
        <Reveal delay={1} className="cta-title">
          {c.titleLine1}
          <br />
          <em>{c.titleLine2}</em>
        </Reveal>
        <Reveal delay={2} className="cta-subtitle">
          {c.subtitle}
        </Reveal>

        <Reveal delay={3}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-grid">
              <label className="contact-field">
                <span className="contact-label">{c.name}</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField('name')}
                  required
                  autoComplete="name"
                  placeholder={c.namePlaceholder}
                />
              </label>
              <label className="contact-field">
                <span className="contact-label">{c.email}</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField('email')}
                  required
                  autoComplete="email"
                  placeholder={c.emailPlaceholder}
                />
              </label>
              <label className="contact-field">
                <span className="contact-label">{c.organization}</span>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={updateField('organization')}
                  autoComplete="organization"
                  placeholder={c.orgPlaceholder}
                />
              </label>
              <label className="contact-field">
                <span className="contact-label">{c.reason}</span>
                <select name="reason" value={form.reason} onChange={updateField('reason')} required>
                  {c.reasons.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="contact-field contact-field--full">
              <span className="contact-label">{c.message}</span>
              <textarea
                name="message"
                value={form.message}
                onChange={updateField('message')}
                required
                rows={5}
                placeholder={c.messagePlaceholder}
              />
            </label>
            <button
              type="submit"
              className="btn-primary contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? c.sending : c.send}
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
            <span>📍</span> {c.location}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
