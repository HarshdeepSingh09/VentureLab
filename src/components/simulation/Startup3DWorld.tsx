import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Building2, Compass, FlaskConical, Wallet, 
  Megaphone, Users, Gauge, Swords, Presentation, 
  CheckCircle2, Maximize2, Minimize2, Monitor, Eye, AlertTriangle, BookOpen 
} from 'lucide-react';
import type { 
  SimulationState, 
  SimulationLocationId 
} from '../../simulation/types';

import { LocationStartupStudio } from './locations/LocationStartupStudio';
import { LocationCustomerDiscovery } from './locations/LocationCustomerDiscovery';
import { LocationProductDev } from './locations/LocationProductDev';
import { LocationFinanceCenter } from './locations/LocationFinanceCenter';
import { LocationMarketingStudio } from './locations/LocationMarketingStudio';
import { LocationOperationsCenter } from './locations/LocationOperationsCenter';
import { LocationCustomerInsights } from './locations/LocationCustomerInsights';
import { LocationBusinessChallenge } from './locations/LocationBusinessChallenge';
import { LocationCompetitionHub } from './locations/LocationCompetitionHub';
import { LocationInvestorArena } from './locations/LocationInvestorArena';
import { LocationReflectionReview } from './locations/LocationReflectionReview';

interface Startup3DWorldProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onOpenTeam: () => void;
  onOpenAchievements: () => void;
  onOpenReport: () => void;
  onReset: () => void;
  onSwitchToDashboard: () => void;
  onOpenAssumptions?: () => void;
}

interface Location3DConfig {
  id: SimulationLocationId;
  name: string;
  shortLabel: string;
  icon: React.ElementType;
  position: THREE.Vector3;
  cameraPos: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  color: number;
}

const LOCATIONS_CONFIG: Location3DConfig[] = [
  {
    id: 'startup_studio',
    name: '1. Startup Studio',
    shortLabel: 'Studio HQ',
    icon: Building2,
    position: new THREE.Vector3(0, 0.9, 0.4),
    cameraPos: new THREE.Vector3(0, 1.8, 1.6),
    cameraTarget: new THREE.Vector3(0, 0.9, 0.2),
    color: 0x3b82f6,
  },
  {
    id: 'customer_discovery',
    name: '2. Customer Discovery Lab',
    shortLabel: 'Discovery',
    icon: Compass,
    position: new THREE.Vector3(-2.2, 0.9, 0.8),
    cameraPos: new THREE.Vector3(-2.2, 1.8, 2.1),
    cameraTarget: new THREE.Vector3(-2.2, 0.9, 0.8),
    color: 0x06b6d4,
  },
  {
    id: 'product_dev',
    name: '3. Product Development Lab',
    shortLabel: 'Product R&D',
    icon: FlaskConical,
    position: new THREE.Vector3(-2.4, 1.0, -1.3),
    cameraPos: new THREE.Vector3(-2.4, 1.9, 0.2),
    cameraTarget: new THREE.Vector3(-2.4, 1.0, -1.3),
    color: 0xf59e0b,
  },
  {
    id: 'finance_center',
    name: '4. Finance Center',
    shortLabel: 'Finance',
    icon: Wallet,
    position: new THREE.Vector3(0, 1.5, -2.0),
    cameraPos: new THREE.Vector3(0, 2.2, -0.3),
    cameraTarget: new THREE.Vector3(0, 1.5, -2.0),
    color: 0x10b981,
  },
  {
    id: 'marketing_studio',
    name: '5. Marketing Studio',
    shortLabel: 'Marketing',
    icon: Megaphone,
    position: new THREE.Vector3(2.3, 1.1, -1.2),
    cameraPos: new THREE.Vector3(2.3, 2.0, 0.3),
    cameraTarget: new THREE.Vector3(2.3, 1.1, -1.2),
    color: 0xa855f7,
  },
  {
    id: 'customer_insights',
    name: '6. Customer Insights Lab',
    shortLabel: 'Insights',
    icon: Users,
    position: new THREE.Vector3(-1.3, 0.8, 2.1),
    cameraPos: new THREE.Vector3(-1.3, 1.7, 3.2),
    cameraTarget: new THREE.Vector3(-1.3, 0.8, 2.1),
    color: 0x6366f1,
  },
  {
    id: 'business_challenge',
    name: '7. Crisis Room',
    shortLabel: 'Crisis Room',
    icon: AlertTriangle,
    position: new THREE.Vector3(0, 1.0, 2.5),
    cameraPos: new THREE.Vector3(0, 1.9, 3.8),
    cameraTarget: new THREE.Vector3(0, 1.0, 2.5),
    color: 0xf43f5e,
  },
  {
    id: 'operations_center',
    name: '8. Operations Center',
    shortLabel: 'Operations',
    icon: Gauge,
    position: new THREE.Vector3(2.4, 0.9, 0.9),
    cameraPos: new THREE.Vector3(2.4, 1.9, 2.2),
    cameraTarget: new THREE.Vector3(2.4, 0.9, 0.9),
    color: 0xef4444,
  },
  {
    id: 'competition_hub',
    name: '9. Competition Hub',
    shortLabel: 'Competition',
    icon: Swords,
    position: new THREE.Vector3(1.3, 1.0, 2.2),
    cameraPos: new THREE.Vector3(1.3, 1.8, 3.3),
    cameraTarget: new THREE.Vector3(1.3, 1.0, 2.2),
    color: 0xf43f5e,
  },
  {
    id: 'investor_arena',
    name: '10. Investor Arena',
    shortLabel: 'Pitch Arena',
    icon: Presentation,
    position: new THREE.Vector3(0, 2.0, -4.2),
    cameraPos: new THREE.Vector3(0, 2.8, -2.0),
    cameraTarget: new THREE.Vector3(0, 2.0, -4.2),
    color: 0x14b8a6,
  },
  {
    id: 'reflection_review',
    name: '11. Reflection & Capstone',
    shortLabel: '11. Reflection',
    icon: BookOpen,
    position: new THREE.Vector3(0, 0.9, 0.0),
    cameraPos: new THREE.Vector3(0, 2.2, 2.0),
    cameraTarget: new THREE.Vector3(0, 0.9, 0.0),
    color: 0x8b5cf6,
  },
];

