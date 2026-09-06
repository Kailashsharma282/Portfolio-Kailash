import React from 'react';
import { educationData } from '../../data/portfolioData';
import { GraduationCap, Compass, Code } from 'lucide-react';

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
            <span>Academic Excellence & Foundation</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Undergraduate at IIT Kharagpur specializing in distributed systems architectures, real-time AI pipelines, and competitive algorithmic problem solving.
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
          {/* Left: Bio, Philosophy & Pillars */}
          <div className="glass-panel" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
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
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>High performance, correctness & scalability</span>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '16px' }}>
              I am <strong>Pochiraju Kailash Ram Markandeya Sharma</strong>, an engineering undergraduate at the <strong>Indian Institute of Technology, Kharagpur</strong>. My engineering work is grounded in deep curiosity for high-throughput distributed systems and responsible applied AI.
            </p>

            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Whether architecting a <strong>5-node C++20 Raft key-value store</strong> with custom TCP protocols, developing real-time fraud detection pipelines with FastAPI and Redis, or building model-agnostic LLM oversight guardrails (Drishti), I build robust systems designed to perform under extreme load.
            </p>

            {/* Core Pillars */}
            <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '12px',
                  padding: '14px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#38bdf8', marginBottom: '4px' }}>
                  Distributed Systems
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  C++20, Raft consensus, WAL persistence, and gRPC microservices
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  borderRadius: '12px',
                  padding: '14px',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#c084fc', marginBottom: '4px' }}>
                  Applied AI & Oversight
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  RAG pipelines, critic model verification, and speech-to-text
                </div>
              </div>
            </div>
          </div>

          {/* Right: Complete Educational History */}
          <div className="glass-panel glass-panel-glow-purple" style={{ padding: '36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
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
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Education History</h3>
                <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>Consistent Academic Distinction</span>
              </div>
            </div>

            {/* Institution Cards Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {educationData.history?.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f8fafc' }}>
                      {edu.institution}
                    </h4>
                    <span
                      style={{
                        background: 'rgba(6, 182, 212, 0.18)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '6px' }}>
                    {edu.degree}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(6, 182, 212, 0.3))',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        color: '#38bdf8',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {edu.gradeType}: {edu.grade}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coursework Tags */}
            {educationData.coursework && (
              <div>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  Core CS & Engineering Coursework
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {educationData.coursework.map((course) => (
                    <span
                      key={course}
                      style={{
                        background: 'rgba(6, 182, 212, 0.08)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '0.74rem',
                        color: '#cbd5e1',
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
        </div>
      </div>
    </section>
  );
};
