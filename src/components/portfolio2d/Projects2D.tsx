import React, { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import type { Project } from '../../types/portfolio';
import { Code2, ExternalLink, Sparkles, CheckCircle, X, Layers, Cpu, Database } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { soundManager } from '../../utils/sound';

export const Projects2D: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & LLMs' },
    { id: 'systems', label: 'Systems & Distributed' },
    { id: 'fullstack', label: 'Fullstack Apps' },
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
            <span>Featured Engineering</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '640px', margin: '12px auto 0', fontSize: '1rem' }}>
            Production-grade distributed storage systems, autonomous AI web application generators, and adaptive voice interview platforms.
          </p>
        </div>

        {/* Filter Pills */}
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
                  boxShadow: isSelected ? '0 0 16px rgba(6, 182, 212, 0.35)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '30px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                padding: '28px',
                position: 'relative',
                overflow: 'hidden',
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
              <div style={{ fontSize: '0.86rem', color: '#38bdf8', fontWeight: 600, marginBottom: '16px' }}>
                {project.subtitle}
              </div>

              {/* Description */}
              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                {project.description}
              </p>

              {/* Metrics pill if present */}
              {project.metrics && (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
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
                    gap: '4px',
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
                    title="View Source on GitHub"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#cbd5e1',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <GithubIcon size={17} />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Open Live Deployment"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(6, 182, 212, 0.3))',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      {activeModalProject && (
        <div
          className="modal-overlay"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '36px 32px' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {activeModalProject.badge}
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#ffffff' }}>
                  {activeModalProject.title}
                </h3>
                <p style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 600 }}>
                  {activeModalProject.subtitle}
                </p>
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

            {/* In-depth content */}
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              {activeModalProject.longDescription || activeModalProject.description}
            </p>

            {/* Architecture Highlights */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
                Key Technical Features & Architecture
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeModalProject.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={18} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#e2e8f0', fontSize: '0.92rem' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                Technologies Used
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeModalProject.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: 'rgba(79, 70, 229, 0.15)',
                      border: '1px solid rgba(79, 70, 229, 0.3)',
                      color: '#a5b4fc',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Links Footer */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-glass-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                <GithubIcon size={16} />
                <span>View GitHub Repository</span>
              </a>

              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-neon-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
