import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { celestialStations } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

interface ThreeSceneProps {
  onPlanetSelect: (stationId: string) => void;
  targetPlanetId: string | null;
  resetTrigger: number;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  onPlanetSelect,
  targetPlanetId,
  resetTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const planetMeshesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const cameraTargetRef = useRef<{
    pos: THREE.Vector3;
    lookAt: THREE.Vector3;
    isFocusingPlanet: boolean;
    focusStationId: string | null;
  }>({
    pos: new THREE.Vector3(0, 45, 80),
    lookAt: new THREE.Vector3(0, 0, 0),
    isFocusingPlanet: false,
    focusStationId: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050713, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1500
    );
    camera.position.set(0, 45, 80);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x334155, 1.2);
    scene.add(ambientLight);

    // Sun / Nexus PointLight
    const sunLight = new THREE.PointLight(0x38bdf8, 3.5, 300, 1.2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const secondarySunLight = new THREE.PointLight(0xa855f7, 2.5, 300, 1.2);
    secondarySunLight.position.set(0, 0, 0);
    scene.add(secondarySunLight);

    // 4. Central Nexus Core (The Star / Kailash's Digital Core)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Glowing Star
    const coreGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Wireframe geometric shield
    const wireGeo = new THREE.IcosahedronGeometry(4.6, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    const outerWireGeo = new THREE.IcosahedronGeometry(5.8, 1);
    const outerWireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const outerWireMesh = new THREE.Mesh(outerWireGeo, outerWireMat);
    coreGroup.add(outerWireMesh);

    // 5. Procedural Starfield
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starColorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xfde047),
      new THREE.Color(0x6ee7b7),
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(120, 800);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Helper function to generate procedural planet texture canvas
    const createPlanetTexture = (baseColorHex: string, type: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Base background
      ctx.fillStyle = baseColorHex;
      ctx.fillRect(0, 0, 512, 256);

      // Stripes or plasma noise
      for (let i = 0; i < 256; i += 8) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.sin(i * 0.1) * 0.15 + 0.15})`;
        ctx.fillRect(0, i, 512, 4);
      }

      if (type.includes('gas') || type.includes('plasma')) {
        for (let j = 0; j < 6; j++) {
          const y = Math.random() * 256;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
          ctx.fillRect(0, y, 512, Math.random() * 16 + 4);
        }
      }

      return new THREE.CanvasTexture(canvas);
    };

    // 7. Spawn 7 Planetary Stations & Orbit Guide Rings
    const planetObjects: {
      mesh: THREE.Mesh;
      group: THREE.Group;
      data: typeof celestialStations[0];
      currentAngle: number;
    }[] = [];

    celestialStations.forEach((station, idx) => {
      // Orbit guide ring
      const orbitGeo = new THREE.RingGeometry(station.distance - 0.08, station.distance + 0.08, 96);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(station.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
      });
      const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);

      // Planet container group
      const planetGroup = new THREE.Group();
      scene.add(planetGroup);

      // Initial angle spread
      const initialAngle = (idx / celestialStations.length) * Math.PI * 2;
      planetGroup.position.x = Math.cos(initialAngle) * station.distance;
      planetGroup.position.z = Math.sin(initialAngle) * station.distance;

      // Sphere mesh
      const texture = createPlanetTexture(station.color, station.textureType);
      const planetGeo = new THREE.SphereGeometry(station.radius, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        map: texture || undefined,
        color: new THREE.Color(station.color),
        roughness: 0.5,
        metalness: 0.2,
        emissive: new THREE.Color(station.emissive),
        emissiveIntensity: 0.4,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.userData = { stationId: station.id, name: station.name, label: station.label };
      planetGroup.add(planetMesh);
      planetMeshesRef.current[station.id] = planetMesh;

      // Planet rings if applicable
      if (station.hasRings && station.ringColor) {
        const ringGeo = new THREE.RingGeometry(station.radius * 1.4, station.radius * 2.3, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(station.ringColor),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
          emissive: new THREE.Color(station.ringColor),
          emissiveIntensity: 0.3,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = 0.2;
        planetGroup.add(ringMesh);
      }

      // Atmospheric glowing halo sprite
      const haloCanvas = document.createElement('canvas');
      haloCanvas.width = 128;
      haloCanvas.height = 128;
      const hCtx = haloCanvas.getContext('2d');
      if (hCtx) {
        const grad = hCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
        grad.addColorStop(0, station.color);
        grad.addColorStop(0.4, station.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        hCtx.fillStyle = grad;
        hCtx.fillRect(0, 0, 128, 128);
      }
      const haloTexture = new THREE.CanvasTexture(haloCanvas);
      const haloMat = new THREE.SpriteMaterial({
        map: haloTexture,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(station.radius * 3.6, station.radius * 3.6, 1);
      planetGroup.add(haloSprite);

      // Label sprite billboard above planet
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 256;
      textCanvas.height = 64;
      const tCtx = textCanvas.getContext('2d');
      if (tCtx) {
        tCtx.fillStyle = 'rgba(7, 10, 24, 0.75)';
        tCtx.roundRect ? tCtx.roundRect(8, 8, 240, 48, 10) : tCtx.fillRect(8, 8, 240, 48);
        tCtx.fill();
        tCtx.strokeStyle = station.color;
        tCtx.lineWidth = 2;
        tCtx.stroke();
        tCtx.fillStyle = '#ffffff';
        tCtx.font = 'bold 22px sans-serif';
        tCtx.textAlign = 'center';
        tCtx.textBaseline = 'middle';
        tCtx.fillText(station.label, 128, 32);
      }
      const textTexture = new THREE.CanvasTexture(textCanvas);
      const textMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true });
      const textSprite = new THREE.Sprite(textMat);
      textSprite.position.y = station.radius + 1.8;
      textSprite.scale.set(5.5, 1.4, 1);
      planetGroup.add(textSprite);

      planetObjects.push({
        mesh: planetMesh,
        group: planetGroup,
        data: station,
        currentAngle: initialAngle,
      });
    });

    // 8. Interactive Orbit Controls & Raycasting
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let sphericalAngles = { theta: 0, phi: Math.PI / 4, radius: 95 };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        sphericalAngles.theta -= deltaX * 0.005;
        sphericalAngles.phi = Math.max(
          0.1,
          Math.min(Math.PI / 2 - 0.05, sphericalAngles.phi - deltaY * 0.005)
        );

        // Cancel planet focus on manual user orbit drag
        cameraTargetRef.current.isFocusingPlanet = false;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Raycast hover detection
        raycaster.setFromCamera(mouse, camera);
        const meshes = planetObjects.map((p) => p.mesh);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          if (hoveredMesh !== hit) {
            hoveredMesh = hit;
            container.style.cursor = 'pointer';
            soundManager.playHoverBeep();
          }
        } else {
          if (hoveredMesh) {
            hoveredMesh = null;
            container.style.cursor = 'grab';
          }
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      sphericalAngles.radius = Math.max(20, Math.min(220, sphericalAngles.radius + e.deltaY * 0.08));
      cameraTargetRef.current.isFocusingPlanet = false;
    };

    const onClick = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = planetObjects.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const stationId = clickedMesh.userData.stationId;
        if (stationId) {
          soundManager.playWarpSound();
          onPlanetSelect(stationId);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel);
    domEl.addEventListener('click', onClick);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 9. Main Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Rotate central core
      wireMesh.rotation.y += 0.008;
      outerWireMesh.rotation.y -= 0.005;
      outerWireMesh.rotation.x += 0.003;
      coreMesh.rotation.y += 0.004;

      // Orbit and rotate planets
      planetObjects.forEach((item) => {
        // Slow realistic orbital motion
        item.currentAngle += item.data.speed * delta * 0.12;
        item.group.position.x = Math.cos(item.currentAngle) * item.data.distance;
        item.group.position.z = Math.sin(item.currentAngle) * item.data.distance;
        item.mesh.rotation.y += 0.015;

        // Hover scale animation
        if (hoveredMesh === item.mesh) {
          item.mesh.scale.lerp(new THREE.Vector3(1.18, 1.18, 1.18), 0.1);
        } else {
          item.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Slowly drift starfield
      starField.rotation.y = elapsedTime * 0.005;

      // Camera position interpolation
      if (cameraTargetRef.current.isFocusingPlanet && cameraTargetRef.current.focusStationId) {
        const focusedObj = planetObjects.find(
          (p) => p.data.id === cameraTargetRef.current.focusStationId
        );
        if (focusedObj) {
          const pPos = focusedObj.group.position;
          // Position camera slightly offset from the planet
          cameraTargetRef.current.pos.set(
            pPos.x + focusedObj.data.radius * 2.8,
            pPos.y + focusedObj.data.radius * 1.5,
            pPos.z + focusedObj.data.radius * 3.5
          );
          cameraTargetRef.current.lookAt.copy(pPos);
        }
      } else {
        // Orbit overview camera using spherical coordinates
        const targetX =
          sphericalAngles.radius * Math.sin(sphericalAngles.phi) * Math.sin(sphericalAngles.theta);
        const targetY = sphericalAngles.radius * Math.cos(sphericalAngles.phi);
        const targetZ =
          sphericalAngles.radius * Math.sin(sphericalAngles.phi) * Math.cos(sphericalAngles.theta);

        cameraTargetRef.current.pos.set(targetX, targetY, targetZ);
        cameraTargetRef.current.lookAt.set(0, 0, 0);
      }

      // Smooth camera lerp
      camera.position.lerp(cameraTargetRef.current.pos, 0.05);
      currentLookAt.lerp(cameraTargetRef.current.lookAt, 0.05);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('wheel', onWheel);
      domEl.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);

      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // React to programmatic planet selection (e.g. from HUD dock)
  useEffect(() => {
    if (targetPlanetId) {
      cameraTargetRef.current.isFocusingPlanet = true;
      cameraTargetRef.current.focusStationId = targetPlanetId;
    }
  }, [targetPlanetId]);

  // React to reset camera trigger
  useEffect(() => {
    if (resetTrigger > 0) {
      cameraTargetRef.current.isFocusingPlanet = false;
      cameraTargetRef.current.focusStationId = null;
    }
  }, [resetTrigger]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    />
  );
};