const OVERVIEW_CAMERA_POS = new THREE.Vector3(6.5, 6.0, 7.5);
const OVERVIEW_CAMERA_TARGET = new THREE.Vector3(0, 0.8, 0);

export const Startup3DWorld: React.FC<Startup3DWorldProps> = ({
  state,
  setState,
  onOpenTeam,
  onOpenAchievements,
  onOpenReport,
  onReset,
  onSwitchToDashboard,
  onOpenAssumptions,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeLocationId = state.currentLocation;
  const [isOverviewMode, setIsOverviewMode] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const activeConfig = LOCATIONS_CONFIG.find((l) => l.id === activeLocationId) || LOCATIONS_CONFIG[0];

  // Camera interpolation vectors
  const targetCamPos = useRef(activeConfig.cameraPos.clone());
  const targetCamLook = useRef(activeConfig.cameraTarget.clone());
  const currentCamLook = useRef(activeConfig.cameraTarget.clone());

  const navigateTo = (locId: SimulationLocationId) => {
    setIsOverviewMode(false);
    setState((prev) => ({
      ...prev,
      currentLocation: locId,
    }));

    const cfg = LOCATIONS_CONFIG.find((l) => l.id === locId);
    if (cfg) {
      targetCamPos.current.copy(cfg.cameraPos);
      targetCamLook.current.copy(cfg.cameraTarget);
    }
  };

  const setOverview = () => {
    setIsOverviewMode(true);
    targetCamPos.current.copy(OVERVIEW_CAMERA_POS);
    targetCamLook.current.copy(OVERVIEW_CAMERA_TARGET);
  };

  // Sync camera when state.currentLocation changes from external controls
  useEffect(() => {
    const cfg = LOCATIONS_CONFIG.find((l) => l.id === state.currentLocation);
    if (cfg) {
      targetCamPos.current.copy(cfg.cameraPos);
      targetCamLook.current.copy(cfg.cameraTarget);
    }
  }, [state.currentLocation]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a12);
    scene.fog = new THREE.FogExp2(0x070a12, 0.045);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.copy(targetCamPos.current);
    camera.lookAt(targetCamLook.current);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch (e) {
      console.warn('WebGL initialization failed in Startup3DWorld, switching to 2D Dashboard:', e);
      onSwitchToDashboard();
      return;
    }
    const quality = state.graphicsQuality || 'balanced';
    renderer.setSize(width, height);
    if (quality === 'high') {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
    } else if (quality === 'balanced') {
      renderer.setPixelRatio(1.0);
      renderer.shadowMap.enabled = false;
    } else {
      // low graphics mode for school computer protection
      renderer.setPixelRatio(0.75);
      renderer.shadowMap.enabled = false;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // WebGL Context loss handler for performance and crash protection
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost in Startup3DWorld. Smoothly falling back to 2D Dashboard.');
      onSwitchToDashboard();
    };
    container.addEventListener('webglcontextlost', handleContextLost, false);

    // Tab visibility handler to pause rendering loop when browser tab is inactive
    let isTabHidden = false;
    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Studio Architectural Lighting ---
    const ambient = new THREE.AmbientLight(0x1a2233, 2.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.9);
    dirLight.position.set(9, 15, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.camera.left = -9;
    dirLight.shadow.camera.right = 9;
    dirLight.shadow.camera.top = 9;
    dirLight.shadow.camera.bottom = -9;
    dirLight.shadow.bias = -0.0004;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.4);
    rimLight.position.set(-8, 7, -6);
    scene.add(rimLight);

    // --- Materials Library ---
    const stoneBaseMat = new THREE.MeshStandardMaterial({
      color: 0x0c111d,
      roughness: 0.5,
      metalness: 0.5,
    });

    const bevelMat = new THREE.MeshStandardMaterial({
      color: 0x1f293d,
      roughness: 0.3,
      metalness: 0.8,
    });

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x222d42,
      roughness: 0.6,
      metalness: 0.2,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x182030,
      roughness: 0.3,
      metalness: 0.7,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.6,
    });

    const warmGlassMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xd97706,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x16382a,
      roughness: 0.9,
    });

    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3d271d,
      roughness: 0.8,
    });

    // Master Campus Base Plinth
    const floorGeo = new THREE.CylinderGeometry(7.5, 7.8, 0.4, 48);
    const floor = new THREE.Mesh(floorGeo, stoneBaseMat);
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);

    const rimRing = new THREE.Mesh(new THREE.CylinderGeometry(7.52, 7.52, 0.06, 48), bevelMat);
    rimRing.position.y = 0.01;
    scene.add(rimRing);

    // Paver Lines
    const paverLineMat = new THREE.LineBasicMaterial({
      color: 0x212e45,
      transparent: true,
      opacity: 0.5,
    });
    for (let i = -6; i <= 6; i += 1.2) {
      const ptsX = [new THREE.Vector3(i, 0.02, -6), new THREE.Vector3(i, 0.02, 6)];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsX), paverLineMat));
      const ptsZ = [new THREE.Vector3(-6, 0.02, i), new THREE.Vector3(6, 0.02, i)];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsZ), paverLineMat));
    }

    // Granite Pathways Linking Departments
    const pathMat = new THREE.MeshStandardMaterial({ color: 0x171f2f, roughness: 0.7 });
    const spineWalk = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 8.5), pathMat);
    spineWalk.position.set(0, 0.02, -0.6);
    spineWalk.receiveShadow = true;
    scene.add(spineWalk);

    const crossWalk = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.02, 1.2), pathMat);
    crossWalk.position.set(0, 0.02, 0.4);
    crossWalk.receiveShadow = true;
    scene.add(crossWalk);

    // Location Hotspots and Bespoke Architectural Buildings
    const hotspotGroup = new THREE.Group();
    scene.add(hotspotGroup);

    LOCATIONS_CONFIG.forEach((loc) => {
      const locGroup = new THREE.Group();
      locGroup.position.copy(loc.position);
      locGroup.name = loc.id;

      // Base Pedestal for each department
      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.78, 0.12, 24), concreteMat);
      ped.position.y = -0.06;
      ped.receiveShadow = true;
      locGroup.add(ped);

      // Bespoke architectural structure per location
      if (loc.id === 'startup_studio') {
        // Modern glass atrium with cantilevered roof & founder desk
        const bldg = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.7), titaniumMat);
        bldg.position.y = 0.28;
        bldg.castShadow = true;
        locGroup.add(bldg);

        const glass = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.35, 0.65), warmGlassMat);
        glass.position.y = 0.3;
        locGroup.add(glass);

        const roof = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.06, 0.85), titaniumMat);
        roof.position.y = 0.61;
        roof.castShadow = true;
        locGroup.add(roof);
      } else if (loc.id === 'customer_discovery') {
        // Stepped circular amphitheater / research lounge
        const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.7, 0.15, 24), titaniumMat);
        tier1.position.y = 0.08;
        locGroup.add(tier1);

        const wall = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.45, 24, 1, true, 0, Math.PI * 1.4), concreteMat);
        wall.position.y = 0.35;
        wall.castShadow = true;
        locGroup.add(wall);

        const screen = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.02), glassMat);
        screen.position.set(0, 0.4, 0.1);
        locGroup.add(screen);
      } else if (loc.id === 'product_dev') {
        // High-tech workshop with precision antenna mast
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.7), titaniumMat);
        body.position.y = 0.25;
        body.castShadow = true;
        locGroup.add(body);

        const windowBay = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.25, 0.5), glassMat);
        windowBay.position.y = 0.28;
        locGroup.add(windowBay);

        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.4, 8), titaniumMat);
        mast.position.set(0.2, 0.72, 0.1);
        locGroup.add(mast);
      } else if (loc.id === 'finance_center') {
        // Sleek vault tower with vertical architectural louvers
        const tower = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.1, 0.6), titaniumMat);
        tower.position.y = 0.52;
        tower.castShadow = true;
        locGroup.add(tower);

        const slit = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.95, 0.62), warmGlassMat);
        slit.position.set(0.12, 0.52, 0);
        locGroup.add(slit);
      } else if (loc.id === 'marketing_studio') {
        // Curved media studio with studio spotlight
        const mBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.65), concreteMat);
        mBody.position.y = 0.22;
        mBody.castShadow = true;
        locGroup.add(mBody);

        const screen = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.25, 0.67), glassMat);
        screen.position.y = 0.26;
        locGroup.add(screen);
      } else if (loc.id === 'customer_insights') {
        // Empathy lounge with acoustic baffle structure
        const cBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.4, 24), concreteMat);
        cBody.position.y = 0.2;
        cBody.castShadow = true;
        locGroup.add(cBody);

        const pod = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.4), warmGlassMat);
        pod.position.y = 0.25;
        locGroup.add(pod);
      } else if (loc.id === 'operations_center') {
        // Logistics bay with distribution portico
        const hub = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.65), titaniumMat);
        hub.position.y = 0.2;
        hub.castShadow = true;
        locGroup.add(hub);

        const bayDoor = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.68), concreteMat);
        bayDoor.position.set(-0.15, 0.15, 0);
        locGroup.add(bayDoor);
      } else if (loc.id === 'business_challenge') {
        // Hexagonal crisis command pavilion with glowing amber core
        const warRoom = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.45, 6), titaniumMat);
        warRoom.position.y = 0.22;
        warRoom.castShadow = true;
        locGroup.add(warRoom);

        const beaconCore = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), warmGlassMat);
        beaconCore.position.y = 0.52;
        locGroup.add(beaconCore);
      } else if (loc.id === 'competition_hub') {
        // Market radar outpost with angled faceted canopy
        const comp = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.6, 6), titaniumMat);
        comp.position.y = 0.3;
        comp.castShadow = true;
        locGroup.add(comp);
      } else if (loc.id === 'investor_arena') {
        // Sunken presentation amphitheater with curved screen
        const stage = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.15, 24, 1, false, 0, Math.PI), concreteMat);
        stage.rotation.y = Math.PI;
        stage.position.y = 0.08;
        locGroup.add(stage);

        const ledCurved = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.45, 24, 1, true, 0.3, Math.PI - 0.6), warmGlassMat);
        ledCurved.rotation.y = Math.PI;
        ledCurved.position.y = 0.32;
        locGroup.add(ledCurved);
      }

      // Elegant Waypoint Indicator (Apple-style frosted pill beacon instead of raw spinning diamond)
      const pinPillGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.03, 16);
      const pinPillMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: loc.color,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const pinMesh = new THREE.Mesh(pinPillGeo, pinPillMat);
      pinMesh.position.y = 0.95;
      pinMesh.name = `${loc.id}_pin`;
      locGroup.add(pinMesh);

      const pinStem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.2, 8), titaniumMat);
      pinStem.position.y = 0.82;
      locGroup.add(pinStem);

      hotspotGroup.add(locGroup);
    });

    // Minimalist Trees
    const addTree = (x: number, z: number) => {
      const tGrp = new THREE.Group();
      tGrp.position.set(x, 0.02, z);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.3, 8), trunkMat);
      trunk.position.y = 0.15;
      trunk.castShadow = true;
      tGrp.add(trunk);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.6, 7), foliageMat);
      cone.position.y = 0.55;
      cone.castShadow = true;
      tGrp.add(cone);
      scene.add(tGrp);
    };

    addTree(-0.9, 1.2);
    addTree(0.9, 1.2);
    addTree(-1.8, -0.4);
    addTree(1.8, -0.4);
    addTree(-0.9, -2.8);
    addTree(0.9, -2.8);

    // Animation Loop with smooth camera interpolation
    let animationFrameId: number;
    let frameCount = 0;
    let lastFpsCheck = performance.now();
    let lowFpsCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause rendering loop when browser tab is hidden to save battery & CPU
      if (isTabHidden) return;

      const now = performance.now();
      frameCount++;
      if (now - lastFpsCheck >= 2000) {
        const currentFps = (frameCount * 1000) / (now - lastFpsCheck);
        frameCount = 0;
        lastFpsCheck = now;
        if (currentFps < 22 && quality !== 'low') {
          lowFpsCount++;
          if (lowFpsCount >= 2) {
            console.warn(`Sustained frame rate dip (${currentFps.toFixed(1)} FPS). Auto-switching to Low Graphics Mode for device protection.`);
            setState((prev) => ({ ...prev, graphicsQuality: 'low' }));
          }
        } else {
          lowFpsCount = 0;
        }
      }

      const elapsedTime = now * 0.001;

      // Smooth camera interpolation (or instant if user prefers reduced motion)
      if (prefersReducedMotion) {
        camera.position.copy(targetCamPos.current);
        currentCamLook.current.copy(targetCamLook.current);
        camera.lookAt(currentCamLook.current);
      } else {
        camera.position.lerp(targetCamPos.current, 0.05);
        currentCamLook.current.lerp(targetCamLook.current, 0.05);
        camera.lookAt(currentCamLook.current);
      }

      // Waypoint floating animation (disabled in low graphics or reduced motion mode)
      if (!prefersReducedMotion && quality !== 'low') {
        hotspotGroup.children.forEach((grp, idx) => {
          const pin = grp.getObjectByName(`${grp.name}_pin`);
          if (pin) {
            pin.position.y = 0.95 + Math.sin(elapsedTime * 2.0 + idx) * 0.04;
            pin.rotation.y = elapsedTime * 0.8 + idx;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('webglcontextlost', handleContextLost);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col relative w-full h-[calc(100vh-4.5rem)] overflow-hidden text-left bg-[#070a12]">
      {/* 3D WebGL Canvas Layer */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Controls Overlay */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={setOverview}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
              isOverviewMode
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-900/90 text-slate-300 border border-white/[0.08] hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Campus Overview</span>
          </button>

          <button
            onClick={onSwitchToDashboard}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 border border-white/[0.08] hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <Monitor className="w-3.5 h-3.5 text-blue-400" />
            <span>2D Dashboard Mode</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center bg-slate-900/90 border border-white/[0.08] rounded-xl p-0.5 text-[10px] font-mono shadow-md">
            <span className="px-2 text-slate-400">Quality:</span>
            {(['high', 'balanced', 'low'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setState((prev) => ({ ...prev, graphicsQuality: q }))}
                className={`px-2 py-0.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                  (state.graphicsQuality || 'balanced') === q
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-slate-200 bg-slate-900/90 border border-white/[0.08] px-3 py-1 rounded-full shadow-md">
            Active: <strong>{activeConfig.name}</strong>
          </span>
        </div>
      </div>

      {/* In-Focus Location Interaction Modal / Drawer Overlay */}
      {isOverviewMode ? (
        <div className="relative z-20 mx-4 sm:mx-8 mb-24 mt-auto flex justify-center pointer-events-none">
          <div className="pointer-events-auto p-4 sm:p-5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-white/[0.08] shadow-2xl flex flex-col sm:flex-row items-center gap-4 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-white font-bold flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Venture Campus 3D Overview</span>
              </div>
              <div className="text-slate-400">
                Viewing full startup ecosystem. Select any department in the dock below to zoom in.
              </div>
            </div>
            <button
              onClick={() => navigateTo(activeLocationId)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer shadow-md shadow-blue-950/40"
            >
              Enter {activeConfig.shortLabel}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-20 mx-4 sm:mx-8 mb-20 mt-auto transition-all duration-300 flex flex-col justify-end pointer-events-none">
          <div className={`pointer-events-auto rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl p-4 sm:p-6 overflow-y-auto transition-all ${
            isPanelExpanded ? 'max-h-[88vh]' : 'max-h-[62vh] sm:max-h-[68vh]'
          }`}>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <activeConfig.icon className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  {activeConfig.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSwitchToDashboard}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-white/[0.08] text-[11px] text-slate-300 hover:text-white cursor-pointer"
                  title="Switch to clean 2D Dashboard layout"
                >
                  <Monitor className="w-3 h-3 text-blue-400" />
                  <span>2D Mode</span>
                </button>

                <button
                  onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                  title={isPanelExpanded ? 'Minimize Panel' : 'Expand Panel'}
                >
                  {isPanelExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Active Location Component */}
            <div>
              {activeLocationId === 'startup_studio' && (
                <LocationStartupStudio
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenTeam={onOpenTeam}
                  onOpenAchievements={onOpenAchievements}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'customer_discovery' && (
                <LocationCustomerDiscovery
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'product_dev' && (
                <LocationProductDev
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'finance_center' && (
                <LocationFinanceCenter
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'marketing_studio' && (
                <LocationMarketingStudio
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'customer_insights' && (
                <LocationCustomerInsights
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'business_challenge' && (
                <LocationBusinessChallenge
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'operations_center' && (
                <LocationOperationsCenter
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'competition_hub' && (
                <LocationCompetitionHub
                  state={state}
                  setState={setState}
                  onNavigate={navigateTo}
                />
              )}
              {activeLocationId === 'investor_arena' && (
                <LocationInvestorArena
                  state={state}
                  setState={setState}
                  onOpenReport={onOpenReport}
                  onReset={onReset}
                  onNavigate={navigateTo}
                  onOpenAssumptions={onOpenAssumptions}
                />
              )}
              {activeLocationId === 'reflection_review' && (
                <LocationReflectionReview
                  state={state}
                  setState={setState}
                  onOpenReport={onOpenReport}
                  onNavigate={navigateTo}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom 9-Location Navigation Dock */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#070a12]/95 backdrop-blur-md border-t border-white/[0.08] p-2 sm:p-2.5 overflow-x-auto">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 min-w-max px-2">
          {LOCATIONS_CONFIG.map((loc) => {
            const Icon = loc.icon;
            const isSelected = activeLocationId === loc.id && !isOverviewMode;
            const isDone = state.completedLocations.includes(loc.id);

            return (
              <button
                key={loc.id}
                onClick={() => navigateTo(loc.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-950/40 translate-y-[-1px]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/[0.06] hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{loc.shortLabel}</span>
                {isDone && <CheckCircle2 className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
