import React, { useState } from 'react';
import { experiencesData } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, ChevronRight, Server, Cpu, Layers } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const Experience2D: React.FC = () => {
  const [activeExp, setActiveExp] = useState<string>(experiencesData[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server size={20} />;
      case 'Cpu': return <Cpu size={20} />;
      case 'Layers': return <Layers size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  return (
    <section id="experience" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        {/* Heading */}
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
            <span>Career Milestones</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Hands-on software engineering and AI internships delivering high-concurrency microservices, machine learning models, and festival infrastructure.
          </p>
        </div>

        {/* Timeline Layout */}
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Vertical central glowing line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '28px',
              width: '2px',
              background: 'linear-gradient(to bottom, #06b6d4, #8b5cf6, #3b82f6)',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.5)',
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
                    paddingLeft: '72px',
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
                      left: '12px',
                      top: '0',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: '#0a0d1d',
                      border: `2px solid ${exp.color}`,
                      boxShadow: `0 0 16px ${exp.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: exp.color,
                      cursor: 'pointer',
                      zIndex: 2,
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.2s ease',
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
                      boxShadow: isActive ? `0 10px 30px -10px ${exp.color}40` : undefined,
                      cursor: 'pointer',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                            {exp.company}
                          </h3>
                          <span
                            style={{
                              background: `${exp.color}20`,
                              color: exp.color,
                              border: `1px solid ${exp.color}50`,
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

                      {/* Period and Location Badges */}
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

                    {/* Bullet Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                      {exp.highlights.map((point, hIdx) => (
                        <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <ChevronRight size={16} color={exp.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>
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
