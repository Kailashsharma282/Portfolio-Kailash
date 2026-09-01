import React from 'react';
import { educationData, personalInfo } from '../../data/portfolioData';
import { GraduationCap, Compass, Code, CheckCircle2 } from 'lucide-react';

export const About2D: React.FC = () => {
  return (
    <section id="about" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Compass size={14} />
            <span>Background & Foundation</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            A passionate engineer focused on building robust distributed backend systems, AI-powered products, and high-performance algorithms.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Bio & Philosophy */}
          <div className="glass-panel" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(79, 70, 229, 0.2)',
                  border: '1px solid rgba(79, 70, 229, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a5b4fc',
                }}
              >
                <Code size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Engineering Philosophy</h3>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Scalable, resilient & intelligent</span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '16px' }}>
              I am an undergraduate at the <strong>Indian Institute of Technology, Kharagpur</strong> with an intense drive for understanding systems from first principles. Whether it is building low-latency microservices with Go, training anomaly detection models for EV battery packs, or tuning Raft distributed consensus engines, I obsess over correctness and speed.
            </p>

            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '24px' }}>
              My background in competitive programming (Max Rating 1606 on LeetCode) fuels my ability to design time and memory-efficient algorithms for real-world production challenges.
            </p>

            {/* Core Values / Focus Pillars */}
            <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#38bdf8', marginBottom: '4px' }}>
                  Microservices
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Low-latency gRPC, REST, and distributed caching</div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#c084fc', marginBottom: '4px' }}>
                  Applied AI
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>LLM agents, PyTorch time-series & vector retrieval</div>
              </div>
            </div>
          </div>

          {/* Right: Education at IIT Kharagpur */}
          <div className="glass-panel glass-panel-glow-purple" style={{ padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.18)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Education</h3>
                <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>Premier Institute</span>
              </div>
            </div>

            {/* Institution Card */}
            <div
              style={{
                background: 'rgba(6, 182, 212, 0.05)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                  {educationData.institution}
                </h4>
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: '#38bdf8',
                    padding: '2px 10px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {educationData.period}
                </span>
              </div>

              <div style={{ fontSize: '0.92rem', color: '#cbd5e1', fontWeight: 500, marginBottom: '6px' }}>
                {educationData.degree}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span
                  style={{
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(6, 182, 212, 0.3))',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#38bdf8',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {educationData.grade}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{educationData.location}</span>
              </div>

              {/* Highlights List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {educationData.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Coursework Tags */}
              {educationData.coursework && (
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    Key Coursework
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {educationData.coursework.map((course) => (
                      <span
                        key={course}
                        style={{
                          background: 'rgba(6, 182, 212, 0.08)',
                          border: '1px solid rgba(6, 182, 212, 0.25)',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '0.74rem',
                          color: '#e2e8f0',
                          fontWeight: 500,
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {personalInfo.stats.map((st, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-heading)' }}>
                    <span className="gradient-text-cyan">{st.value}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '4px' }}>{st.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
