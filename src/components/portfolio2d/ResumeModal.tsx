import React from 'react';
import { personalInfo, educationData, experiencesData, projectsData } from '../../data/portfolioData';
import { X, Printer, Mail, Phone } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface ResumeModalProps {
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ onClose }) => {
  const handlePrint = () => {
    soundManager.playSelectSound();
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '20px' }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '880px',
          padding: '36px',
          background: '#0d1024',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Top Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button
            onClick={handlePrint}
            className="btn-neon-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onClose}
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

        {/* Printable Resume Sheet matching Attached Resume 1:1 */}
        <div
          id="printable-resume"
          style={{
            background: 'rgba(10, 13, 29, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '36px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '2px solid rgba(6, 182, 212, 0.3)', paddingBottom: '16px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {personalInfo.name}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.85rem', color: '#cbd5e1', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={13} color="#06b6d4" />
                {personalInfo.phone}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={13} color="#06b6d4" />
                {personalInfo.email}
              </span>
              <span>•</span>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none' }}
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none' }}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
              EDUCATION
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {educationData.history?.map((edu) => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.94rem' }}>
                      {edu.institution}
                    </div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.86rem' }}>
                      {edu.degree}, <strong>{edu.gradeType}: {edu.grade}</strong>
                    </div>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px' }}>
              EXPERIENCE
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experiencesData.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.94rem' }}>{exp.company}</span>
                      <span style={{ color: '#94a3b8' }}> | </span>
                      <span style={{ color: '#38bdf8', fontSize: '0.9rem', fontStyle: 'italic' }}>{exp.role}</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                      {exp.period}
                    </div>
                  </div>
                  <ul style={{ paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.55 }}>
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} style={{ marginBottom: '3px' }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px' }}>
              PROJECTS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projectsData.map((proj) => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.94rem' }}>{proj.title}</span>
                      <span style={{ color: '#94a3b8' }}> | </span>
                      <span style={{ color: '#a5b4fc', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                        {proj.tags.slice(0, 7).join(', ')}
                      </span>
                    </div>
                  </div>
                  <ul style={{ paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.55 }}>
                    {proj.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ marginBottom: '3px' }}>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '10px' }}>
              ACHIEVEMENTS
            </h3>
            <ul style={{ paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.6 }}>
              <li>
                Secured <strong>6th position</strong> in Omnikon National Hackathon 2026 among 3,000+ participants nationwide (Team: kailashsharma8).
              </li>
              <li>
                Secured <strong>Rank 1,530</strong> in Codeforces Round 1117 (Div. 2) among 25,000+ participants, achieving a 1333 rating (Kailash Sharma).
              </li>
              <li>
                Secured <strong>Global Rank 184</strong> in CodeChef Starters 254 among 30,000+ participants (Handle: kailash_382005).
              </li>
              <li>
                Secured <strong>Top 4%</strong> in LeetCode Weekly Contest 500, with a max rating of 1,770 and 400+ problems solved (ID: kailash_382005).
              </li>
            </ul>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
              TECHNICAL SKILLS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.84rem', color: '#cbd5e1' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>Languages: </strong>
                C, C++, JavaScript, Python, SQL
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Web & Backend: </strong>
                React, Node.js, Express, FastAPI, REST, gRPC, WebSockets, HTML, CSS, Tailwind CSS
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>AI/ML & Data: </strong>
                RAG, LLM APIs, Embedding-based Retrieval, Speech-to-Text, NumPy, Pandas, PostgreSQL, MongoDB, Redis
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Systems & CS: </strong>
                Microservices, Distributed Systems, System Design, Multithreading, TCP/IP Sockets, WebRTC, Docker, AWS S3, AWS Lambda, DSA, OOP, OS, CN, DBMS
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>Tools & Platforms: </strong>
                Git/GitHub, VS Code, Figma, Postman, Render, Vercel, Netlify
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
