import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { Mail, Send, CheckCircle2, MapPin, Terminal } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/Icons';
import { soundManager } from '../../utils/sound';

export const Contact2D: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundManager.playSelectSound();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      soundManager.playChime(660, 0.3);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" style={{ padding: '100px 0 140px', position: 'relative' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#818cf8',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Mail size={14} />
            <span>Let's Connect</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Have an open software engineering role, a distributed systems challenge, or an AI collaboration in mind? Let's talk!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            maxWidth: '1050px',
            margin: '0 auto',
          }}
        >
          {/* Left: Contact Info & Channels */}
          <div className="glass-panel" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
              Direct Channels
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '30px' }}>
              Feel free to reach out directly via email or connect with me on professional & algorithmic platforms.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Email</div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', textDecoration: 'none' }}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(168, 85, 247, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c084fc',
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Location</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Link Cards */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                Social & Coding Networks
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill"
                  style={{ textDecoration: 'none', color: '#38bdf8' }}
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill"
                  style={{ textDecoration: 'none', color: '#f8fafc' }}
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socialLinks.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill"
                  style={{ textDecoration: 'none', color: '#ffa116' }}
                >
                  <Terminal size={15} />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-panel" style={{ padding: '36px 32px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
              Send a Message
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
              Fill out this form and I will respond as soon as possible.
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                  Message Transmitted!
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '20px' }}>
                  Thank you for reaching out, Kailash will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-glass-secondary"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satya Nadella"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Software Engineering Opportunities / Tech Discussion"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Kailash, we would love to discuss..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  <Send size={16} />
                  <span>{loading ? 'Transmitting...' : 'Transmit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
