import React from 'react';
import { personalInfo, educationData, experiencesData, projectsData } from '../../data/portfolioData';
import { X, Printer, Mail, MapPin, GraduationCap, Briefcase, Code2, Award } from 'lucide-react';
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
          maxWidth: '850px',
          padding: '36px',
          background: '#0d1024',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Top Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn-neon-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>

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

        {/* Resume Content Sheet */}
        <div
          id="printable-resume"
          style={{
            background: 'rgba(10, 13, 29, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '36px',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '2px solid rgba(6, 182, 212, 0.3)', paddingBottom: '20px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              {personalInfo.name}
            </h1>
            <div style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 600, marginBottom: '10px' }}>
              Backend & Microservices Engineer • Artificial Intelligence • IIT Kharagpur
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="#06b6d4" />
                {personalInfo.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="#06b6d4" />
                {personalInfo.email}
              </span>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none' }}
              >
                LinkedIn
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none' }}
              >
                GitHub
              </a>
              <a
                href={personalInfo.socialLinks.leetcode}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#ffa116', textDecoration: 'none' }}
              >
                LeetCode (1606)
              </a>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <GraduationCap size={18} color="#06b6d4" />
              <span>EDUCATION</span>
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem' }}>
                {educationData.institution}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                {educationData.period}
              </div>
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '6px' }}>
              {educationData.degree} — <strong>{educationData.grade}</strong>
            </div>
            {educationData.coursework && (
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>
                <strong style={{ color: '#38bdf8' }}>Relevant Coursework: </strong>
                {educationData.coursework.join(' • ')}
              </div>
            )}
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Briefcase size={18} color="#06b6d4" />
              <span>EXPERIENCE</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experiencesData.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.96rem' }}>{exp.company}</span>
                      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}> — {exp.role}</span>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      {exp.period}
                    </div>
                  </div>
                  <ul style={{ paddingLeft: '20px', marginTop: '6px', color: '#cbd5e1', fontSize: '0.86rem' }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Code2 size={18} color="#06b6d4" />
              <span>PROJECTS</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {projectsData.map((proj) => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.95rem' }}>
                      {proj.title} <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.82rem' }}>({proj.tags.slice(0, 4).join(', ')})</span>
                    </span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.86rem', marginTop: '4px' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Ratings */}
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Award size={18} color="#06b6d4" />
              <span>HONORS & COMPETITIVE PROGRAMMING</span>
            </h3>
            <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Omnixan National Hackathon 2026:</strong> Finalist among 4,400+ participants nationwide.</li>
              <li><strong>Joint Entrance Examination (JEE) 2023:</strong> Top 1.7% in JEE Main (1.1M+ candidates) & Top 3.8% in JEE Advanced (260K+ candidates).</li>
              <li><strong>LeetCode:</strong> Max Rating 1606 (Knight Candidate, 450+ solved).</li>
              <li><strong>Codeforces:</strong> Max Rating 1333 (Pupil, handle: Kailash_Sharma).</li>
              <li><strong>CodeChef:</strong> 3-Star Coder (handle: kailash_382005).</li>
              <li><strong>DecodeX Challenge:</strong> Completed 10-day intensive algorithmic sprint by KodeIn, IIT Kharagpur.</li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
};
