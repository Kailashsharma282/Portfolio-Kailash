import React from 'react';
import { celestialStations, personalInfo, educationData, experiencesData, projectsData, achievementsData, cpProfilesData, skillCategoriesData } from '../../data/portfolioData';
import { X, ExternalLink, GraduationCap, Mail, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { soundManager } from '../../utils/sound';

interface PlanetModalProps {
  stationId: string;
  onClose: () => void;
  onOpenResume?: () => void;
}

export const PlanetModal: React.FC<PlanetModalProps> = ({ stationId, onClose, onOpenResume }) => {
  const station = celestialStations.find((s) => s.id === stationId);
  if (!station) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        soundManager.playSelectSound();
        onClose();
      }}
      style={{
        zIndex: 120,
        background: 'rgba(4, 6, 15, 0.88)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="modal-content hologram-hud"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '840px',
          background: 'rgba(10, 13, 30, 0.95)',
          border: `1px solid ${station.color}70`,
          boxShadow: `0 0 50px -10px ${station.color}40, 0 25px 60px rgba(0,0,0,0.8)`,
          padding: '36px',
        }}
      >
        {/* Hologram Station Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: `1px solid ${station.color}30`, paddingBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  background: `${station.color}20`,
                  color: station.color,
                  border: `1px solid ${station.color}60`,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Station // {station.name}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Sector: {station.distance} AU</span>
            </div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
              {station.label}
            </h2>
            <div style={{ color: station.color, fontSize: '0.9rem', fontWeight: 600 }}>
              {station.subtitle}
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playSelectSound();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: `1px solid ${station.color}40`,
              color: '#cbd5e1',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Section Content based on Station ID */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '6px' }}>
          {stationId === 'about' && (
            <div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: `2px solid ${station.color}`,
                    boxShadow: `0 0 20px ${station.color}50`,
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                    {personalInfo.name}
                  </h3>
                  <div style={{ color: station.color, fontSize: '0.9rem', fontWeight: 600 }}>
                    {personalInfo.tagline}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '20px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <GraduationCap size={18} color={station.color} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                    {educationData.institution}
                  </h4>
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '6px' }}>
                  {educationData.degree}
                </div>
                <div style={{ display: 'inline-block', background: `${station.color}20`, color: station.color, padding: '3px 10px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>
                  {educationData.grade} • {educationData.period}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {educationData.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={15} color={station.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {educationData.coursework && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontSize: '0.74rem', color: station.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                      Verified Coursework
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {educationData.coursework.map((course) => (
                        <span
                          key={course}
                          style={{
                            background: `${station.color}15`,
                            border: `1px solid ${station.color}35`,
                            borderRadius: '6px',
                            padding: '3px 8px',
                            fontSize: '0.72rem',
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

              {onOpenResume && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
                  className="btn-neon-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Open Full Professional Resume</span>
                </button>
              )}
            </div>
          )}

          {stationId === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experiencesData.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${exp.color}40`,
                    borderRadius: '14px',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{exp.company}</h4>
                    <span style={{ fontSize: '0.8rem', color: exp.color, fontFamily: 'var(--font-mono)' }}>{exp.period}</span>
                  </div>
                  <div style={{ color: exp.color, fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px' }}>
                    {exp.role}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '12px' }}>
                    {exp.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {exp.technologies.map((t) => (
                      <span key={t} style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: '6px', padding: '2px 8px', fontSize: '0.72rem', color: '#94a3b8' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {stationId === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {projectsData.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{proj.title}</h4>
                    <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {proj.badge}
                    </span>
                  </div>
                  <div style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
                    {proj.subtitle}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '14px' }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {proj.tags.map((t) => (
                      <span key={t} style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', padding: '2px 8px', fontSize: '0.72rem', color: '#94a3b8' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-pill"
                      style={{ textDecoration: 'none', color: '#f8fafc' }}
                    >
                      <GithubIcon size={14} />
                      <span>Code Repository</span>
                    </a>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-pill"
                        style={{ textDecoration: 'none', color: '#38bdf8' }}
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {stationId === 'achievements' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {achievementsData.map((ach) => (
                <div
                  key={ach.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${ach.color}40`,
                    borderRadius: '14px',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: ach.color, fontFamily: 'var(--font-heading)' }}>
                      {ach.stat}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{ach.statLabel}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {ach.title}
                  </h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {stationId === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {skillCategoriesData.map((cat) => (
                <div
                  key={cat.title}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '18px',
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: cat.color, marginBottom: '12px' }}>
                    {cat.title}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        style={{
                          background: `${cat.color}15`,
                          border: `1px solid ${cat.color}35`,
                          color: '#f8fafc',
                          borderRadius: '8px',
                          padding: '4px 10px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                        }}
                      >
                        {s.name} <strong style={{ color: cat.color }}>({s.level}%)</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {stationId === 'cp' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {cpProfilesData.map((p) => (
                <div
                  key={p.platform}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${p.color}50`,
                    borderRadius: '14px',
                    padding: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{p.platform}</h4>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>@{p.handle}</div>
                    <div style={{ color: p.color, fontWeight: 700, fontSize: '1.1rem', marginTop: '4px' }}>
                      Max Rating: {p.maxRating}
                    </div>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: `${p.color}20`,
                      border: `1px solid ${p.color}60`,
                      color: p.color,
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>View Profile</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}

          {stationId === 'contact' && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <Mail size={40} color={station.color} style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Open for Collaboration
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 24px' }}>
                Send an email or connect with Kailash Sharma across GitHub and LinkedIn.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn-neon-primary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
