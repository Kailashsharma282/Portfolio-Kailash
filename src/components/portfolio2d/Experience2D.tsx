import React, { useState } from 'react';
import { experiencesData } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, Server, Cpu, Brain, Layers, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const Experience2D: React.FC = () => {
  const [activeExp, setActiveExp] = useState<string>(experiencesData[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server size={20} />;
      case 'Cpu': return <Cpu size={20} />;
      case 'Brain': return <Brain size={20} />;
      case 'Layers': return <Layers size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <section id="experience" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#c084fc',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Briefcase size={14} />
            <span>Professional & Engineering Roles</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Production engineering experience delivering gRPC microservices, fraud detection classification pipelines, LLM RAG agents, and festival infrastructure.
          </p>
        </div>

        {/* Timeline Layout */}
        <div style={{ position: 'relative', maxWidth: '920px', margin: '0 auto' }}>
          {/* Vertical central glowing laser line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '28px',
              width: '3px',
              background: 'linear-gradient(to bottom, #06b6d4, #ec4899, #a855f7, #3b82f6)',
              boxShadow: '0 0 16px rgba(6, 182, 212, 0.6)',
              borderRadius: '2px',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {experiencesData.map((exp) => {
              const isActive = activeExp === exp.id;
              return (
                <div
                  key={exp.id}
                  style={{
                    position: 'relative',
                    paddingLeft: '76px',
                  }}
                >
                  {/* Timeline node icon */}
                  <div
                    onClick={() => {
                      soundManager.playHoverBeep();
                      setActiveExp(exp.id);
                    }}
                    style={{
                      position: 'absolute',
                      left: '11px',
                      top: '0',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: '#0a0d1d',
                      border: `2px solid ${exp.color}`,
                      boxShadow: isActive ? `0 0 24px ${exp.color}` : `0 0 10px ${exp.color}60`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: exp.color,
                      cursor: 'pointer',
                      zIndex: 2,
                      transform: isActive ? 'scale(1.18)' : 'scale(1)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {getIcon(exp.iconName)}
                  </div>

                  {/* Experience Card */}
                  <div
                    className="glass-panel"
                    onClick={() => {
                      soundManager.playHoverBeep();
                      setActiveExp(exp.id);
                    }}
                    style={{
                      padding: '28px 30px',
                      borderColor: isActive ? exp.color : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isActive ? `0 14px 40px -10px ${exp.color}40, 0 0 20px ${exp.color}20` : undefined,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Header Row */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '10px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                            {exp.company}
                          </h3>
                          <span
                            style={{
                              background: `${exp.color}20`,
                              color: exp.color,
                              border: `1px solid ${exp.color}60`,
                              borderRadius: '6px',
                              padding: '2px 8px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            color: exp.color,
                            marginTop: '2px',
                          }}
                        >
                          {exp.role}
                        </div>
                      </div>

                      {/* Period and Location */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#e2e8f0',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <Calendar size={13} color={exp.color} />
                          <span>{exp.period}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#94a3b8' }}>
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '18px' }}>
                      {exp.description}
                    </p>

                    {/* Bullet Highlights from Resume */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                      {exp.highlights.map((point, hIdx) => (
                        <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckCircle2 size={16} color={exp.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.55 }}>
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '4px 10px',
                            fontSize: '0.78rem',
                            color: '#cbd5e1',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = exp.color;
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#cbd5e1';
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
