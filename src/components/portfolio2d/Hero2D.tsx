import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { ArrowRight, Download, Terminal, Sparkles, Award, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { soundManager } from '../../utils/sound';

interface Hero2DProps {
  onOpenResume: () => void;
  onSwitchTo3D: () => void;
}

const TERMINAL_COMMANDS = [
  {
    cmd: "cluster-cli status --cluster=raft-kv-5node",
    output: [
      "[INFO] Connecting to C++20 Raft cluster...",
      "✓ 5/5 Nodes Synchronized | Leader: node-01 (Port: 9001)",
      "✓ Consensus: Raft Quorum Healthy | In-Flight Logs: 0",
      "✓ Latency Benchmark: P50: 0.8ms | P95: 2.1ms | P99: 3.4ms"
    ]
  },
  {
    cmd: "drishti-engine eval --stream --prompt \"Execute LLM transaction\"",
    output: [
      "[OVERSIGHT] Intercepting streaming token stream...",
      "✓ Critic Model Verification: PASSED (99.8% semantic match)",
      "✓ PII & Risk Classifier: ZERO LEAKAGE DETECTED",
      "✓ Composite Risk Score: 0.02 [ACTION: PASS DIRECT]"
    ]
  },
  {
    cmd: "meetmux-rpc latency --service=Judge0.ProctorStream",
    output: [
      "[METRIC] Replaced REST with gRPC inter-service RPC...",
      "✓ Latency reduction: -35% | Active sessions: 1,200+",
      "✓ Judge0 Sandbox evaluations today: 5,420 completed"
    ]
  },
  {
    cmd: "profile-benchmarks --candidate=kailash_382005",
    output: [
      "✓ LeetCode Peak Rating: 1,770 (Top 4% • Contest 500)",
      "✓ CodeChef Starters 254: Global Rank 184 / 30,000+",
      "✓ Omnikon National Hackathon: 6th Rank / 3,000+ Teams",
      "✓ IIT Kharagpur B.Tech (Hons.) • CGPA: 7.37/10"
    ]
  }
];

export const Hero2D: React.FC<Hero2DProps> = ({ onOpenResume, onSwitchTo3D }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Terminal Simulator State
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [cmdDone, setCmdDone] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);

  // 3D Tilt for Hero Card
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic typing effect for roles
  useEffect(() => {
    const currentRole = personalInfo.roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
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

  // Terminal Typing Simulation Loop
  useEffect(() => {
    const currentEntry = TERMINAL_COMMANDS[terminalIndex] || TERMINAL_COMMANDS[0];
    let charIdx = 0;
    setTypedCmd('');
    setCmdDone(false);
    setOutputLines([]);

    let lineInterval: ReturnType<typeof setInterval> | null = null;
    let nextTimeout: ReturnType<typeof setTimeout> | null = null;

    const typeInterval = setInterval(() => {
      if (charIdx < currentEntry.cmd.length) {
        setTypedCmd(currentEntry.cmd.substring(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(typeInterval);
        setCmdDone(true);
        // Reveal output lines progressively
        let lineIdx = 0;
        lineInterval = setInterval(() => {
          if (lineIdx < currentEntry.output.length) {
            const nextLine = currentEntry.output[lineIdx];
            if (typeof nextLine === 'string') {
              setOutputLines((prev) => [...prev, nextLine]);
            }
            lineIdx++;
          } else {
            if (lineInterval) clearInterval(lineInterval);
            // Wait and cycle to next command
            nextTimeout = setTimeout(() => {
              setTerminalIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
            }, 4500);
          }
        }, 220);
      }
    }, 45);

    return () => {
      clearInterval(typeInterval);
      if (lineInterval) clearInterval(lineInterval);
      if (nextTimeout) clearTimeout(nextTimeout);
    };
  }, [terminalIndex]);

  // Particle Canvas Physics Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.8 + 0.6,
      color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(168, 85, 247, '
    }));

    let mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist2 / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      x: (y / (rect.height / 2)) * -10,
      y: (x / (rect.width / 2)) * 10
    });
  };

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
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      {/* Ambient Radial Color Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.18) 0%, rgba(7, 8, 14, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(7, 8, 14, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Introductions, Roles, Terminal Simulator */}
          <div>
            {/* Live Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '18px',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.2)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px #10b981' }} />
              <span>Available for Software Engineering & Systems Roles</span>
            </div>

            {/* Greeting & Full / Display Name */}
            <h2
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                color: '#38bdf8',
                marginBottom: '6px',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Hi, I am
            </h2>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.1rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '8px',
              }}
            >
              <span>KAILASH </span>
              <span className="gradient-text">SHARMA</span>
            </h1>

            {/* Full Legal Name from Resume */}
            <div
              style={{
                fontSize: '0.88rem',
                color: '#94a3b8',
                fontFamily: 'var(--font-mono)',
                marginBottom: '16px',
                letterSpacing: '0.02em',
              }}
            >
              Pochiraju Kailash Ram Markandeya Sharma
            </div>

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
              <span style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: 500 }}>Specializing in</span>
              <div
                style={{
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  color: '#38bdf8',
                  padding: '4px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-heading)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.15)',
                }}
              >
                <span>{displayedText}</span>
                <span style={{ borderRight: '2px solid #38bdf8', height: '1.1rem', animation: 'pulseGlow 0.8s infinite' }} />
              </div>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
                color: '#cbd5e1',
                lineHeight: 1.6,
                marginBottom: '22px',
                maxWidth: '560px',
              }}
            >
              {personalInfo.tagline}
            </p>

            {/* Interactive Cyber-Terminal Simulator */}
            <div
              className="cyber-terminal"
              style={{
                marginBottom: '28px',
                maxWidth: '580px',
              }}
            >
              <div className="cyber-terminal-header">
                <div className="cyber-terminal-dots">
                  <span style={{ backgroundColor: '#ef4444' }} />
                  <span style={{ backgroundColor: '#f59e0b' }} />
                  <span style={{ backgroundColor: '#10b981' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={12} color="#38bdf8" />
                  <span>kailash@iitkgp-cluster: ~</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {TERMINAL_COMMANDS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playKeyClick();
                        setTerminalIndex(idx);
                      }}
                      title={`Run Command ${idx + 1}`}
                      style={{
                        background: terminalIndex === idx ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'background 0.2s',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="cyber-terminal-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '8px' }}>
                  <span style={{ color: '#10b981' }}>➜</span>
                  <span style={{ color: '#94a3b8' }}>~</span>
                  <span style={{ fontWeight: 600, color: '#f8fafc' }}>{typedCmd}</span>
                  {!cmdDone && <span style={{ width: '7px', height: '14px', background: '#38bdf8', display: 'inline-block' }} />}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {outputLines.map((line, idx) => {
                    if (!line) return null;
                    const isSuccess = line.startsWith('✓');
                    const isTag = line.startsWith('[');
                    return (
                      <div
                        key={idx}
                        style={{
                          color: isSuccess ? '#34d399' : isTag ? '#c084fc' : '#cbd5e1',
                          fontSize: '0.8rem',
                          animation: 'fadeIn 0.2s ease-out',
                        }}
                      >
                        {line}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
                marginBottom: '32px',
              }}
            >
              <button onClick={scrollToProjects} className="btn-neon-primary">
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onOpenResume} className="btn-glass-secondary">
                <Download size={18} />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onSwitchTo3D}
                style={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.25), rgba(6, 182, 212, 0.25))',
                  border: '1px solid rgba(168, 85, 247, 0.45)',
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
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.2)',
                }}
              >
                <Sparkles size={16} color="#c084fc" />
                <span>Enter 3D Galaxy</span>
              </button>
            </div>

            {/* Social Links Pill Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Profiles:
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
                  title="LeetCode (1,770 Peak Rating • Top 4%)"
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
                  title="Codeforces (1333 Rating • Rank 1,530)"
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
                  title="CodeChef (Global Rank 184)"
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

          {/* Right Column: 3D Tilting Glowing Profile Showcase */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              perspective: '1000px',
            }}
          >
            {/* Pulsing neon back-glow */}
            <div
              style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.35), rgba(6, 182, 212, 0.35))',
                filter: 'blur(50px)',
                zIndex: 1,
              }}
            />

            {/* Profile Card Container with Interactive 3D Tilt */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={() => setCardTilt({ x: 0, y: 0 })}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '330px',
                height: '400px',
                borderRadius: '30px',
                padding: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #4f46e5 50%, #a855f7)',
                boxShadow: '0 25px 60px -10px rgba(6, 182, 212, 0.4), 0 0 30px rgba(168, 85, 247, 0.25)',
                transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
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

                {/* Bottom dark gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '110px',
                    background: 'linear-gradient(to top, rgba(7, 8, 14, 0.96) 20%, transparent)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '18px',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                    Kailash Sharma
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>
                    IIT Kharagpur • 2023 – 2027
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
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Education</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc' }}>IIT Kharagpur</div>
              </div>
            </div>

            {/* Floating Badge 2: LeetCode Max 1,770 */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '-25px',
                zIndex: 3,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 161, 22, 0.45)',
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
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LeetCode Contest 500</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffa116', fontFamily: 'var(--font-mono)' }}>
                  1,770 Peak (Top 4%)
                </div>
              </div>
            </div>

            {/* Floating Badge 3: Omnikon 6th Position */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '-25px',
                right: '15px',
                zIndex: 3,
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '14px',
                border: '1px solid rgba(168, 85, 247, 0.45)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                animation: 'float 7s ease-in-out infinite 2s',
              }}
            >
              <Award size={16} color="#c084fc" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e9d5ff' }}>
                Omnikon 6th / 3,000+ Teams
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
