import React, { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import { Code2, ExternalLink, Sparkles, CheckCircle2, X, Layers, Cpu, Database } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { soundManager } from '../../utils/sound';

export const Projects2D: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & LLM Oversight' },
    { id: 'systems', label: 'Distributed Systems & C++' },
    { id: 'fullstack', label: 'Fullstack Applications' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return <Cpu size={16} color="#c084fc" />;
      case 'systems': return <Database size={16} color="#38bdf8" />;
      default: return <Layers size={16} color="#34d399" />;
    }
  };

  return (
    <section id="projects" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Code2 size={14} />
            <span>High-Performance Systems & AI</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Production-grade distributed storage clusters in C++20, real-time AI oversight guardrails, voice interview platforms, and AST website synthesizers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '44px',
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playHoverBeep();
                  setSelectedCategory(cat.id);
                }}
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, #4f46e5, #06b6d4)'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: isSelected ? '0 0 18px rgba(6, 182, 212, 0.4)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Border-Beam Card Effects */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border-beam-container"
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                className="border-beam-inner"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Category & Badge Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                    }}
                  >
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </div>

                  <span
                    style={{
                      background: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.35)',
                      color: '#38bdf8',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  {project.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, marginBottom: '16px' }}>
                  {project.subtitle}
                </div>

                {/* Description */}
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  {project.description}
                </p>

                {/* Metrics pill */}
                {project.metrics && (
                  <div
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px dashed rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      color: '#a5b4fc',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={14} color="#38bdf8" />
                    <span>{project.metrics}</span>
                  </div>
                )}

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    marginTop: 'auto',
                  }}
                >
                  <button
                    onClick={() => {
                      soundManager.playSelectSound();
                      setActiveModalProject(project);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#38bdf8',
                      fontWeight: 600,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 0',
                    }}
                  >
                    <span>Architecture & Details</span>
                    <ExternalLink size={14} />
                  </button>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub Repository"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f8fafc',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.borderColor = '#38bdf8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <GithubIcon size={16} />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Demo"
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: 'rgba(6, 182, 212, 0.15)',
                          border: '1px solid rgba(6, 182, 212, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#38bdf8',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(6, 182, 212, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                        }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Architecture Inspection Modal */}
      {activeModalProject && (
        <div
          className="modal-overlay"
          onClick={() => setActiveModalProject(null)}
          style={{ padding: '20px' }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '36px', maxWidth: '820px' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#38bdf8',
                    padding: '2px 10px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {activeModalProject.badge}
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                  {activeModalProject.title}
                </h3>
                <div style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: 600 }}>
                  {activeModalProject.subtitle}
                </div>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#94a3b8',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Deep Description */}
            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '24px' }}>
              {activeModalProject.longDescription || activeModalProject.description}
            </p>

            {/* Key Innovations Checklist */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
                Key Technical Features
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeModalProject.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Architecture Details Box */}
            {activeModalProject.architectureDetails && (
              <div
                style={{
                  background: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Architecture & Concurrency Model
                </div>
                <div style={{ fontSize: '0.88rem', color: '#f8fafc', marginBottom: '12px' }}>
                  {activeModalProject.architectureDetails.concurrencyModel}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeModalProject.architectureDetails.components.map((comp) => (
                    <span
                      key={comp}
                      style={{
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        color: '#38bdf8',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-glass-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                <GithubIcon size={16} />
                <span>View Source Code</span>
              </a>

              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neon-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  <span>Launch Live App</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
