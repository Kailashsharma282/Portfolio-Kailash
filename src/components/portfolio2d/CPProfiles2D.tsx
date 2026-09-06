import React from 'react';
import { cpProfilesData } from '../../data/portfolioData';
import { Terminal, ExternalLink, Trophy } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const CPProfiles2D: React.FC = () => {
  return (
    <section id="cp" style={{ padding: '100px 0', position: 'relative' }}>
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
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Terminal size={14} />
            <span>Algorithmic Problem Solving</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Competitive <span className="gradient-text">Programming</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Verified performance across major competitive programming platforms demonstrating strong DSA and speed.
          </p>
        </div>

        {/* CP Profile Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {cpProfilesData.map((profile) => (
            <div
              key={profile.platform}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                soundManager.playHoverBeep();
                e.currentTarget.style.borderColor = profile.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 40px -10px ${profile.color}40, 0 0 20px ${profile.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Platform Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                        {profile.platform}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      @{profile.handle}
                    </div>
                  </div>

                  <span
                    style={{
                      background: `${profile.color}20`,
                      color: profile.color,
                      border: `1px solid ${profile.color}60`,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {profile.badge}
                  </span>
                </div>

                {/* Rating Highlight Banner */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: `${profile.color}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: profile.color,
                        boxShadow: `0 0 15px ${profile.color}30`,
                      }}
                    >
                      <Trophy size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                        Peak Standing
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-heading)' }}>
                        {profile.maxRating}
                      </div>
                    </div>
                  </div>

                  {profile.rank && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                        Percentile / Status
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: profile.color }}>
                        {profile.rank}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stat Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '24px' }}>
                  {profile.stats.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                      }}
                    >
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{s.label}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <a
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: `${profile.color}18`,
                  border: `1px solid ${profile.color}50`,
                  color: profile.color,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-heading)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = profile.color;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${profile.color}18`;
                  e.currentTarget.style.color = profile.color;
                }}
              >
                <span>View Verified Profile</span>
                <ExternalLink size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
