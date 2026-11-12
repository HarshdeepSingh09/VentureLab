import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePin, setActivePin] = useState<string | null>('hq');
  const [webGLSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!webGLSupported) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // --- 1. Scene, Camera, High-Fidelity Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(7.5, 6.2, 8.5);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    // --- 2. Architectural Studio Lighting ---
    // Warm natural key sunlight from top-right
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.8);
    keyLight.position.set(9, 13, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Subtle sky-blue ambient bounce
    const skyAmbient = new THREE.AmbientLight(0x1e283d, 2.0);
    scene.add(skyAmbient);

    // Soft cool rim light for edge definition on dark architectural surfaces
    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.4);
    rimLight.position.set(-8, 5, -6);
    scene.add(rimLight);

    // Ground bounce fill
    const groundBounce = new THREE.DirectionalLight(0x0f172a, 1.2);
    groundBounce.position.set(0, -6, 0);
    scene.add(groundBounce);

    // --- 3. Diorama Master Group ---
    const dioramaGroup = new THREE.Group();
    scene.add(dioramaGroup);

    // --- 4. Materials Library (Tactile, Realistic Architectural Finishes) ---
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x0c101c,
      roughness: 0.4,
      metalness: 0.6,
    });

    const bevelMat = new THREE.MeshStandardMaterial({
      color: 0x1e2738,
      roughness: 0.25,
      metalness: 0.8,
    });

    const courtyardMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.85,
      metalness: 0.1,
    });

    const pathwayMat = new THREE.MeshStandardMaterial({
      color: 0x1a2234,
      roughness: 0.6,
      metalness: 0.2,
    });

    const concreteStructureMat = new THREE.MeshStandardMaterial({
      color: 0x222c40,
      roughness: 0.5,
      metalness: 0.3,
    });

    const titaniumFacadeMat = new THREE.MeshStandardMaterial({
      color: 0x161e2e,
      roughness: 0.3,
      metalness: 0.7,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.55,
    });

    const warmGlassMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const cyanGlassMat = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75,
    });

    const roofWoodDeckMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.7,
      metalness: 0.05,
    });

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x1b4332,
      roughness: 0.9,
      metalness: 0.0,
    });

    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3e2723,
      roughness: 0.8,
    });

    // --- 5. Architectural Plinth (The Tabletop Display Stand) ---
    // Primary plinth base (Chamfered octagonal / rounded disc)
    const plinthGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.35, 48);
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
    plinthMesh.position.y = -0.22;
    plinthMesh.receiveShadow = true;
    dioramaGroup.add(plinthMesh);

    // Plinth fine brushed metallic upper bezel ring
    const bezelGeo = new THREE.CylinderGeometry(4.22, 4.22, 0.05, 48);
    const bezelMesh = new THREE.Mesh(bezelGeo, bevelMat);
    bezelMesh.position.y = -0.02;
    dioramaGroup.add(bezelMesh);

    // Courtyard Ground Surface
    const courtyardGeo = new THREE.CylinderGeometry(4.15, 4.15, 0.04, 48);
    const courtyardMesh = new THREE.Mesh(courtyardGeo, courtyardMat);
    courtyardMesh.position.y = 0.01;
    courtyardMesh.receiveShadow = true;
    dioramaGroup.add(courtyardMesh);

    // Architectural Ground Grid / Paver Insets (Subtle 2m grid lines)
    const paverLineMat = new THREE.LineBasicMaterial({
      color: 0x223049,
      transparent: true,
      opacity: 0.45,
    });
    for (let i = -3.5; i <= 3.5; i += 0.8) {
      const ptsX = [new THREE.Vector3(i, 0.02, -3.5), new THREE.Vector3(i, 0.02, 3.5)];
      const lineGeoX = new THREE.BufferGeometry().setFromPoints(ptsX);
      dioramaGroup.add(new THREE.Line(lineGeoX, paverLineMat));

      const ptsZ = [new THREE.Vector3(-3.5, 0.02, i), new THREE.Vector3(3.5, 0.02, i)];
      const lineGeoZ = new THREE.BufferGeometry().setFromPoints(ptsZ);
      dioramaGroup.add(new THREE.Line(lineGeoZ, paverLineMat));
    }

    // Granite Central Promenade Walkways
    const mainPromenade = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 4.8), pathwayMat);
    mainPromenade.position.set(0, 0.02, 0.3);
    mainPromenade.receiveShadow = true;
    dioramaGroup.add(mainPromenade);

    const crossPromenade = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.02, 0.7), pathwayMat);
    crossPromenade.position.set(0, 0.02, 0.3);
    crossPromenade.receiveShadow = true;
    dioramaGroup.add(crossPromenade);

    // --- 6. BUILDING A: VENTURELAB HEADQUARTERS (Central Modern Glass Pavilion) ---
    const hqGroup = new THREE.Group();
    hqGroup.position.set(0, 0, -0.1);
    dioramaGroup.add(hqGroup);

    // Ground Floor Podium
    const hqBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.4), concreteStructureMat);
    hqBase.position.y = 0.07;
    hqBase.castShadow = true;
    hqBase.receiveShadow = true;
    hqGroup.add(hqBase);

    // Ground Floor Glass Enclosure
    const hqGlassL1 = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.65, 1.25), glassMat);
    hqGlassL1.position.y = 0.45;
    hqGroup.add(hqGlassL1);

    // Interior Warm Founder Desk & Lighting Core
    const hqCore = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.5), warmGlassMat);
    hqCore.position.set(0, 0.42, 0);
    hqGroup.add(hqCore);

    const hqInternalLight = new THREE.PointLight(0xfef08a, 1.8, 2.5);
    hqInternalLight.position.set(0, 0.5, 0);
    hqGroup.add(hqInternalLight);

    // Cantilevered Mezzanine Floor Slab
    const hqSlab = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.1, 1.55), titaniumFacadeMat);
    hqSlab.position.y = 0.82;
    hqSlab.castShadow = true;
    hqSlab.receiveShadow = true;
    hqGroup.add(hqSlab);

    // Upper Floor Glass Boardroom
    const hqGlassL2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 1.3), glassMat);
    hqGlassL2.position.y = 1.2;
    hqGroup.add(hqGlassL2);

    // Upper Floor Structural Mullions (Fine vertical metal ribs)
    for (let mx = -0.7; mx <= 0.7; mx += 0.35) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.03), titaniumFacadeMat);
      mullion.position.set(mx, 1.2, 0.66);
      mullion.castShadow = true;
      hqGroup.add(mullion);

      const mullionBack = mullion.clone();
      mullionBack.position.z = -0.66;
      hqGroup.add(mullionBack);
    }

    // Cantilevered Roof Slab with Inset Timber Terrace
    const hqRoof = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.1, 1.65), titaniumFacadeMat);
    hqRoof.position.y = 1.58;
    hqRoof.castShadow = true;
    hqRoof.receiveShadow = true;
    hqGroup.add(hqRoof);

    const hqWoodDeck = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 1.2), roofWoodDeckMat);
    hqWoodDeck.position.y = 1.64;
    hqGroup.add(hqWoodDeck);

    // Rooftop Solar Pergola Array
    const pergolaBeam = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.04), titaniumFacadeMat);
    pergolaBeam.position.set(0, 1.9, 0.2);
    hqGroup.add(pergolaBeam);

    const solarPanelMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.2,
      metalness: 0.9,
    });
    for (let pz = -0.3; pz <= 0.3; pz += 0.25) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.2), solarPanelMat);
      panel.position.set(0, 1.92, pz);
      panel.rotation.x = 0.15;
      panel.castShadow = true;
      hqGroup.add(panel);
    }

    // --- 7. BUILDING B: PRODUCT & R&D LAB (East Tech Workshop) ---
    const prodGroup = new THREE.Group();
    prodGroup.position.set(2.1, 0, 0.2);
    dioramaGroup.add(prodGroup);

    const prodBase = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 1.2), concreteStructureMat);
    prodBase.position.y = 0.06;
    prodBase.receiveShadow = true;
    prodGroup.add(prodBase);

    // Angular modern studio body
    const prodBody = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.75, 1.05), titaniumFacadeMat);
    prodBody.position.y = 0.48;
    prodBody.castShadow = true;
    prodGroup.add(prodBody);

    // Large horizontal panoramic prototype viewing window
    const prodWindow = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.4, 0.75), cyanGlassMat);
    prodWindow.position.set(0, 0.5, 0.18);
    prodGroup.add(prodWindow);

    // R&D Lab Interior Cyan Lighting Glow
    const prodLight = new THREE.PointLight(0x38bdf8, 1.5, 2.0);
    prodLight.position.set(0, 0.55, 0.2);
    prodGroup.add(prodLight);

    // Prototype Rooftop Antennas & Precision Sensors
    const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.45, 12), titaniumFacadeMat);
    antennaStem.position.set(0.35, 1.08, -0.2);
    prodGroup.add(antennaStem);

    const antennaDish = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), titaniumFacadeMat);
    antennaDish.position.set(0.35, 1.3, -0.2);
    antennaDish.rotation.x = 0.4;
    prodGroup.add(antennaDish);

    // --- 8. BUILDING C: CUSTOMER DISCOVERY & INSIGHTS PAVILION (West Wing) ---
    const discGroup = new THREE.Group();
    discGroup.position.set(-2.0, 0, 0.3);
    dioramaGroup.add(discGroup);

    // Curved circular pavilion
    const discBase = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.9, 0.1, 32), concreteStructureMat);
    discBase.position.y = 0.06;
    discBase.receiveShadow = true;
    discGroup.add(discBase);

    const discWall = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.7, 32, 1, true, 0, Math.PI * 1.5), titaniumFacadeMat);
    discWall.position.y = 0.46;
    discWall.castShadow = true;
    discGroup.add(discWall);

    const discGlassInner = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.65, 32), glassMat);
    discGlassInner.position.y = 0.45;
    discGroup.add(discGlassInner);

    const discRoof = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 32), titaniumFacadeMat);
    discRoof.position.y = 0.85;
    discRoof.castShadow = true;
    discGroup.add(discRoof);

    // Warm discussion pod light
    const discLight = new THREE.PointLight(0xf59e0b, 1.4, 2.0);
    discLight.position.set(-0.1, 0.5, 0);
    discGroup.add(discLight);

    // --- 9. BUILDING D: THE INVESTOR PITCH ARENA (South Curved Amphitheater) ---
    const arenaGroup = new THREE.Group();
    arenaGroup.position.set(0.1, 0, 2.2);
    dioramaGroup.add(arenaGroup);

    // Tiered presentation plinth
    const arenaStage = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 0.12, 32, 1, false, 0, Math.PI), concreteStructureMat);
    arenaStage.rotation.y = Math.PI;
    arenaStage.position.y = 0.07;
    arenaStage.receiveShadow = true;
    arenaGroup.add(arenaStage);

    // Curved LED backdrop wall
    const ledScreenGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.55, 32, 1, true, 0.2, Math.PI - 0.4);
    const ledScreenMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x4338ca,
      emissiveIntensity: 0.9,
      side: THREE.BackSide,
      roughness: 0.3,
    });
    const ledScreen = new THREE.Mesh(ledScreenGeo, ledScreenMat);
    ledScreen.rotation.y = Math.PI;
    ledScreen.position.y = 0.38;
    arenaGroup.add(ledScreen);

    // Speaker Podium
    const podium = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.08), titaniumFacadeMat);
    podium.position.set(0, 0.18, -0.2);
    podium.castShadow = true;
    arenaGroup.add(podium);

    const podiumLight = new THREE.PointLight(0x818cf8, 1.2, 1.5);
    podiumLight.position.set(0, 0.35, -0.2);
    arenaGroup.add(podiumLight);

    // --- 10. BUILDING E: FINANCE & OPERATIONS TOWER (North Sleek Monolith) ---
    const financeGroup = new THREE.Group();
    financeGroup.position.set(-0.8, 0, -2.1);
    dioramaGroup.add(financeGroup);

    const finBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.1, 0.85), concreteStructureMat);
    finBase.position.y = 0.06;
    financeGroup.add(finBase);

    // Tall vertical tower with vertical shading louvers
    const finTower = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.55, 0.7), titaniumFacadeMat);
    finTower.position.y = 0.88;
    finTower.castShadow = true;
    financeGroup.add(finTower);

    // Floor-to-ceiling glass vertical slit
    const finGlass = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.4, 0.72), warmGlassMat);
    finGlass.position.set(0.15, 0.88, 0);
    financeGroup.add(finGlass);

    // Vertical fin louvers
    for (let lz = -0.3; lz <= 0.3; lz += 0.15) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.45, 0.02), titaniumFacadeMat);
      louver.position.set(0, 0.88, lz);
      financeGroup.add(louver);
    }

    // --- 11. BUILDING F: MARKETING & MEDIA PAVILION (North-East Studio) ---
    const mktGroup = new THREE.Group();
    mktGroup.position.set(1.4, 0, -1.9);
    dioramaGroup.add(mktGroup);

    const mktBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.9), concreteStructureMat);
    mktBody.position.y = 0.38;
    mktBody.castShadow = true;
    mktGroup.add(mktBody);

    const mktDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.92), cyanGlassMat);
    mktDisplay.position.set(0, 0.42, 0);
    mktGroup.add(mktDisplay);

    // --- 12. Minimalist Architectural Foliage & Planters ---
    const createArchTree = (x: number, z: number, scale = 1) => {
      const treeGrp = new THREE.Group();
      treeGrp.position.set(x, 0.02, z);

      // Low concrete circular planter ring
      const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.2 * scale, 0.08, 16), concreteStructureMat);
      planter.position.y = 0.04;
      treeGrp.add(planter);

      // Trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.025 * scale, 0.035 * scale, 0.35 * scale, 8), trunkMat);
      trunk.position.y = 0.2 * scale;
      trunk.castShadow = true;
      treeGrp.add(trunk);

      // Geometric architectural pine / boxwood cone
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.22 * scale, 0.65 * scale, 7), foliageMat);
      foliage.position.y = 0.6 * scale;
      foliage.castShadow = true;
      treeGrp.add(foliage);

      dioramaGroup.add(treeGrp);
    };

    // Plant trees thoughtfully around pathways (like a real architectural scale model)
    createArchTree(-1.1, 1.4, 0.9);
    createArchTree(-1.4, 1.6, 0.8);
    createArchTree(1.2, 1.5, 0.95);
    createArchTree(1.5, 1.3, 0.8);
    createArchTree(-2.8, -0.6, 1.0);
    createArchTree(2.8, -0.4, 1.0);
    createArchTree(0.2, -2.8, 0.85);

    // Pathway Bollard Micro-Lights (Warm pathway beacons)
    const bollardGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8);
    const bollardMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
    const bollardPositions = [
      [-0.45, 0.6], [0.45, 0.6],
      [-0.45, 1.4], [0.45, 1.4],
      [-1.2, 0.2], [1.2, 0.2]
    ];
    bollardPositions.forEach(([bx, bz]) => {
      const bollard = new THREE.Mesh(bollardGeo, bollardMat);
      bollard.position.set(bx, 0.08, bz);
      dioramaGroup.add(bollard);

      const bCap = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), warmGlassMat);
      bCap.position.set(bx, 0.16, bz);
      dioramaGroup.add(bCap);
    });

    // --- 13. Smooth Interactive Cursor Tracking & Animation Loop ---
    let animationFrameId: number;

    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.35;
      targetRotX = ny * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;

      // Gentle continuous ambient drift + mouse responsiveness
      const idleSpin = Math.sin(elapsed * 0.2) * 0.08;
      dioramaGroup.rotation.y += (targetRotY + idleSpin - dioramaGroup.rotation.y) * 0.04;
      dioramaGroup.rotation.x += (targetRotX - dioramaGroup.rotation.x) * 0.04;

      // Subtle breathing on interior office lights
      hqInternalLight.intensity = 1.6 + Math.sin(elapsed * 1.5) * 0.25;
      prodLight.intensity = 1.4 + Math.cos(elapsed * 1.8) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [webGLSupported]);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden select-none bg-gradient-to-b from-[#0B0F19] to-[#070913] border border-white/[0.08] shadow-2xl">
      {/* Diorama 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* High-Craft Architectural Callout HUD (Apple-style interactive pins) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-slate-200 uppercase font-semibold">
            Venture Campus Model &bull; Scale 1:200
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 pointer-events-auto">
          {[
            { id: 'hq', label: 'HQ Atrium' },
            { id: 'rnd', label: 'R&D Lab' },
            { id: 'insights', label: 'Insights' },
            { id: 'arena', label: 'Pitch Arena' },
          ].map((pin) => (
            <button
              key={pin.id}
              onClick={() => setActivePin(pin.id)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                activePin === pin.id
                  ? 'bg-blue-600/90 text-white font-bold border border-blue-400/40 shadow-sm'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {pin.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Info Pill (Realistic Architectural Annotation) */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-950/85 border border-white/10 backdrop-blur-md text-left text-xs pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <p className="text-slate-300 text-[11px] font-medium leading-snug">
            {activePin === 'hq' && 'Founder Cockpit: Set mission parameters, assemble team roles, track capital allocation.'}
            {activePin === 'rnd' && 'Product Engineering: Allocate 100 dev points across MVP features and stress-test specs.'}
            {activePin === 'insights' && 'User Empathy Suite: Synthesize interviews from campus hostel students and teachers.'}
            {activePin === 'arena' && 'Investor Presentation Stage: Defend 6-part slide deck and unit margins before panel.'}
          </p>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest shrink-0">
          Drag to Orbit &bull; Hover to Inspect
        </span>
      </div>
    </div>
  );
};
