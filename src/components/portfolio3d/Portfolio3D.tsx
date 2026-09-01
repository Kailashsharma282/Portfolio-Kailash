import React, { useState } from 'react';
import { ThreeScene } from './ThreeScene';
import { GalaxyHud } from './GalaxyHud';
import { PlanetModal } from './PlanetModal';
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

  const handlePlanetSelect = (stationId: string) => {
    setSelectedStationId(stationId);
    // Open holographic modal shortly after camera starts gliding
    setTimeout(() => {
      setIsModalOpen(true);
    }, 450);
  };

  const handleResetCamera = () => {
    setSelectedStationId(null);
    setIsModalOpen(false);
    setResetTrigger((prev) => prev + 1);
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
