import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Box, Compass, Menu, X, FileText } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface NavbarProps {
  currentView: 'selector' | '2d' | '3d';
  onNavigate: (view: 'selector' | '2d' | '3d') => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenResume }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (currentView === '2d') {
        const sections = ['hero', 'about', 'experience', 'projects', 'achievements', 'skills', 'cp', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleAudioToggle = () => {
    const unmuted = soundManager.toggleMute();
    setIsMuted(!unmuted);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' },
    { id: 'cp', label: 'CP Profiles' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    soundManager.playHoverBeep();
    if (currentView !== '2d') {
      onNavigate('2d');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        padding: isScrolled ? '12px 24px' : '18px 28px',
        backgroundColor: isScrolled ? 'rgba(7, 8, 14, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Brand Logo */}
      <div
        onClick={() => {
          soundManager.playSelectSound();
          onNavigate('selector');
        }}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
        title="Experience Selector"
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem',
            fontFamily: 'var(--font-heading)',
            color: '#ffffff',
            boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)',
          }}
        >
          KS
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Kailash Sharma</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#06b6d4', display: 'inline-block' }} />
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            IIT Kharagpur
          </div>
        </div>
      </div>

      {/* 2D View Nav Links (Desktop) */}
      {currentView === '2d' && (
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(16, 18, 35, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '4px 8px',
            borderRadius: '9999px',
            backdropFilter: 'blur(12px)',
          }}
          className="desktop-nav"
        >
          <style>{`
            @media (min-width: 960px) {
              .desktop-nav { display: flex !important; }
            }
          `}</style>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(6, 182, 212, 0.3))' : 'transparent',
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      )}

      {/* Right Controls: Mode Toggle, Audio Toggle, Resume, Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Audio Synthesizer Toggle */}
        <button
          onClick={handleAudioToggle}
          title={isMuted ? 'Turn Ambient Sound ON' : 'Turn Ambient Sound OFF'}
          style={{
            background: isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(6, 182, 212, 0.15)',
            border: `1px solid ${isMuted ? 'rgba(255, 255, 255, 0.1)' : 'rgba(6, 182, 212, 0.4)'}`,
            color: isMuted ? '#94a3b8' : '#06b6d4',
            borderRadius: '10px',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Mode Switcher Pill */}
        {currentView === '2d' ? (
          <button
            onClick={() => {
              soundManager.playWarpSound();
              onNavigate('3d');
            }}
            style={{
              background: 'linear-gradient(135deg, #9333ea, #06b6d4)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(147, 51, 234, 0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <Sparkles size={15} />
            <span>Enter 3D Galaxy</span>
          </button>
        ) : currentView === '3d' ? (
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onNavigate('2d');
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#f8fafc',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
          >
            <Box size={15} />
            <span>Switch to 2D</span>
          </button>
        ) : null}

        {/* Back to selector if not already there */}
        {currentView !== 'selector' && (
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onNavigate('selector');
            }}
            title="Experience Selector"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <Compass size={18} />
          </button>
        )}

        {/* Resume Button */}
        {onOpenResume && (
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onOpenResume();
            }}
            style={{
              background: 'rgba(79, 70, 229, 0.15)',
              border: '1px solid rgba(79, 70, 229, 0.4)',
              color: '#a5b4fc',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="resume-desktop-btn"
          >
            <style>{`
              @media (min-width: 640px) {
                .resume-desktop-btn { display: flex !important; }
              }
            `}</style>
            <FileText size={15} />
            <span>Resume</span>
          </button>
        )}

        {/* Mobile Hamburger Menu Toggle (for 2D) */}
        {currentView === '2d' && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f8fafc',
              borderRadius: '10px',
              padding: '8px',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
          >
            <style>{`
              @media (min-width: 960px) {
                .mobile-menu-btn { display: none !important; }
              }
            `}</style>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && currentView === '2d' && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: '16px',
            right: '16px',
            background: 'rgba(13, 15, 28, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 100,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: activeSection === link.id ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                border: 'none',
                color: activeSection === link.id ? '#38bdf8' : '#cbd5e1',
                padding: '10px 14px',
                borderRadius: '8px',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          {onOpenResume && (
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              style={{
                marginTop: '8px',
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                border: 'none',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <FileText size={16} />
              <span>View & Download Resume</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
