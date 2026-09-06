import React from 'react';
import { celestialStations } from '../../data/portfolioData';
import { Volume2, VolumeX, Eye, Orbit, Compass, Box, Play, Pause, Crosshair } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface GalaxyHudProps {
  activeStationId: string | null;
  onSelectStation: (id: string) => void;
  onResetCamera: () => void;
  onSwitchTo2D: () => void;
  onBackToSelector: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isAutoTour?: boolean;
  onToggleAutoTour?: () => void;
}

export const GalaxyHud: React.FC<GalaxyHudProps> = ({
  activeStationId,
  onSelectStation,
  onResetCamera,
  onSwitchTo2D,
  onBackToSelector,
  isMuted,
  onToggleMute,
  isAutoTour = false,
  onToggleAutoTour,
}) => {
  const activeStation = celestialStations.find((s) => s.id === activeStationId);

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
            border: '1px solid rgba(6, 182, 212, 0.35)',
            background: 'rgba(7, 10, 24, 0.8)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
            maxWidth: '300px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
            <Orbit size={15} className="animate-spin-slow" />
            <span>KS-SYSTEM // ORBITAL MATRIX</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
            Sector: IIT-Kharagpur / Nexus 01
          </div>
          <div style={{ color: '#cbd5e1', fontSize: '0.72rem', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Status:</span>
            <span style={{ color: isAutoTour ? '#c084fc' : '#34d399', fontWeight: 700 }}>
              {isAutoTour ? 'AUTOPILOT TOUR ACTIVE' : '8 STATIONS SYNCHRONIZED'}
            </span>
          </div>
          {activeStation && (
            <div style={{ marginTop: '4px', fontSize: '0.72rem', color: activeStation.color, fontWeight: 600 }}>
              Tracking: {activeStation.name} [{activeStation.distance} AU]
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Autopilot Tour Toggle Button */}
          {onToggleAutoTour && (
            <button
              onClick={onToggleAutoTour}
              title={isAutoTour ? 'Pause Autopilot Galaxy Tour' : 'Start Cinematic Autopilot Tour'}
              style={{
                background: isAutoTour ? 'linear-gradient(135deg, #9333ea, #ec4899)' : 'rgba(16, 20, 42, 0.85)',
                border: isAutoTour ? '1px solid #ec4899' : '1px solid rgba(168, 85, 247, 0.4)',
                color: isAutoTour ? '#ffffff' : '#e9d5ff',
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
                boxShadow: isAutoTour ? '0 0 20px rgba(236, 72, 153, 0.4)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {isAutoTour ? <Pause size={14} /> : <Play size={14} />}
              <span className="hud-label-desktop">{isAutoTour ? 'Touring...' : 'Auto-Tour'}</span>
            </button>
          )}

          {/* Reset Overview Camera */}
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onResetCamera();
            }}
            title="Reset to Galactic Overview"
            style={{
              background: 'rgba(16, 20, 42, 0.85)',
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
            <span className="hud-label-desktop">Overview</span>
            <style>{`
              @media (max-width: 640px) {
                .hud-label-desktop { display: none !important; }
              }
            `}</style>
          </button>

          {/* Audio Synthesizer with Live Equalizer */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
            style={{
              background: isMuted ? 'rgba(16, 20, 42, 0.85)' : 'rgba(6, 182, 212, 0.2)',
              border: `1px solid ${isMuted ? 'rgba(255, 255, 255, 0.15)' : 'rgba(6, 182, 212, 0.5)'}`,
              color: isMuted ? '#94a3b8' : '#38bdf8',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            {!isMuted && (
              <div className="audio-spectrum">
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
              </div>
            )}
          </button>

          {/* Back to Selector */}
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onBackToSelector();
            }}
            title="Return to Experience Selector"
            style={{
              background: 'rgba(16, 20, 42, 0.85)',
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
            <span className="hud-label-desktop">Selector</span>
          </button>

          {/* Switch to 2D Mode */}
          <button
            onClick={() => {
              soundManager.playSelectSound();
              onSwitchTo2D();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.8), rgba(6, 182, 212, 0.8))',
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

      {/* Center Reticle Lock-On Indicator when a Station is active */}
      {activeStation && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            className="reticle-bracket"
            style={{
              width: '100px',
              height: '100px',
              border: `2px dashed ${activeStation.color}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 25px ${activeStation.color}60`,
            }}
          >
            <Crosshair size={28} color={activeStation.color} />
          </div>
          <div
            style={{
              background: 'rgba(7, 10, 24, 0.85)',
              border: `1px solid ${activeStation.color}50`,
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              color: activeStation.color,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            TARGET LOCKED // {activeStation.name.toUpperCase()}
          </div>
        </div>
      )}

      {/* Bottom Navigation Dock: 8 Planetary Stations */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'auto',
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Controls Instructions Hint */}
        <div
          style={{
            background: 'rgba(7, 10, 24, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '5px 16px',
            borderRadius: '9999px',
            fontSize: '0.74rem',
            color: '#94a3b8',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>🖱️ <strong>Drag</strong> to orbit</span>
          <span>•</span>
          <span>🔍 <strong>Scroll</strong> to zoom</span>
          <span>•</span>
          <span>🪐 <strong>Click planet</strong> to inspect dossier</span>
        </div>

        {/* Stations Dock Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(10, 13, 29, 0.88)',
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
                  soundManager.playTargetLock();
                  onSelectStation(station.id);
                }}
                title={`Navigate to ${station.name}`}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${station.color}35, ${station.color}15)`
                    : 'transparent',
                  border: isSelected ? `1px solid ${station.color}` : '1px solid transparent',
                  color: isSelected ? '#ffffff' : '#cbd5e1',
                  padding: '7px 12px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: isSelected ? `0 0 16px ${station.color}45` : 'none',
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
                    width: '9px',
                    height: '9px',
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
