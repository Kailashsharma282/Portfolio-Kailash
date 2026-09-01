import React from 'react';
import { achievementsData } from '../../data/portfolioData';
import { Trophy, Award, Target, Terminal, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/sound';

export const Achievements2D: React.FC = () => {
  const triggerConfetti = (e: React.MouseEvent) => {
    soundManager.playChime(640, 0.2);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ['#06b6d4', '#a855f7', '#f59e0b', '#3b82f6', '#10b981'],
    });
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'omnixan-2026': return <Trophy size={26} color="#f59e0b" />;
      case 'jee-main': return <Target size={26} color="#06b6d4" />;
      case 'jee-advanced': return <Award size={26} color="#c084fc" />;
      default: return <Terminal size={26} color="#10b981" />;
    }
  };

  return (
    <section id="achievements" style={{ padding: '100px 0', position: 'relative' }}>
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
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#fbbf24',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Trophy size={14} />
            <span>Honors & Recognitions</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Key <span className="gradient-text-gold">Achievements</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            National competitive exam percentiles, nationwide hackathon honors, and algorithmic bootcamps.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {achievementsData.map((ach) => (
            <div
              key={ach.id}
              className="glass-panel"
              onClick={triggerConfetti}
              style={{
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              onMouseEnter={(e) => {
                soundManager.playHoverBeep();
                e.currentTarget.style.borderColor = `${ach.color}80`;
                e.currentTarget.style.boxShadow = `0 15px 35px -10px ${ach.color}35`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Top Row: Icon & Stat Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: `${ach.color}18`,
                      border: `1px solid ${ach.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 20px ${ach.color}25`,
                    }}
                  >
                    {getIcon(ach.id)}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: ach.color,
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {ach.stat}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {ach.statLabel}
                    </div>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px', lineHeight: 1.3 }}>
                  {ach.title}
                </h3>
                <div style={{ fontSize: '0.82rem', color: ach.color, fontWeight: 600, marginBottom: '14px' }}>
                  {ach.subtitle}
                </div>

                {/* Description */}
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {ach.description}
                </p>
              </div>

              {/* Bottom Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span
                  style={{
                    background: `${ach.color}15`,
                    color: ach.color,
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {ach.badge}
                </span>

                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b' }}>
                  <Sparkles size={12} color={ach.color} />
                  <span>Click for celebratory effect</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
