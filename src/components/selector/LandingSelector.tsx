import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Layers, Box, Globe, Shield, Terminal, Orbit } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface LandingSelectorProps {
  onSelectExperience: (mode: '2d' | '3d') => void;
}

export const LandingSelector: React.FC<LandingSelectorProps> = ({ onSelectExperience }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tilt2D, setTilt2D] = useState({ x: 0, y: 0 });
  const [tilt3D, setTilt3D] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<'2d' | '3d' | null>(null);

  // Animated starfield canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
      color: Math.random() > 0.6 ? '#38bdf8' : Math.random() > 0.3 ? '#c084fc' : '#ffffff',
    }));

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep cosmic gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 80,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, '#0c0f24');
      bgGrad.addColorStop(0.5, '#070814');
      bgGrad.addColorStop(1, '#030408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebula glow blobs
      const nebula1 = ctx.createRadialGradient(width * 0.25, height * 0.35, 10, width * 0.25, height * 0.35, width * 0.35);
      nebula1.addColorStop(0, 'rgba(79, 70, 229, 0.14)');
      nebula1.addColorStop(1, 'rgba(79, 70, 229, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(width * 0.75, height * 0.6, 10, width * 0.75, height * 0.6, width * 0.35);
      nebula2.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
      nebula2.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw and drift stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: '2d' | '3d') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -12;
    const tiltY = ((x - centerX) / centerX) * 12;

    if (card === '2d') setTilt2D({ x: tiltX, y: tiltY });
    else setTilt3D({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = (card: '2d' | '3d') => {
    if (card === '2d') setTilt2D({ x: 0, y: 0 });
    else setTilt3D({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 40px',
      }}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Astronaut Decorative Element */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          zIndex: 1,
          opacity: 0.85,
          pointerEvents: 'none',
          animation: 'float 7s ease-in-out infinite',
          display: 'none',
        }}
        className="floating-astronaut"
      >
        <style>{`
          @media (min-width: 1024px) {
            .floating-astronaut { display: block !important; }
          }
        `}</style>
        <div
          style={{
            position: 'relative',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(6, 182, 212, 0) 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Orbit size={48} color="#a855f7" className="animate-spin-slow" />
        </div>
      </div>

      {/* Center Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1100px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Sub-header badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(79, 70, 229, 0.15)',
            border: '1px solid rgba(79, 70, 229, 0.4)',
            color: '#a5b4fc',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            boxShadow: '0 0 16px rgba(79, 70, 229, 0.2)',
          }}
        >
          <Sparkles size={14} color="#38bdf8" />
          <span>Interactive Developer Portfolio</span>
        </div>

        {/* Big Catchy Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '10px',
            letterSpacing: '-0.03em',
          }}
        >
          How do you want to{' '}
          <span className="gradient-text">explore my world?</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
            color: '#94a3b8',
            maxWidth: '600px',
            marginBottom: '40px',
            fontWeight: 400,
          }}
        >
          Choose your experience: a sleek, high-performance modern 2D interface or an immersive 3D Three.js planetary galaxy.
        </p>

        {/* The Two Experience Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            width: '100%',
            maxWidth: '920px',
            perspective: '1000px',
            marginBottom: '50px',
          }}
        >
          {/* 2D Experience Card */}
          <div
            onMouseEnter={() => {
              soundManager.playHoverBeep();
              setHoveredCard('2d');
            }}
            onMouseLeave={() => handleMouseLeave('2d')}
            onMouseMove={(e) => handleMouseMove(e, '2d')}
            onClick={() => {
              soundManager.playSelectSound();
              onSelectExperience('2d');
            }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '24px',
              padding: '36px 28px',
              textAlign: 'left',
              background: 'linear-gradient(135deg, rgba(13, 17, 38, 0.85) 0%, rgba(10, 13, 29, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${hoveredCard === '2d' ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.1)'}`,
              boxShadow: hoveredCard === '2d'
                ? '0 20px 45px -10px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.2)'
                : '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
              transform: `rotateX(${tilt2D.x}deg) rotateY(${tilt2D.y}deg) scale(${hoveredCard === '2d' ? 1.02 : 1})`,
              transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
              overflow: 'hidden',
            }}
          >
            {/* Top Card Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#38bdf8',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '20px',
              }}
            >
              <Terminal size={12} />
              <span>Modern Animated Web</span>
            </div>

            {/* Visual Graphic Representation */}
            <div
              style={{
                height: '140px',
                width: '100%',
                borderRadius: '16px',
                background: 'rgba(5, 7, 18, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '24px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>portfolio.tsx</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                  }}
                >
                  KS
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '8px', width: '70%', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '6px' }} />
                  <div style={{ height: '6px', width: '45%', background: 'rgba(6, 182, 212, 0.4)', borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ height: '4px', flex: 1, background: '#4f46e5', borderRadius: '2px' }} />
                <span style={{ height: '4px', flex: 1, background: '#06b6d4', borderRadius: '2px' }} />
                <span style={{ height: '4px', flex: 1, background: '#a855f7', borderRadius: '2px' }} />
              </div>
            </div>

            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '6px',
                color: '#ffffff',
              }}
            >
              EXPLORE IN 2D
            </h3>

            <p
              style={{
                fontSize: '0.85rem',
                color: '#38bdf8',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Modern • Smooth • Interactive
            </p>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                lineHeight: 1.5,
                marginBottom: '24px',
              }}
            >
              Experience sleek typography, smooth scrolling, interactive project modals, and a dark neon theme.
            </p>

            {/* Button */}
            <button
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(6, 182, 212, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Enter 2D World</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* 3D Experience Card */}
          <div
            onMouseEnter={() => {
              soundManager.playHoverBeep();
              setHoveredCard('3d');
            }}
            onMouseLeave={() => handleMouseLeave('3d')}
            onMouseMove={(e) => handleMouseMove(e, '3d')}
            onClick={() => {
              soundManager.playWarpSound();
              onSelectExperience('3d');
            }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '24px',
              padding: '36px 28px',
              textAlign: 'left',
              background: 'linear-gradient(135deg, rgba(24, 12, 44, 0.85) 0%, rgba(13, 9, 29, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${hoveredCard === '3d' ? 'rgba(168, 85, 247, 0.9)' : 'rgba(255, 255, 255, 0.1)'}`,
              boxShadow: hoveredCard === '3d'
                ? '0 20px 45px -10px rgba(168, 85, 247, 0.35), 0 0 35px rgba(168, 85, 247, 0.25)'
                : '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
              transform: `rotateX(${tilt3D.x}deg) rotateY(${tilt3D.y}deg) scale(${hoveredCard === '3d' ? 1.02 : 1})`,
              transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
              overflow: 'hidden',
            }}
          >
            {/* Top Card Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                color: '#c084fc',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '20px',
              }}
            >
              <Globe size={12} />
              <span>Three.js WebGL Universe</span>
            </div>

            {/* Visual Graphic Representation */}
            <div
              style={{
                height: '140px',
                width: '100%',
                borderRadius: '16px',
                background: 'radial-gradient(circle at center, rgba(88, 28, 135, 0.5) 0%, rgba(5, 7, 18, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Planetary Rings Visual */}
              <div
                style={{
                  position: 'absolute',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '130px',
                  height: '35px',
                  border: '2px solid rgba(192, 132, 252, 0.8)',
                  borderRadius: '50%',
                  transform: 'rotate(-25deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '160px',
                  height: '45px',
                  border: '1px dashed rgba(56, 189, 248, 0.5)',
                  borderRadius: '50%',
                  transform: 'rotate(-25deg)',
                }}
              />
            </div>

            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '6px',
                color: '#ffffff',
              }}
            >
              ENTER THE 3D WORLD
            </h3>

            <p
              style={{
                fontSize: '0.85rem',
                color: '#c084fc',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Immersive • Interactive • Real
            </p>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                lineHeight: 1.5,
                marginBottom: '24px',
              }}
            >
              Fly through a 3D galaxy with interactive planetary stations, real-time lighting, smooth camera orbits, and cosmic audio.
            </p>

            {/* Button */}
            <button
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #9333ea 0%, #a855f7 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(147, 51, 234, 0.45)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Enter 3D World</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Feature Badges Footer (as required by prompt section 3) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            maxWidth: '850px',
          }}
        >
          <div className="glass-pill">
            <Layers size={14} color="#38bdf8" />
            <span>Animated Background Parallax Layers</span>
          </div>
          <div className="glass-pill">
            <Shield size={14} color="#a855f7" />
            <span>Glassmorphism Cards</span>
          </div>
          <div className="glass-pill">
            <Box size={14} color="#f59e0b" />
            <span>Hover 3D Tilt Effects</span>
          </div>
          <div className="glass-pill">
            <Sparkles size={14} color="#10b981" />
            <span>Smooth View Transitions</span>
          </div>
          <div className="glass-pill">
            <Globe size={14} color="#ec4899" />
            <span>Fully Responsive Design</span>
          </div>
        </div>
      </div>
    </div>
  );
};
