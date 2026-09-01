import React, { useState, useEffect } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { ArrowRight, Download, Terminal, Sparkles, Award, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { soundManager } from '../../utils/sound';

interface Hero2DProps {
  onOpenResume: () => void;
  onSwitchTo3D: () => void;
}

export const Hero2D: React.FC<Hero2DProps> = ({ onOpenResume, onSwitchTo3D }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamic typing effect for roles
  useEffect(() => {
    const currentRole = personalInfo.roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToProjects = () => {
    soundManager.playSelectSound();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 80px',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(7, 8, 14, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(7, 8, 14, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Introductions and Actions */}
          <div>
            {/* Status indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }} />
              <span>Available for Summer 2026 Opportunities</span>
            </div>

            {/* Greeting & Name */}
            <h2
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                fontWeight: 600,
                color: '#38bdf8',
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Hi, I'm
            </h2>

            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              <span>KAILASH </span>
              <span className="gradient-text">SHARMA</span>
            </h1>

            {/* Dynamic Animated Role Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
                minHeight: '38px',
              }}
            >
              <span style={{ color: '#94a3b8', fontSize: '1.2rem', fontWeight: 500 }}>I am a</span>
              <div
                style={{
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.35)',
                  color: '#38bdf8',
                  padding: '4px 16px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-heading)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.15)',
                }}
              >
                <span>{displayedText}</span>
                <span style={{ borderRight: '2px solid #38bdf8', height: '1.2rem', animation: 'pulseGlow 0.8s infinite' }} />
              </div>
            </div>

            {/* Tagline from reference prompt */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#cbd5e1',
                lineHeight: 1.6,
                marginBottom: '24px',
                maxWidth: '560px',
                fontWeight: 400,
              }}
            >
              {personalInfo.tagline}
            </p>

            {/* Role Pills Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '36px',
              }}
            >
              {personalInfo.roles.map((role) => (
                <span
                  key={role}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    fontWeight: 500,
                  }}
                >
                  ⚡ {role}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                marginBottom: '36px',
              }}
            >
              <button
                onClick={scrollToProjects}
                className="btn-neon-primary"
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onOpenResume}
                className="btn-glass-secondary"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onSwitchTo3D}
                style={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(6, 182, 212, 0.2))',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  color: '#e9d5ff',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <Sparkles size={16} color="#c084fc" />
                <span>Explore 3D Galaxy</span>
              </button>
            </div>

            {/* Social Links Pill Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Connect:
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0a66c2',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(10, 102, 194, 0.2)';
                    e.currentTarget.style.borderColor = '#0a66c2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <LinkedinIcon size={18} />
                </a>

                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Profile"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f8fafc',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <GithubIcon size={18} />
                </a>

                <a
                  href={personalInfo.socialLinks.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  title="LeetCode Profile (1606)"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffa116',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 161, 22, 0.2)';
                    e.currentTarget.style.borderColor = '#ffa116';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <Terminal size={18} />
                </a>

                <a
                  href={personalInfo.socialLinks.codeforces}
                  target="_blank"
                  rel="noreferrer"
                  title="Codeforces Profile (1333)"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  CF
                </a>

                <a
                  href={personalInfo.socialLinks.codechef}
                  target="_blank"
                  rel="noreferrer"
                  title="CodeChef Profile (3★)"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b5cf6',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.borderColor = '#8b5cf6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  CC
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glowing Profile Frame with Real Image and Badges */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Pulsing neon back-glow */}
            <div
              style={{
                position: 'absolute',
                width: '340px',
                height: '340px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(6, 182, 212, 0.4))',
                filter: 'blur(40px)',
                zIndex: 1,
              }}
            />

            {/* Profile Card Container with Custom Organic Neon Border */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: '320px',
                height: '380px',
                borderRadius: '28px',
                padding: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #4f46e5 50%, #a855f7)',
                boxShadow: '0 20px 50px -10px rgba(6, 182, 212, 0.35)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  background: '#0a0d1d',
                  position: 'relative',
                }}
              >
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transform: 'scale(1.02)',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Gradient overlay at bottom of photo */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'linear-gradient(to top, rgba(7, 8, 14, 0.95), transparent)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ffffff' }}>
                    Kailash Sharma
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 500 }}>
                    IIT Kharagpur • 2023 - 2027
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge 1: IIT Kharagpur */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-10px',
                zIndex: 3,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '16px',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                animation: 'float 6s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                <GraduationCap size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>IIT Kharagpur</div>
              </div>
            </div>

            {/* Floating Badge 2: LeetCode Max 1606 */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '15px',
                left: '-20px',
                zIndex: 3,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 161, 22, 0.4)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                animation: 'float 5s ease-in-out infinite 1s',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(255, 161, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffa116',
                }}
              >
                <Terminal size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LeetCode</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffa116', fontFamily: 'var(--font-mono)' }}>1606 Max Rating</div>
              </div>
            </div>

            {/* Floating Badge 3: Omnixan Finalist */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '-25px',
                right: '20px',
                zIndex: 3,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '14px',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                animation: 'float 7s ease-in-out infinite 2s',
              }}
            >
              <Award size={16} color="#c084fc" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e9d5ff' }}>
                Omnixan Hackathon Finalist
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
