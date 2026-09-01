import React from 'react';
import { celestialStations } from '../../data/portfolioData';
import { Volume2, VolumeX, Eye, Orbit, Compass, Box } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface GalaxyHudProps {
  activeStationId: string | null;
  onSelectStation: (id: string) => void;
  onResetCamera: () => void;
  onSwitchTo2D: () => void;
  onBackToSelector: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GalaxyHud: React.FC<GalaxyHudProps> = ({
  activeStationId,
  onSelectStation,
  onResetCamera,
  onSwitchTo2D,
  onBackToSelector,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
      }}
    >
      {/* Top HUD Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'auto',
          marginTop: '60px',
        }}
      >
        {/* Left Telemetry / System Coordinates */}
        <div
          className="glass-panel"
          style={{
            padding: '12px 18px',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            background: 'rgba(7, 10, 24, 0.75)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)',
            maxWidth: '280px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
            <Orbit size={15} className="animate-spin-slow" />
            <span>KS-SYSTEM // ORBITAL MATRIX</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
            Sector: IIT-KGP / Nexus 01
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.72rem', marginTop: '2px' }}>
            Status: <span style={{ color: '#34d399', fontWeight: 600 }}>ONLINE • 7 STATIONS SYNCHRONIZED</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onResetCamera();
            }}
            title="Reset to Galactic Overview"
            style={{
              background: 'rgba(16, 20, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <Eye size={14} />
            <span style={{ display: 'none' }} className="hud-label-desktop">Overview</span>
            <style>{`
              @media (min-width: 640px) {
                .hud-label-desktop { display: inline !important; }
              }
            `}</style>
          </button>

          <button
            onClick={onToggleMute}
            title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
            style={{
              background: isMuted ? 'rgba(16, 20, 42, 0.8)' : 'rgba(6, 182, 212, 0.2)',
              border: `1px solid ${isMuted ? 'rgba(255, 255, 255, 0.15)' : 'rgba(6, 182, 212, 0.5)'}`,
              color: isMuted ? '#94a3b8' : '#38bdf8',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={() => {
              soundManager.playSelectSound();
              onBackToSelector();
            }}
            title="Return to Experience Selector"
            style={{
              background: 'rgba(16, 20, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <Compass size={14} />
            <span>Selector</span>
          </button>

          <button
            onClick={() => {
              soundManager.playSelectSound();
              onSwitchTo2D();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.7), rgba(6, 182, 212, 0.7))',
              border: '1px solid rgba(6, 182, 212, 0.5)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              fontFamily: 'var(--font-heading)',
              boxShadow: '0 0 16px rgba(6, 182, 212, 0.3)',
            }}
          >
            <Box size={14} />
            <span>Switch to 2D Mode</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation Dock: 7 Planetary Stations */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'auto',
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Controls Instructions Hint */}
        <div
          style={{
            background: 'rgba(7, 10, 24, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            color: '#94a3b8',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span>🖱️ <strong>Drag</strong> to rotate orbit</span>
          <span>•</span>
          <span>🔍 <strong>Scroll</strong> to zoom</span>
          <span>•</span>
          <span>🪐 <strong>Click planet</strong> to inspect station</span>
        </div>

        {/* Stations Dock Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(10, 13, 29, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '8px 12px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.15)',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
        >
          {celestialStations.map((station) => {
            const isSelected = activeStationId === station.id;
            return (
              <button
                key={station.id}
                onClick={() => {
                  soundManager.playWarpSound();
                  onSelectStation(station.id);
                }}
                title={`Navigate to ${station.name}`}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${station.color}30, ${station.color}15)`
                    : 'transparent',
                  border: isSelected ? `1px solid ${station.color}` : '1px solid transparent',
                  color: isSelected ? '#ffffff' : '#cbd5e1',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: isSelected ? `0 0 15px ${station.color}40` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: station.color,
                    display: 'inline-block',
                    boxShadow: `0 0 8px ${station.color}`,
                  }}
                />
                <span>{station.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
