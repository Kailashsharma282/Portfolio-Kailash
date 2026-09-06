import React from 'react';
import { celestialStations, personalInfo, educationData, experiencesData, projectsData, achievementsData, cpProfilesData } from '../../data/portfolioData';
import { X, ExternalLink, CheckCircle2, Server, Cpu, Brain, Trophy } from 'lucide-react';
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
          maxWidth: '860px',
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
        <div style={{ maxHeight: '62vh', overflowY: 'auto', paddingRight: '6px' }}>
          {/* Station: About & Education */}
          {stationId === 'about' && (
            <div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '18px',
                    objectFit: 'cover',
                    border: `2px solid ${station.color}`,
                    boxShadow: `0 0 20px ${station.color}50`,
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                    {personalInfo.name}
                  </h3>
                  <div style={{ color: station.color, fontSize: '0.9rem', fontWeight: 600 }}>
                    {personalInfo.tagline}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
                    {personalInfo.location} • IIT Kharagpur (2023 – 2027)
                  </div>
                </div>
              </div>

              {/* Education Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {educationData.history?.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h4 style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.98rem' }}>{edu.institution}</h4>
                      <span style={{ color: station.color, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                        {edu.period}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '6px' }}>{edu.degree}</div>
                    <div style={{ display: 'inline-block', background: `${station.color}20`, color: station.color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                      {edu.gradeType}: {edu.grade}
                    </div>
                  </div>
                ))}
              </div>

              {onOpenResume && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenResume();
                  }}
                  className="btn-neon-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <span>Open Full Printable Resume</span>
                </button>
              )}
            </div>
          )}

          {/* Station: MeetMux Engineering */}
          {stationId === 'meetmux' && (
            <div>
              {experiencesData.filter(e => e.id === 'meetmux').map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Server size={22} color={station.color} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{exp.company}</h3>
                    <span style={{ background: `${station.color}20`, color: station.color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {exp.type}
                    </span>
                  </div>
                  <div style={{ color: station.color, fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px' }}>
                    {exp.role} • {exp.period}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {exp.description}
                  </p>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    Key Engineering Highlights
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {exp.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color={station.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.technologies.map(t => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${station.color}40`, color: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Station: Prathik ML & Fraud Detection */}
          {stationId === 'prathik' && (
            <div>
              {experiencesData.filter(e => e.id === 'prathik').map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Cpu size={22} color={station.color} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{exp.company}</h3>
                    <span style={{ background: `${station.color}20`, color: station.color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {exp.type}
                    </span>
                  </div>
                  <div style={{ color: station.color, fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px' }}>
                    {exp.role} • {exp.period}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {exp.description}
                  </p>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    Pipeline & Optimization Details
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {exp.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color={station.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.technologies.map(t => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${station.color}40`, color: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Station: CognifyEV AI Chatbot */}
          {stationId === 'cognifyev' && (
            <div>
              {experiencesData.filter(e => e.id === 'cognifyev').map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Brain size={22} color={station.color} />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{exp.company}</h3>
                    <span style={{ background: `${station.color}20`, color: station.color, padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {exp.type}
                    </span>
                  </div>
                  <div style={{ color: station.color, fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px' }}>
                    {exp.role} • {exp.period}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {exp.description}
                  </p>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    RAG & Inference Pipeline
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {exp.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color={station.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.technologies.map(t => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${station.color}40`, color: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Station: C++20 Distributed Key-Value Store */}
          {stationId === 'kvstore' && (
            <div>
              {projectsData.filter(p => p.id === 'distributed-kv-store').map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>{proj.title}</h3>
                    <span style={{ background: `${station.color}20`, color: station.color, padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {proj.badge}
                    </span>
                  </div>
                  <div style={{ color: station.color, fontSize: '0.92rem', fontWeight: 600, marginBottom: '14px' }}>
                    {proj.subtitle}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {proj.longDescription || proj.description}
                  </p>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    Distributed Consensus & Storage Features
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {proj.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color={station.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {proj.tags.map(t => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${station.color}40`, color: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glass-secondary"
                    style={{ display: 'inline-flex', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    <GithubIcon size={16} />
                    <span>View C++20 Raft Source</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Station: Drishti AI Oversight Layer */}
          {stationId === 'drishti' && (
            <div>
              {projectsData.filter(p => p.id === 'drishti-ai-oversight').map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>{proj.title}</h3>
                    <span style={{ background: `${station.color}20`, color: station.color, padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {proj.badge}
                    </span>
                  </div>
                  <div style={{ color: station.color, fontSize: '0.92rem', fontWeight: 600, marginBottom: '14px' }}>
                    {proj.subtitle}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {proj.longDescription || proj.description}
                  </p>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    Real-Time Safety & Risk Classifiers
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {proj.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color={station.color} style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {proj.tags.map(t => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${station.color}40`, color: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glass-secondary"
                    style={{ display: 'inline-flex', padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    <GithubIcon size={16} />
                    <span>View Oversight Engine Repository</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Station: Competitive Programming */}
          {stationId === 'cp' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {cpProfilesData.map(cp => (
                  <div key={cp.platform} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${cp.color}40`, borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <h4 style={{ fontWeight: 800, color: '#fff' }}>{cp.platform}</h4>
                      <span style={{ color: cp.color, fontWeight: 700, fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{cp.badge}</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                      {cp.maxRating}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                      {cp.rank}
                    </div>
                  </div>
                ))}
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                Verified Competitive Milestones
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {achievementsData.map(ach => (
                  <div key={ach.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px' }}>
                    <Trophy size={16} color={ach.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.88rem' }}>{ach.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{ach.statLabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Station: Contact */}
          {stationId === 'contact' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>IIT Kharagpur Email</div>
                  <a href={`mailto:${personalInfo.email}`} style={{ color: '#38bdf8', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
                    {personalInfo.email}
                  </a>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Phone Contact</div>
                  <a href={`tel:${personalInfo.phone}`} style={{ color: '#34d399', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={15} />
                </a>
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>GitHub</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
