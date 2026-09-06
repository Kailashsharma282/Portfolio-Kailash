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
  const onPlanetSelectRef = useRef(onPlanetSelect);
  useEffect(() => {
    onPlanetSelectRef.current = onPlanetSelect;
  }, [onPlanetSelect]);

  const cameraTargetRef = useRef<{
    pos: THREE.Vector3;
    lookAt: THREE.Vector3;
    isFocusingPlanet: boolean;
    focusStationId: string | null;
    targetFov: number;
  }>({
    pos: new THREE.Vector3(0, 50, 95),
    lookAt: new THREE.Vector3(0, 0, 0),
    isFocusingPlanet: false,
    focusStationId: null,
    targetFov: 55,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040612, 0.0032);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1800
    );
    camera.position.set(0, 50, 95);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    // 2. Renderer with High-Performance Config
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Dynamic Cosmic Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.4);
    scene.add(ambientLight);

    // Primary Core Stellar Light (Cyan)
    const sunLight = new THREE.PointLight(0x38bdf8, 4.0, 350, 1.1);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Secondary Corona Stellar Light (Purple)
    const secondarySunLight = new THREE.PointLight(0xa855f7, 3.0, 350, 1.1);
    secondarySunLight.position.set(0, 0, 0);
    scene.add(secondarySunLight);

    // 4. Central Nexus Star Core (Multitiered Plasma Core)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Glowing Inner Plasma Sphere
    const coreGeo = new THREE.SphereGeometry(3.6, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Atmospheric Corona Halo Sprite
    const sunHaloCanvas = document.createElement('canvas');
    sunHaloCanvas.width = 256;
    sunHaloCanvas.height = 256;
    const sCtx = sunHaloCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 15, 128, 128, 128);
      sGrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
      sGrad.addColorStop(0.3, 'rgba(168, 85, 247, 0.5)');
      sGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.15)');
      sGrad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const sunHaloTexture = new THREE.CanvasTexture(sunHaloCanvas);
    const sunHaloMat = new THREE.SpriteMaterial({
      map: sunHaloTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    const sunHaloSprite = new THREE.Sprite(sunHaloMat);
    sunHaloSprite.scale.set(22, 22, 1);
    coreGroup.add(sunHaloSprite);

    // Dual Concentric Counter-Rotating Wireframe Shields
    const wireGeo1 = new THREE.IcosahedronGeometry(4.8, 2);
    const wireMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh1 = new THREE.Mesh(wireGeo1, wireMat1);
    coreGroup.add(wireMesh1);

    const wireGeo2 = new THREE.IcosahedronGeometry(6.0, 1);
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh2 = new THREE.Mesh(wireGeo2, wireMat2);
    coreGroup.add(wireMesh2);

    // Stellar Accretion Particle Disk (Sparks & Flares)
    const accretionParticleCount = 450;
    const accretionGeo = new THREE.BufferGeometry();
    const accretionPos = new Float32Array(accretionParticleCount * 3);
    const accretionAngles: number[] = [];
    const accretionRadii: number[] = [];
    const accretionSpeeds: number[] = [];

    for (let i = 0; i < accretionParticleCount; i++) {
      const radius = THREE.MathUtils.randFloat(5.2, 9.5);
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.6;

      accretionPos[i * 3] = Math.cos(angle) * radius;
      accretionPos[i * 3 + 1] = y;
      accretionPos[i * 3 + 2] = Math.sin(angle) * radius;

      accretionAngles.push(angle);
      accretionRadii.push(radius);
      accretionSpeeds.push(THREE.MathUtils.randFloat(0.4, 1.2));
    }

    accretionGeo.setAttribute('position', new THREE.BufferAttribute(accretionPos, 3));
    const accretionMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 1.4,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const accretionField = new THREE.Points(accretionGeo, accretionMat);
    coreGroup.add(accretionField);

    // 5. Procedural Starfield (3,200 Stars with Deep Color Palette)
    const starCount = 3200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starColorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xfde047),
      new THREE.Color(0x34d399),
      new THREE.Color(0xec4899),
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(140, 950);
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
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Toroidal 3D Asteroid Belt (Between Inner and Outer Stations)
    const asteroidCount = 320;
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);

    const asteroidGeo = new THREE.DodecahedronGeometry(0.5, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.9,
      metalness: 0.1,
    });

    const asteroidData: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; rotSpeed: THREE.Vector3 }[] = [];
    for (let i = 0; i < asteroidCount; i++) {
      const radius = THREE.MathUtils.randFloat(37, 41);
      const angle = (i / asteroidCount) * Math.PI * 2 + Math.random() * 0.1;
      const y = (Math.random() - 0.5) * 3.5;
      const scale = THREE.MathUtils.randFloat(0.4, 1.2);

      const asteroidMesh = new THREE.Mesh(asteroidGeo, asteroidMat);
      asteroidMesh.scale.set(scale, scale, scale);
      asteroidMesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      asteroidGroup.add(asteroidMesh);

      asteroidData.push({
        mesh: asteroidMesh,
        angle,
        radius,
        speed: THREE.MathUtils.randFloat(0.04, 0.08),
        rotSpeed: new THREE.Vector3(
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        ),
      });
    }

    // 7. Autonomous Cosmic Exploration Drone (Patrolling Probe)
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Drone Body (Futuristic Geometric Cruiser)
    const droneBodyGeo = new THREE.ConeGeometry(0.8, 2.2, 4);
    const droneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x083344,
    });
    const droneBody = new THREE.Mesh(droneBodyGeo, droneBodyMat);
    droneBody.rotation.x = Math.PI / 2;
    droneGroup.add(droneBody);

    // Drone Engine Thruster Light Plume
    const thrusterGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const thrusterMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
    });
    const thruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    thruster.position.z = -1.2;
    droneGroup.add(thruster);

    let droneAngle = 0;
    const droneRadius = 25;

    // 8. Helper function to generate rich procedural planet textures
    const createPlanetTexture = (baseColorHex: string, type: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Base background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, baseColorHex);
      grad.addColorStop(0.5, '#0a0d1e');
      grad.addColorStop(1, baseColorHex);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Procedural surface detail bands
      for (let i = 0; i < 256; i += 6) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.sin(i * 0.12) * 0.2 + 0.15})`;
        ctx.fillRect(0, i, 512, 3);
      }

      if (type.includes('gas') || type.includes('plasma')) {
        for (let j = 0; j < 8; j++) {
          const y = Math.random() * 256;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.fillRect(0, y, 512, Math.random() * 18 + 4);
        }
      }

      if (type.includes('tech') || type.includes('binary')) {
        // Grid pattern
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 512; x += 32) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 256);
          ctx.stroke();
        }
      }

      return new THREE.CanvasTexture(canvas);
    };

    // 9. Spawn Planetary Stations & Orbital Lines & Energy Conduits
    const planetObjects: {
      mesh: THREE.Mesh;
      group: THREE.Group;
      data: typeof celestialStations[0];
      currentAngle: number;
      conduitLine: THREE.Line;
      conduitGeo: THREE.BufferGeometry;
    }[] = [];

    celestialStations.forEach((station, idx) => {
      // Orbit guide ring
      const orbitGeo = new THREE.RingGeometry(station.distance - 0.09, station.distance + 0.09, 128);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(station.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.14,
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

      // Energy Conduit Line connecting planet to Central Nexus
      const conduitPoints = [new THREE.Vector3(0, 0, 0), planetGroup.position.clone()];
      const conduitGeo = new THREE.BufferGeometry().setFromPoints(conduitPoints);
      const conduitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(station.color),
        transparent: true,
        opacity: 0.25,
      });
      const conduitLine = new THREE.Line(conduitGeo, conduitMat);
      scene.add(conduitLine);

      // Sphere mesh
      const texture = createPlanetTexture(station.color, station.textureType);
      const planetGeo = new THREE.SphereGeometry(station.radius, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        map: texture || undefined,
        color: new THREE.Color(station.color),
        roughness: 0.45,
        metalness: 0.25,
        emissive: new THREE.Color(station.emissive),
        emissiveIntensity: 0.5,
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.userData = { stationId: station.id, name: station.name, label: station.label };
      planetGroup.add(planetMesh);
      planetMeshesRef.current[station.id] = planetMesh;

      // Planet rings if applicable
      if (station.hasRings && station.ringColor) {
        const ringGeo = new THREE.RingGeometry(station.radius * 1.45, station.radius * 2.4, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(station.ringColor),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55,
          emissive: new THREE.Color(station.ringColor),
          emissiveIntensity: 0.35,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = 0.25;
        planetGroup.add(ringMesh);
      }

      // Atmospheric Glowing Halo Sprite
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
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(station.radius * 3.8, station.radius * 3.8, 1);
      planetGroup.add(haloSprite);

      // Holographic Billboard Label
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 280;
      textCanvas.height = 70;
      const tCtx = textCanvas.getContext('2d');
      if (tCtx) {
        tCtx.fillStyle = 'rgba(7, 10, 24, 0.85)';
        if (tCtx.roundRect) {
          tCtx.roundRect(8, 8, 264, 54, 12);
        } else {
          tCtx.fillRect(8, 8, 264, 54);
        }
        tCtx.fill();
        tCtx.strokeStyle = station.color;
        tCtx.lineWidth = 2;
        tCtx.stroke();
        tCtx.fillStyle = '#ffffff';
        tCtx.font = 'bold 22px sans-serif';
        tCtx.textAlign = 'center';
        tCtx.textBaseline = 'middle';
        tCtx.fillText(station.label, 140, 35);
      }
      const textTexture = new THREE.CanvasTexture(textCanvas);
      const textMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true });
      const textSprite = new THREE.Sprite(textMat);
      textSprite.position.y = station.radius + 2.0;
      textSprite.scale.set(5.8, 1.45, 1);
      planetGroup.add(textSprite);

      planetObjects.push({
        mesh: planetMesh,
        group: planetGroup,
        data: station,
        currentAngle: initialAngle,
        conduitLine,
        conduitGeo,
      });
    });

    // 10. Interactive Controls & Raycasting
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let sphericalAngles = { theta: 0, phi: Math.PI / 4, radius: 105 };

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

        // Cancel lock-on when user manually begins orbiting
        cameraTargetRef.current.isFocusingPlanet = false;
        cameraTargetRef.current.targetFov = 55;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
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
      sphericalAngles.radius = Math.max(25, Math.min(240, sphericalAngles.radius + e.deltaY * 0.08));
      cameraTargetRef.current.isFocusingPlanet = false;
      cameraTargetRef.current.targetFov = 55;
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
          soundManager.playTargetLock();
          // FOV Warp Zoom Effect
          cameraTargetRef.current.targetFov = 44;
          onPlanetSelectRef.current(stationId);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel);
    domEl.addEventListener('click', onClick);

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 11. Main Dynamic Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Central Nexus core rotational spin & pulse
      wireMesh1.rotation.y += 0.009;
      wireMesh2.rotation.y -= 0.006;
      wireMesh2.rotation.x += 0.004;
      coreMesh.rotation.y += 0.005;

      const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.05;
      sunHaloSprite.scale.set(22 * pulseScale, 22 * pulseScale, 1);

      // Swirl accretion particle disk
      const posAttr = accretionGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < accretionParticleCount; i++) {
        accretionAngles[i] += accretionSpeeds[i] * delta * 0.8;
        const r = accretionRadii[i];
        posAttr.setXYZ(i, Math.cos(accretionAngles[i]) * r, posAttr.getY(i), Math.sin(accretionAngles[i]) * r);
      }
      posAttr.needsUpdate = true;

      // Rotate Asteroid Belt
      asteroidGroup.rotation.y += delta * 0.03;
      asteroidData.forEach((ast) => {
        ast.mesh.rotation.x += ast.rotSpeed.x;
        ast.mesh.rotation.y += ast.rotSpeed.y;
      });

      // Patrol Cosmic Drone
      droneAngle += delta * 0.18;
      const droneX = Math.cos(droneAngle) * droneRadius;
      const droneZ = Math.sin(droneAngle) * droneRadius;
      droneGroup.position.set(droneX, Math.sin(droneAngle * 2) * 2.5, droneZ);
      droneGroup.rotation.y = -droneAngle + Math.PI / 2;

      // Orbit and rotate planets & update energy conduits
      planetObjects.forEach((item) => {
        item.currentAngle += item.data.speed * delta * 0.12;
        const px = Math.cos(item.currentAngle) * item.data.distance;
        const pz = Math.sin(item.currentAngle) * item.data.distance;
        item.group.position.set(px, 0, pz);
        item.mesh.rotation.y += 0.016;

        // Update energy conduit line geometry
        const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(px, 0, pz)];
        item.conduitGeo.setFromPoints(linePoints);

        // Hover scale animation
        if (hoveredMesh === item.mesh) {
          item.mesh.scale.lerp(new THREE.Vector3(1.22, 1.22, 1.22), 0.12);
        } else {
          item.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.12);
        }
      });

      // Slowly drift starfield
      starField.rotation.y = elapsedTime * 0.004;

      // Camera position interpolation & FOV easing
      camera.fov = THREE.MathUtils.lerp(camera.fov, cameraTargetRef.current.targetFov, 0.04);
      camera.updateProjectionMatrix();

      if (cameraTargetRef.current.isFocusingPlanet && cameraTargetRef.current.focusStationId) {
        const focusedObj = planetObjects.find(
          (p) => p.data.id === cameraTargetRef.current.focusStationId
        );
        if (focusedObj) {
          const pPos = focusedObj.group.position;
          // Smooth orbital offset around focused planet
          cameraTargetRef.current.pos.set(
            pPos.x + focusedObj.data.radius * 2.9,
            pPos.y + focusedObj.data.radius * 1.6,
            pPos.z + focusedObj.data.radius * 3.6
          );
          cameraTargetRef.current.lookAt.copy(pPos);
        }
      } else {
        const targetX =
          sphericalAngles.radius * Math.sin(sphericalAngles.phi) * Math.sin(sphericalAngles.theta);
        const targetY = sphericalAngles.radius * Math.cos(sphericalAngles.phi);
        const targetZ =
          sphericalAngles.radius * Math.sin(sphericalAngles.phi) * Math.cos(sphericalAngles.theta);

        cameraTargetRef.current.pos.set(targetX, targetY, targetZ);
        cameraTargetRef.current.lookAt.set(0, 0, 0);
      }

      // Smooth camera lerp
      camera.position.lerp(cameraTargetRef.current.pos, 0.055);
      currentLookAt.lerp(cameraTargetRef.current.lookAt, 0.055);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
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
      accretionGeo.dispose();
      accretionMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Programmatic planet selection (from HUD or Dock)
  useEffect(() => {
    if (targetPlanetId) {
      cameraTargetRef.current.isFocusingPlanet = true;
      cameraTargetRef.current.focusStationId = targetPlanetId;
      cameraTargetRef.current.targetFov = 44;
    }
  }, [targetPlanetId]);

  // Reset Camera Trigger
  useEffect(() => {
    if (resetTrigger > 0) {
      cameraTargetRef.current.isFocusingPlanet = false;
      cameraTargetRef.current.focusStationId = null;
      cameraTargetRef.current.targetFov = 55;
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
