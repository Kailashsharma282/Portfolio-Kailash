import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { Mail, Send, CheckCircle2, MapPin, Terminal, Phone, Copy, Check } from 'lucide-react';
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
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    soundManager.playKeyClick();
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
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
            <span>Let's Build Together</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Have a backend or distributed systems engineering opportunity, an AI oversight challenge, or want to discuss competitive programming? Reach out!
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
          {/* Left: Direct Channels & Phone & Socials */}
          <div className="glass-panel" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
              Direct Channels
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '30px' }}>
              Feel free to connect directly via email, phone, or professional networks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              {/* Institutional Email */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>IIT KGP Email</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f8fafc', textDecoration: 'none' }}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email1')}
                  title="Copy email"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '6px',
                    color: copiedField === 'email1' ? '#34d399' : '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  {copiedField === 'email1' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone */}
              {personalInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#34d399',
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Phone</div>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f8fafc', textDecoration: 'none' }}
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                    title="Copy phone"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '6px',
                      color: copiedField === 'phone' ? '#34d399' : '#94a3b8',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedField === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              )}

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
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Location</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f8fafc' }}>
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Link Cards */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
                Coding & Social Networks
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
                  <span>LeetCode (1,770)</span>
                </a>
                <a
                  href={personalInfo.socialLinks.codechef}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-pill"
                  style={{ textDecoration: 'none', color: '#8b5cf6' }}
                >
                  <span>CodeChef (Rank 184)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-panel" style={{ padding: '36px 32px' }}>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
              Send a Direct Message
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
              Have an opportunity or project in mind? Drop a message here.
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '16px',
                  padding: '36px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={46} color="#10b981" style={{ margin: '0 auto 14px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                  Message Transmitted!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '20px' }}>
                  Thank you for reaching out! Kailash will review and respond promptly.
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
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 500 }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 500 }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@techcorp.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 500 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity / Collaboration"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 500 }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, role, or project..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#06b6d4')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-neon-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    marginTop: '8px',
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  {loading ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
