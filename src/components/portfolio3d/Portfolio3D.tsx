import React, { useState, useEffect } from 'react';
import { ThreeScene } from './ThreeScene';
import { GalaxyHud } from './GalaxyHud';
import { PlanetModal } from './PlanetModal';
import { celestialStations } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

interface Portfolio3DProps {
  onSwitchTo2D: () => void;
  onBackToSelector: () => void;
  onOpenResume?: () => void;
}

export const Portfolio3D: React.FC<Portfolio3DProps> = ({
  onSwitchTo2D,
  onBackToSelector,
  onOpenResume,
}) => {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [isAutoTour, setIsAutoTour] = useState(false);

  // Auto-Tour planetary cycle timer
  useEffect(() => {
    if (!isAutoTour) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % celestialStations.length;
      const nextStation = celestialStations[currentIndex];
      setSelectedStationId(nextStation.id);
      setIsModalOpen(false);
      soundManager.playWarpSound();
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoTour]);

  const handlePlanetSelect = (stationId: string) => {
    setIsAutoTour(false);
    setSelectedStationId(stationId);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 450);
  };

  const handleResetCamera = () => {
    setIsAutoTour(false);
    setSelectedStationId(null);
    setIsModalOpen(false);
    setResetTrigger((prev) => prev + 1);
  };

  const handleToggleAutoTour = () => {
    soundManager.playSelectSound();
    setIsAutoTour((prev) => {
      const next = !prev;
      if (next) {
        setIsModalOpen(false);
        setSelectedStationId(celestialStations[0].id);
      }
      return next;
    });
  };

  const handleToggleMute = () => {
    const unmuted = soundManager.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#03050d',
      }}
    >
      {/* 3D WebGL Canvas */}
      <ThreeScene
        onPlanetSelect={handlePlanetSelect}
        targetPlanetId={selectedStationId}
        resetTrigger={resetTrigger}
      />

      {/* Futuristic Sci-Fi Galaxy HUD Overlay */}
      <GalaxyHud
        activeStationId={selectedStationId}
        onSelectStation={handlePlanetSelect}
        onResetCamera={handleResetCamera}
        onSwitchTo2D={onSwitchTo2D}
        onBackToSelector={onBackToSelector}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isAutoTour={isAutoTour}
        onToggleAutoTour={handleToggleAutoTour}
      />

      {/* Holographic Station Detail Modal */}
      {isModalOpen && selectedStationId && (
        <PlanetModal
          stationId={selectedStationId}
          onClose={() => setIsModalOpen(false)}
          onOpenResume={onOpenResume}
        />
      )}
    </div>
  );
};
