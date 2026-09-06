import React, { useState } from 'react';
import { skillCategoriesData } from '../../data/portfolioData';
import { Cpu, Server, Brain, Globe, Terminal, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const Skills2D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal size={18} />;
      case 'Server': return <Server size={18} />;
      case 'Brain': return <Brain size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      default: return <Globe size={18} />;
    }
  };

  return (
    <section id="skills" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(236, 72, 153, 0.12)',
              border: '1px solid rgba(236, 72, 153, 0.3)',
              color: '#f472b6',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Skills & <span className="gradient-text">Proficiencies</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            A rigorous engineering stack combining distributed C++ systems, asynchronous Python/FastAPI microservices, RAG AI agents, and competitive problem solving.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {skillCategoriesData.map((cat, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.title}
                onClick={() => {
                  soundManager.playHoverBeep();
                  setActiveTab(idx);
                }}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(6, 182, 212, 0.4))'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: isActive ? '0 0 20px rgba(6, 182, 212, 0.25)' : 'none',
                }}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Skills Panel */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '36px 32px',
            borderRadius: '24px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px',
            }}
          >
            {skillCategoriesData[activeTab].skills.map((skill) => (
              <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8fafc' }}>
                      {skill.name}
                    </span>
                    {skill.badge && (
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: '#38bdf8',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {skill.badge}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: skillCategoriesData[activeTab].color,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div
                  style={{
                    height: '8px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, #4f46e5, ${skillCategoriesData[activeTab].color})`,
                      borderRadius: '4px',
                      boxShadow: `0 0 12px ${skillCategoriesData[activeTab].color}`,
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Ecosystem Pills */}
          <div
            style={{
              marginTop: '36px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8', marginRight: '8px' }}>
              <Sparkles size={14} color="#06b6d4" />
              <span>Full Ecosystem Stack:</span>
            </div>
            {[
              'C++20', 'C', 'Python', 'JavaScript', 'TypeScript', 'SQL',
              'React', 'Node.js', 'Express', 'FastAPI', 'gRPC', 'WebSockets',
              'RAG', 'LLM APIs', 'Speech-to-Text', 'NumPy', 'Pandas', 'PostgreSQL',
              'MongoDB', 'Redis', 'Docker', 'Raft Consensus', 'Multithreading', 'AWS S3',
              'Git', 'Postman', 'Vercel', 'Render'
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#cbd5e1',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
