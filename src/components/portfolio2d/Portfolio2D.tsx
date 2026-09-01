import React from 'react';
import { Hero2D } from './Hero2D';
import { About2D } from './About2D';
import { Experience2D } from './Experience2D';
import { Projects2D } from './Projects2D';
import { Achievements2D } from './Achievements2D';
import { Skills2D } from './Skills2D';
import { CPProfiles2D } from './CPProfiles2D';
import { Contact2D } from './Contact2D';
import { Sparkles, ArrowUp, Globe } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface Portfolio2DProps {
  onOpenResume: () => void;
  onSwitchTo3D: () => void;
  onBackToSelector: () => void;
}

export const Portfolio2D: React.FC<Portfolio2DProps> = ({
  onOpenResume,
  onSwitchTo3D,
  onBackToSelector,
}) => {
  const scrollToTop = () => {
    soundManager.playHoverBeep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* 2D Sections */}
      <Hero2D onOpenResume={onOpenResume} onSwitchTo3D={onSwitchTo3D} />
      <About2D />
      <Experience2D />
      <Projects2D />
      <Achievements2D />
      <Skills2D />
      <CPProfiles2D />
      <Contact2D />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(5, 7, 15, 0.95)',
          padding: '40px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="container-custom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#fff',
                fontSize: '0.9rem',
              }}
            >
              KS
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f8fafc' }}>
              Kailash Sharma
            </span>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.86rem', maxWidth: '500px' }}>
            Engineered with modern React, Three.js, and Vanilla CSS design system. Inspired by futuristic cyberpunk aesthetics and high-performance distributed systems.
          </p>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#38bdf8' }}>
            <button
              onClick={onSwitchTo3D}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c084fc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} />
              <span>Launch 3D Galaxy World</span>
            </button>
            <span>•</span>
            <button
              onClick={onBackToSelector}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
              }}
            >
              <Globe size={14} />
              <span>Experience Selector</span>
            </button>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
            © {new Date().getFullYear()} Kailash Sharma • Indian Institute of Technology, Kharagpur
          </div>
        </div>
      </footer>

      {/* Floating Bottom Action Dock (Scroll to Top & Switch to 3D) */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <button
          onClick={onSwitchTo3D}
          title="Enter 3D Three.js Galaxy"
          style={{
            background: 'linear-gradient(135deg, #9333ea, #06b6d4)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(147, 51, 234, 0.5)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Sparkles size={20} />
        </button>

        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          style={{
            background: 'rgba(16, 18, 35, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#f8fafc',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};
