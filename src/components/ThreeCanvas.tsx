import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1
  activeStage: number; // 0 to 4 (linked with scroll and timeline)
  renderMode: 'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram';
  focusedServiceId: string | null;
  focusedProjectId: string | null;
}

export default function ThreeCanvas({
  scrollProgress,
  activeStage,
  renderMode,
  focusedServiceId,
  focusedProjectId,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep live refs to avoid re-initializing the Three scene when props update.
  const propsRef = useRef({ scrollProgress, activeStage, renderMode, focusedServiceId, focusedProjectId });
  
  useEffect(() => {
    propsRef.current = { scrollProgress, activeStage, renderMode, focusedServiceId, focusedProjectId };
  }, [scrollProgress, activeStage, renderMode, focusedServiceId, focusedProjectId]);

  // Track FPS and active telemetry for display in our UI
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    drawCalls: 0,
    vertexCount: 0,
    activeElements: 0,
    windSpeed: '12.4 km/h',
    structuralLoad: '42%'
  });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    
    // Ambient fog to blend with our deep dark sunset background
    scene.fog = new THREE.FogExp2(0x030508, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(25, 18, 25);
    camera.lookAt(0, 8, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- CREATIVE LIGHTING (SUNSET STYLE & HOLOGRAM) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    // Warm Golden sunset directional light
    const sunLight = new THREE.DirectionalLight(0xff7a00, 1.8);
    sunLight.position.set(40, 20, -30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 150;
    const d = 30;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    scene.add(sunLight);

    // Dynamic blue fill light representing engineering telemetry lasers
    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    fillLight.position.set(-30, 10, 30);
    scene.add(fillLight);

    // Cinematic uplight spot at foundation base
    const baseSpot = new THREE.SpotLight(0xffa200, 8, 40, Math.PI / 4, 0.5, 1);
    baseSpot.position.set(0, 0.1, 0);
    baseSpot.target.position.set(0, 15, 0);
    scene.add(baseSpot);
    scene.add(baseSpot.target);

    // --- PROCEDURAL ARCHITECTURAL MODELS ---
    // Materials lookup berdasarkan Render Mode
    const getMaterials = (mode: typeof renderMode, colorHex: number = 0xff7a00) => {
      const isWire = mode === 'wireframe';
      
      switch (mode) {
        case 'wireframe':
          return {
            foundation: new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true }),
            skeleton: new THREE.MeshBasicMaterial({ color: 0xff7a00, wireframe: true }),
            walls: new THREE.MeshBasicMaterial({ color: 0x334155, opacity: 0.1, transparent: true, wireframe: true }),
            glass: new THREE.MeshBasicMaterial({ color: 0x06b6d4, opacity: 0.2, transparent: true, wireframe: true }),
            spire: new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true }),
            crane: new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true }),
          };
        case 'xray':
          return {
            foundation: new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.4 }),
            skeleton: new THREE.MeshBasicMaterial({ color: 0x0891b2, transparent: true, opacity: 0.7, wireframe: true }),
            walls: new THREE.MeshBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.2 }),
            glass: new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
            spire: new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.8 }),
            crane: new THREE.MeshBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.5, wireframe: true }),
          };
        case 'thermal':
          return {
            foundation: new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.9, metalness: 0.1 }),
            skeleton: new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xb45309, roughness: 0.3, metalness: 0.8 }),
            walls: new THREE.MeshStandardMaterial({ color: 0x1e3a8a, emissive: 0x172554, roughness: 0.5 }),
            glass: new THREE.MeshStandardMaterial({ color: 0xbe123c, emissive: 0x9f1239, transparent: true, opacity: 0.6 }),
            spire: new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, metalness: 0.9 }),
            crane: new THREE.MeshStandardMaterial({ color: 0xf97316 },),
          };
        case 'hologram':
          return {
            foundation: new THREE.MeshBasicMaterial({ color: 0x020617, transparent: true, opacity: 0.8 }),
            skeleton: new THREE.MeshBasicMaterial({ color: 0xff7a00, transparent: true, opacity: 0.8, wireframe: true }),
            walls: new THREE.MeshBasicMaterial({ color: 0xffa15c, transparent: true, opacity: 0.05 }),
            glass: new THREE.MeshBasicMaterial({ color: 0xff7a00, transparent: true, opacity: 0.15, side: THREE.DoubleSide }),
            spire: new THREE.MeshBasicMaterial({ color: 0xffd000, transparent: true, opacity: 1, wireframe: true }),
            crane: new THREE.MeshBasicMaterial({ color: 0xff7a00, transparent: true, opacity: 0.5, wireframe: true }),
          };
        case 'solid':
        default:
          return {
            foundation: new THREE.MeshStandardMaterial({
              color: 0x22252a,
              roughness: 0.9,
              metalness: 0.2,
            }),
            skeleton: new THREE.MeshStandardMaterial({
              color: 0x334155,
              roughness: 0.4,
              metalness: 0.85,
            }),
            walls: new THREE.MeshStandardMaterial({
              color: 0x475569,
              roughness: 0.85,
              metalness: 0.1,
            }),
            glass: new THREE.MeshStandardMaterial({
              color: 0x0e7490,
              roughness: 0.1,
              metalness: 0.9,
              transparent: true,
              opacity: 0.55,
              side: THREE.DoubleSide,
            }),
            spire: new THREE.MeshStandardMaterial({
              color: 0xf59e0b,
              roughness: 0.2,
              metalness: 0.95,
              emissive: 0x78350f,
            }),
            crane: new THREE.MeshStandardMaterial({
              color: 0xeab308,
              roughness: 0.5,
              metalness: 0.60,
            }),
          };
      }
    };

    // Main Construction Group in scene center
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Global Materials
    let mats = getMaterials(propsRef.current.renderMode);

    // --- 1. THE FOUNDATION (STAGE 0) ---
    // A thick hexagonal foundation platform and sub-anchor beams
    const foundGeo = new THREE.CylinderGeometry(8, 9, 0.8, 6);
    const foundationMesh = new THREE.Mesh(foundGeo, mats.foundation);
    foundationMesh.position.y = 0.4;
    foundationMesh.receiveShadow = true;
    foundationMesh.castShadow = true;
    buildingGroup.add(foundationMesh);

    // Add foundation sub-columns extending downwards
    const subColGeo = new THREE.BoxGeometry(0.8, 2, 0.8);
    const subColPositions = [
      [-6, -0.6, 0], [6, -0.6, 0], [0, -0.6, -6], [0, -0.6, 6],
      [-4, -0.6, -4], [4, -0.6, 4], [-4, -0.6, 4], [4, -0.6, -4]
    ];
    const subColsGroup = new THREE.Group();
    subColPositions.forEach((pos) => {
      const subMesh = new THREE.Mesh(subColGeo, mats.skeleton);
      subMesh.position.set(pos[0], pos[1], pos[2]);
      subColsGroup.add(subMesh);
    });
    foundationMesh.add(subColsGroup);

    // Laser scanners at ground corners targeting structural columns
    const laserScannerGroup = new THREE.Group();
    buildingGroup.add(laserScannerGroup);
    const laserColors = [0xff7a00, 0x06b6d4, 0xf59e0b];
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const scannerMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 0.5, 4),
        new THREE.MeshBasicMaterial({ color: 0x334155 })
      );
      scannerMesh.position.set(Math.cos(angle) * 7.5, 0.8, Math.sin(angle) * 7.5);
      
      const laserGeo = new THREE.BufferGeometry();
      const laserMat = new THREE.LineBasicMaterial({ color: laserColors[i], transparent: true, opacity: 0.8 });
      const laserLine = new THREE.Line(laserGeo, laserMat);
      
      scannerMesh.add(laserLine);
      laserScannerGroup.add(scannerMesh);
    }

    // --- SKYSCRAPER GENERATOR (12 FLOORS STAGE-BY-STAGE) ---
    const TOTAL_FLOORS = 12;
    const FLOOR_HEIGHT = 1.3;
    const GRID_SIZE = 4; // grid pillars

    // Arrays to store structural components for individual animations
    const floorGroups: THREE.Group[] = [];
    const floorSkeletons: THREE.Group[] = [];
    const floorSocialWalls: THREE.Group[] = [];
    const floorGlasses: THREE.Group[] = [];

    for (let f = 0; f < TOTAL_FLOORS; f++) {
      const floorGroup = new THREE.Group();
      floorGroup.position.y = 0.8 + f * FLOOR_HEIGHT;
      buildingGroup.add(floorGroup);
      floorGroups.push(floorGroup);

      // --- SKELETON GIRDERS (Gradiator Steel Structure) ---
      const skeletonGroup = new THREE.Group();
      floorGroup.add(skeletonGroup);
      floorSkeletons.push(skeletonGroup);

      // Slabs (Floor and ceiling grid rings)
      const ringGeo = new THREE.BoxGeometry(6, 0.12, 6);
      const ringMesh = new THREE.Mesh(ringGeo, mats.skeleton);
      ringMesh.castShadow = true;
      ringMesh.receiveShadow = true;
      skeletonGroup.add(ringMesh);

      // Multi-column grid structural core and pillars
      const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, FLOOR_HEIGHT, 8);
      
      // Corners
      const offsets = [-2.8, -1, 1, 2.8];
      offsets.forEach((ox) => {
        offsets.forEach((oz) => {
          // Skip outer nodes on higher floors for a futuristic tapered look
          const threshold = f < 5 ? 3 : f < 9 ? 2 : 1;
          const dist = Math.max(Math.abs(ox), Math.abs(oz));
          if (dist > threshold) return;

          const pillar = new THREE.Mesh(pillarGeo, mats.skeleton);
          pillar.position.set(ox, FLOOR_HEIGHT / 2, oz);
          pillar.castShadow = true;
          skeletonGroup.add(pillar);
        });
      });

      // Internal Diagonal brace beams
      if (f % 2 === 0) {
        const braceGeo0 = new THREE.CylinderGeometry(0.04, 0.04, Math.sqrt(4 + FLOOR_HEIGHT * FLOOR_HEIGHT), 4);
        const brace0 = new THREE.Mesh(braceGeo0, mats.skeleton);
        brace0.position.set(0, FLOOR_HEIGHT / 2, -2.8);
        brace0.rotation.z = Math.atan2(2, FLOOR_HEIGHT);
        skeletonGroup.add(brace0);

        const brace1 = new THREE.Mesh(braceGeo0, mats.skeleton);
        brace1.position.set(0, FLOOR_HEIGHT / 2, 2.8);
        brace1.rotation.z = -Math.atan2(2, FLOOR_HEIGHT);
        skeletonGroup.add(brace1);
      }

      // --- CONCRETE SOLID WALLS (Stage 2) ---
      const wallGroup = new THREE.Group();
      floorGroup.add(wallGroup);
      floorSocialWalls.push(wallGroup);

      // Thick central elevator core shaft representing concrete core
      const coreGeo = new THREE.BoxGeometry(2, FLOOR_HEIGHT, 2);
      const coreMesh = new THREE.Mesh(coreGeo, mats.walls);
      coreMesh.position.set(0, FLOOR_HEIGHT / 2, 0);
      coreMesh.castShadow = true;
      coreMesh.receiveShadow = true;
      wallGroup.add(coreMesh);

      // Partial structural floor panels (concrete outer blocks)
      if (f < TOTAL_FLOORS - 1) {
        const wallBlockGeo = new THREE.BoxGeometry(2.4, FLOOR_HEIGHT * 0.9, 0.25);
        
        // Randomly scatter concrete slabs based on floor to feel under construction
        const wallSlabNorth = new THREE.Mesh(wallBlockGeo, mats.walls);
        wallSlabNorth.position.set(0, FLOOR_HEIGHT / 2, 2.7);
        wallSlabNorth.castShadow = true;
        wallSlabNorth.receiveShadow = true;
        wallGroup.add(wallSlabNorth);

        const wallSlabWest = new THREE.Mesh(wallBlockGeo, mats.walls);
        wallSlabWest.position.set(-2.7, FLOOR_HEIGHT / 2, 0);
        wallSlabWest.rotation.y = Math.PI / 2;
        wallSlabWest.castShadow = true;
        wallSlabWest.receiveShadow = true;
        wallGroup.add(wallSlabWest);
      }

      // --- GLASS REFLECTIVE FACADE (Stage 3) ---
      const glassGroup = new THREE.Group();
      floorGroup.add(glassGroup);
      floorGlasses.push(glassGroup);

      const glassOffsets = [-2.85, 2.85];
      // Generate thin sleek translucent blueprint glass facades
      glassOffsets.forEach((gx) => {
        // North & South Glass facades
        const glassFacGeo1 = new THREE.BoxGeometry(3.6, FLOOR_HEIGHT * 0.95, 0.05);
        const glassMesh1 = new THREE.Mesh(glassFacGeo1, mats.glass);
        glassMesh1.position.set(0, FLOOR_HEIGHT / 2, gx);
        glassMesh1.castShadow = true;
        glassGroup.add(glassMesh1);
        
        // East & West Glass facades
        const glassFacGeo2 = new THREE.BoxGeometry(3.6, FLOOR_HEIGHT * 0.95, 0.05);
        const glassMesh2 = new THREE.Mesh(glassFacGeo2, mats.glass);
        glassMesh2.position.set(gx, FLOOR_HEIGHT / 2, 0);
        glassMesh2.rotation.y = Math.PI / 2;
        glassMesh2.castShadow = true;
        glassGroup.add(glassMesh2);
      });
    }

    // --- 2. THE TOWER CRANES (STAGE 1 ENGINE) ---
    const cranesContainer = new THREE.Group();
    buildingGroup.add(cranesContainer);

    // Primary Heavy Tower Crane
    const craneScale = 1.0;
    const primaryCrane = new THREE.Group();
    primaryCrane.position.set(-4, 0, -4);
    cranesContainer.add(primaryCrane);

    // Crane Vertical Mast Truss
    const mastHeight = 18;
    const mastGeo = new THREE.BoxGeometry(0.4, mastHeight, 0.4);
    const mastMesh = new THREE.Mesh(mastGeo, mats.crane);
    mastMesh.position.y = mastHeight / 2;
    mastMesh.castShadow = true;
    primaryCrane.add(mastMesh);

    // Crane Slewing Unit (Pivot joint on top of mast)
    const slewingMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.6, 8),
      mats.crane
    );
    slewingMesh.position.y = mastHeight + 0.3;
    primaryCrane.add(slewingMesh);

    // Crane Jib Arm (The holding crane element)
    const jibGroup = new THREE.Group();
    jibGroup.position.y = mastHeight + 0.6;
    primaryCrane.add(jibGroup);

    // Forward Jib
    const jibLength = 10;
    const forwardJibGeo = new THREE.BoxGeometry(jibLength, 0.25, 0.25);
    const forwardJibMesh = new THREE.Mesh(forwardJibGeo, mats.crane);
    forwardJibMesh.position.x = jibLength / 2 - 0.2;
    forwardJibMesh.castShadow = true;
    jibGroup.add(forwardJibMesh);

    // Counter Jib (Weights at back)
    const counterJibGeo = new THREE.BoxGeometry(3.5, 0.25, 0.25);
    const counterJibMesh = new THREE.Mesh(counterJibGeo, mats.crane);
    counterJibMesh.position.x = -1.75;
    jibGroup.add(counterJibMesh);

    const counterWeightGeo = new THREE.BoxGeometry(0.8, 0.6, 0.6);
    const counterWeightMesh = new THREE.Mesh(counterWeightGeo, mats.foundation); // Concrete weight
    counterWeightMesh.position.set(-2.8, -0.1, 0);
    jibGroup.add(counterWeightMesh);

    // Crane Tower Apex Peak
    const apexGeo = new THREE.ConeGeometry(0.2, 1.5, 4);
    const apexMesh = new THREE.Mesh(apexGeo, mats.crane);
    apexMesh.position.y = 0.75;
    jibGroup.add(apexMesh);

    // Dynamic cables dropping from jib arm holding a load
    const trolleyX = 4.5;
    
    // Cables
    const cableGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(trolleyX, 0, 0),
      new THREE.Vector3(trolleyX, -4, 0),
    ]);
    const cableLine = new THREE.Line(cableGeo, new THREE.LineBasicMaterial({ color: 0x1e293b }));
    jibGroup.add(cableLine);

    // Loaded architectural truss payload
    const loadGroup = new THREE.Group();
    loadGroup.position.set(trolleyX, -4, 0);
    jibGroup.add(loadGroup);

    const steelLoadMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.15, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xff7a00, roughness: 0.2, metalness: 0.9 })
    );
    loadGroup.add(steelLoadMesh);
    
    const steelLoadMesh2 = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.15, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xff7a00, roughness: 0.2, metalness: 0.9 })
    );
    steelLoadMesh2.position.set(0, -0.3, 0);
    loadGroup.add(steelLoadMesh2);

    // --- 3. HIGH-ALTITUDE SPIRE (STAGE 4 CAPSTONE) ---
    const spireGroup = new THREE.Group();
    spireGroup.position.y = 0.8 + TOTAL_FLOORS * FLOOR_HEIGHT;
    buildingGroup.add(spireGroup);

    // Glowing amber volumetric cap cone
    const spireCapGeo = new THREE.ConeGeometry(1.6, 2.2, 4);
    const spireCapMesh = new THREE.Mesh(spireCapGeo, mats.spire);
    spireCapMesh.position.y = 1.1;
    spireCapMesh.castShadow = true;
    spireGroup.add(spireCapMesh);

    // Ultra high metal antenna needle
    const needleGeo = new THREE.CylinderGeometry(0.04, 0.15, 6, 8);
    const needleMesh = new THREE.Mesh(needleGeo, mats.spire);
    needleMesh.position.y = 5.2;
    needleMesh.castShadow = true;
    spireGroup.add(needleMesh);

    // Telemetry node on tip of the spire
    const tipLight = new THREE.PointLight(0xff7a00, 4, 15);
    tipLight.position.set(0, 8.2, 0);
    spireGroup.add(tipLight);

    const tipTrophy = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    tipTrophy.position.set(0, 8.2, 0);
    spireGroup.add(tipTrophy);

    // Vertical Sky Laser projection
    const skyLaserGeo = new THREE.BufferGeometry();
    const skyLaserMat = new THREE.LineBasicMaterial({ color: 0xffa200, transparent: true, opacity: 0.3 });
    const skyLaserLine = new THREE.Line(skyLaserGeo, skyLaserMat);
    spireGroup.add(skyLaserLine);

    // --- 4. FLIGHTING BACKGROUND CITY SKYLINE ---
    // Distant dark silhouette architecture
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    for (let i = 0; i < 35; i++) {
      const bHeight = 8 + Math.random() * 32;
      const bWidth = 3 + Math.random() * 5;
      const bGeo = new THREE.BoxGeometry(bWidth, bHeight, bWidth);
      const isWireframeSub = Math.random() > 0.4;
      const bMat = new THREE.MeshBasicMaterial({
        color: 0x07090e,
        wireframe: isWireframeSub,
        transparent: true,
        opacity: isWireframeSub ? 0.08 : 0.4
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);

      // Arrange building randomly in ring far back
      const distance = 45 + Math.random() * 55;
      const angle = Math.random() * Math.PI * 2;
      bMesh.position.set(Math.cos(angle) * distance, bHeight / 2 - 2, Math.sin(angle) * distance);
      cityGroup.add(bMesh);

      // Add architectural warning beacon tip lights
      if (Math.random() > 0.4) {
        const blGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(angle) * distance, bHeight - 1.8, Math.sin(angle) * distance)
        ]);
        const blMat = new THREE.PointsMaterial({ color: 0xff0044, size: 0.4 });
        const blPoints = new THREE.Points(blGeo, blMat);
        cityGroup.add(blPoints);
      }
    }

    // --- 5. HIGH-SPEED WELDING SPARKS PARTICLE SYSTEM ---
    const maxSparks = 200;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkCoords = new Float32Array(maxSparks * 3);
    const sparkVelocities: THREE.Vector3[] = [];
    const sparkAges: number[] = [];
    const sparkMaxAges: number[] = [];

    for (let s = 0; s < maxSparks; s++) {
      // Initialize dead sparks
      sparkCoords[s * 3] = 0;
      sparkCoords[s * 3 + 1] = -100.0;
      sparkCoords[s * 3 + 2] = 0;
      sparkVelocities.push(new THREE.Vector3());
      sparkAges.push(999);
      sparkMaxAges.push(50 + Math.random() * 100);
    }
    
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkCoords, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xff8c00,
      size: 0.16,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    // --- 6. FLOATING DUST/SKYLINE CLOUD FIELDS ---
    const cloudCount = 100;
    const cloudGeo = new THREE.BufferGeometry();
    const cloudCoords = new Float32Array(cloudCount * 3);
    for (let c = 0; c < cloudCount; c++) {
      cloudCoords[c * 3] = (Math.random() - 0.5) * 50;
      cloudCoords[c * 3 + 1] = 2 + Math.random() * 25;
      cloudCoords[c * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudCoords, 3));
    const cloudPoints = new THREE.Points(cloudGeo, new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    }));
    scene.add(cloudPoints);

    // --- INTERACTIVE DRAG CAMERA CONTROLLER ---
    let targetTheta = 0.6; // horizontal orbital angle
    let targetPhi = 1.2; // vertical elevation angle
    let targetRadius = 26; // camera zoom distance

    let currentTheta = targetTheta;
    let currentPhi = targetPhi;
    let currentRadius = targetRadius;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetTheta -= deltaX * 0.007;
      targetPhi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, targetPhi - deltaY * 0.007));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Attach mouse orbital listeners directly to canvas
    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch event supporting mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetTheta -= deltaX * 0.008;
      targetPhi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, targetPhi - deltaY * 0.008));
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    canvasEl.addEventListener('touchstart', handleTouchStart);
    canvasEl.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // Global viewport aspect resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // --- ANIMATION & TELEMETRY THREAD ---
    let frameId = 0;
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsHistory: number[] = [];

    const sparkEmitRate = 1.5; // Sparks emitted per frame
    let activeWeldingFloor = 0;

    const tick = () => {
      const now = performance.now();
      frameCounter++;
      if (now - lastTime >= 1000) {
        const currentFPS = frameCounter;
        fpsHistory.push(currentFPS);
        if (fpsHistory.length > 5) fpsHistory.shift();
        const avgFPS = Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length);
        
        // Calculate geometry statistics dynamically
        let activeElementsCount = 0;
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.visible) activeElementsCount++;
        });

        setTelemetry({
          fps: avgFPS,
          drawCalls: renderer.info.render.calls,
          vertexCount: renderer.info.render.triangles * 3,
          activeElements: activeElementsCount,
          windSpeed: `${(10 + Math.sin(now * 0.0001) * 4).toFixed(1)} km/h`,
          structuralLoad: `${Math.round(40 + (propsRef.current.scrollProgress * 50) + Math.cos(now * 0.0005) * 2)}%`
        });

        frameCounter = 0;
        lastTime = now;
      }

      // --- CRANE SLEWING ANIMATIONS ---
      // Rotate crane boom lazily based on time
      const timeSecs = now * 0.001;
      const baseAngle = Math.sin(timeSecs * 0.4) * 0.8;
      primaryCrane.children[1].rotation.y = baseAngle * 0.05; // rot mast
      jibGroup.rotation.y = baseAngle; // rotate crane body

      // Oscillate crane load weight subtly represent dynamic breeze swinging load
      const swingAngle = Math.sin(timeSecs * 1.5) * 0.04;
      loadGroup.rotation.z = swingAngle;
      loadGroup.rotation.x = Math.cos(timeSecs * 1.1) * 0.02;

      // Draw cable line
      const cablePositions = cableLine.geometry.attributes.position.array as Float32Array;
      const loadWorldPos = new THREE.Vector3(trolleyX, -3.5 + Math.sin(timeSecs * 0.5) * 0.5, 0);
      loadGroup.position.copy(loadWorldPos);
      
      cablePositions[3] = loadWorldPos.x;
      cablePositions[4] = loadWorldPos.y;
      cablePositions[5] = loadWorldPos.z;
      cableLine.geometry.attributes.position.needsUpdate = true;

      // --- SKY LASER ON SPIRE ---
      const skyLaserPositions = new Float32Array([
        0, 5, 0,
        0, 150, 0
      ]);
      skyLaserLine.geometry.setAttribute('position', new THREE.BufferAttribute(skyLaserPositions, 3));

      // --- LASER CORNER GEOMETRY ---
      const activeConstructingHeight = propsRef.current.scrollProgress * (TOTAL_FLOORS * FLOOR_HEIGHT);
      laserScannerGroup.children.forEach((scanner, index) => {
        const laser = scanner.children[0] as THREE.Line;
        const scanAngle = timeSecs * 1.2 + index * (Math.PI / 1.5);
        const targetX = Math.cos(scanAngle) * 3;
        const targetZ = Math.sin(scanAngle) * 3;
        
        // Target high constructing layer
        const targetLocal = scanner.worldToLocal(new THREE.Vector3(targetX, activeConstructingHeight, targetZ));
        const pts = new Float32Array([
          0, 0, 0,
          targetLocal.x, targetLocal.y, targetLocal.z
        ]);
        laser.geometry.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      });

      // --- SPARKS PHYSIC SIMULATION ---
      const activeSparkCoords = sparkPoints.geometry.attributes.position.array as Float32Array;
      
      // Determine height location to emit sparks (welding level)
      activeWeldingFloor = Math.floor(propsRef.current.scrollProgress * TOTAL_FLOORS);
      activeWeldingFloor = Math.max(0, Math.min(TOTAL_FLOORS - 1, activeWeldingFloor));
      const weldingY = 0.8 + activeWeldingFloor * FLOOR_HEIGHT;

      // Crane payload world position for spark points at times
      const pCraneWorld = new THREE.Vector3();
      loadGroup.getWorldPosition(pCraneWorld);

      for (let s = 0; s < maxSparks; s++) {
        // If particle is dead, spawn at active welding spot or payload
        if (sparkAges[s] >= sparkMaxAges[s]) {
          if (Math.random() < 0.25) {
            sparkAges[s] = 0;
            const spawnOnCrane = Math.random() > 0.5;
            
            if (spawnOnCrane) {
              activeSparkCoords[s * 3] = pCraneWorld.x + (Math.random() - 0.5) * 1;
              activeSparkCoords[s * 3 + 1] = pCraneWorld.y;
              activeSparkCoords[s * 3 + 2] = pCraneWorld.z + (Math.random() - 0.5) * 1;
            } else {
              // Spawn around central pillar rings
              const weldAngle = Math.random() * Math.PI * 2;
              activeSparkCoords[s * 3] = Math.cos(weldAngle) * 2.8 + (Math.random() - 0.5) * 0.2;
              activeSparkCoords[s * 3 + 1] = weldingY + FLOOR_HEIGHT;
              activeSparkCoords[s * 3 + 2] = Math.sin(weldAngle) * 2.8 + (Math.random() - 0.5) * 0.2;
            }
            
            sparkVelocities[s].set(
              (Math.random() - 0.5) * 0.15,
              (Math.random() - 0.2) * 0.1,
              (Math.random() - 0.5) * 0.15
            );
          } else {
            // Keep hidden if dead
            activeSparkCoords[s * 3 + 1] = -500;
          }
        } else {
          // Spark is active, apply gravity & velocities
          activeSparkCoords[s * 3] += sparkVelocities[s].x;
          activeSparkCoords[s * 3 + 1] += sparkVelocities[s].y;
          activeSparkCoords[s * 3 + 2] += sparkVelocities[s].z;

          sparkVelocities[s].y -= 0.0016; // gravity
          sparkAges[s]++;
        }
      }
      sparkPoints.geometry.attributes.position.needsUpdate = true;

      // --- ROTATING THE MAIN BUILDING BASED ON SCROLL / MOUSE PARALLAX ---
      const prog = propsRef.current.scrollProgress;
      
      // Auto revolve slightly over time, plus mouse dragging
      currentTheta += (targetTheta - currentTheta) * 0.06;
      currentPhi += (targetPhi - currentPhi) * 0.06;
      currentRadius += (targetRadius - currentRadius) * 0.06;

      // Map progress to beautiful camera flights
      // - Near hero (prog = 0): Wide, slight orbit, majestic sunset silhouette looking up
      // - Scroll progress rise: Camera orbits, flies vertically tracking the growth, looks down on completed tower
      let progressAngle = prog * Math.PI * 1.5;
      let animatedRadius = targetRadius + Math.sin(prog * Math.PI) * 5; // dynamic zoom sweep
      let lookAtY = 3 + prog * (TOTAL_FLOORS * FLOOR_HEIGHT * 0.45); // target moves with growth

      const camX = Math.cos(currentTheta + progressAngle) * Math.sin(currentPhi) * animatedRadius;
      const camZ = Math.sin(currentTheta + progressAngle) * Math.sin(currentPhi) * animatedRadius;
      const camY = currentRadius * Math.cos(currentPhi) + 2 + (prog * TOTAL_FLOORS * FLOOR_HEIGHT * 0.7);

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0, lookAtY, 0);

      // --- DYNAMIC RENDERING MODES ---
      // Check if render mode updated
      if (mats.skeleton.type !== `Mesh${propsRef.current.renderMode === 'wireframe' || propsRef.current.renderMode === 'xray' || propsRef.current.renderMode === 'hologram' ? 'Basic' : 'Standard'}Material`) {
        // Redraw materials
        mats = getMaterials(propsRef.current.renderMode);
        
        // Re-assign material to all procedural sub-elements
        foundationMesh.material = mats.foundation;
        subColsGroup.children.forEach(c => { (c as THREE.Mesh).material = mats.skeleton; });
        needleMesh.material = mats.spire;
        spireCapMesh.material = mats.spire;
        mastMesh.material = mats.crane;
        slewingMesh.material = mats.crane;
        forwardJibMesh.material = mats.crane;
        counterJibMesh.material = mats.crane;
        
        for (let f = 0; f < TOTAL_FLOORS; f++) {
          floorSkeletons[f].children.forEach(el => {
            if (el instanceof THREE.Mesh) el.material = mats.skeleton;
          });
          floorSocialWalls[f].children.forEach(el => {
            if (el instanceof THREE.Mesh) el.material = mats.walls;
          });
          floorGlasses[f].children.forEach(el => {
            if (el instanceof THREE.Mesh) el.material = mats.glass;
          });
        }
      }

      // Adjust overall lighting and colors based on Project highlight triggers
      if (propsRef.current.focusedProjectId) {
        fillLight.color.setHex(propsRef.current.focusedProjectId === 'apollo' ? 0xff0051 : propsRef.current.focusedProjectId === 'ares' ? 0xfc7b03 : 0x06b6d4);
        fillLight.intensity = 2.5;
      } else {
        fillLight.color.setHex(0x06b6d4);
        fillLight.intensity = 1.2;
      }

      // --- PROGRESS CONSTRUCTING LOGIC (SCROLLED ASSEMBLY) ---
      // Scale and activate structural elements depending on construction layers
      for (let f = 0; f < TOTAL_FLOORS; f++) {
        // Core framework begins early
        const sStart = 0.05 + (f / TOTAL_FLOORS) * 0.45;
        const sProgress = Math.max(0, Math.min(1, (prog - sStart) * 12));
        floorSkeletons[f].scale.set(sProgress, sProgress, sProgress);
        floorSkeletons[f].visible = sProgress > 0;

        // Slabs walls start mid-phase
        const wStart = 0.22 + (f / TOTAL_FLOORS) * 0.45;
        const wProgress = Math.max(0, Math.min(1, (prog - wStart) * 10));
        floorSocialWalls[f].scale.set(wProgress, wProgress, wProgress);
        floorSocialWalls[f].visible = wProgress > 0;

        // Elegant glass outer shell completes last
        const gStart = 0.45 + (f / TOTAL_FLOORS) * 0.45;
        const gProgress = Math.max(0, Math.min(1, (prog - gStart) * 8));
        floorGlasses[f].scale.set(gProgress, gProgress, gProgress);
        // Soft opacity transition for glass to look extremely premium and sleek
        if (propsRef.current.renderMode === 'solid') {
          (mats.glass as THREE.MeshStandardMaterial).opacity = 0.55 * gProgress;
        } else if (propsRef.current.renderMode === 'xray') {
          (mats.glass as THREE.MeshBasicMaterial).opacity = 0.35 * gProgress;
        }
        floorGlasses[f].visible = gProgress > 0;
      }

      // Cap Spire scale linked to final scroll stage
      const spireStart = 0.88;
      const spireProg = Math.max(0, Math.min(1, (prog - spireStart) * 8));
      spireGroup.scale.set(spireProg, spireProg, spireProg);
      spireGroup.visible = spireProg > 0;

      // Animate cranes height to stay above highest active floor
      const activeHeightScale = Math.min(1, prog / 0.85); // caps active build height at 85% scroll
      const craneHeightY = activeHeightScale * (TOTAL_FLOORS * FLOOR_HEIGHT - 3);
      cranesContainer.position.y = Math.max(0, craneHeightY);

      // Slowly rotate Far City Skyline buildings
      cityGroup.rotation.y = timeSecs * 0.015;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(frameId);
      
      // Detach events
      canvasEl?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvasEl?.removeEventListener('touchstart', handleTouchStart);
      canvasEl?.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      
      resizeObserver.disconnect();

      // Dispose structural meshes
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      sparkGeo.dispose();
      sparkMat.dispose();
      cloudGeo.dispose();
      cloudPoints.geometry.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div id="three-container" ref={containerRef} className="relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-3xl" style={{ touchAction: 'none' }}>
      <canvas id="architectural-3d-canvas" ref={canvasRef} className="w-full h-full block absolute inset-0 z-10" />
      
      {/* Sci-fi Overlay Blueprint Framing */}
      <div className="absolute inset-0 z-0 blueprint-grid pointer-events-none opacity-40 rounded-3xl" />
      <div className="absolute inset-0 z-0 pointer-events-none rounded-3xl border border-brand-orange/20" />
      
      {/* Sub-corner sci-fi calibration ticks */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[9px] text-brand-orange/50 tracking-wider flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange node-pulse inline-block" />
        WebGL_RENDER_GRID: T-09
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none font-mono text-[9px] text-white/40 tracking-wider">
        SYS_STATUS: ACTIVE
      </div>
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none font-mono text-[9px] text-white/40 tracking-wider">
        SECURE_FEED: CALIBRATED
      </div>

      {/* Real-time WebGL HUD Overlay */}
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none lg:grid hidden grid-cols-2 gap-x-4 gap-y-1.5 glass-panel px-4 py-3 rounded-xl border border-white/5 font-mono text-[10px] text-zinc-300">
        <div className="text-zinc-500 uppercase tracking-wider">Engine:</div>
        <div className="text-right text-brand-orange">THREE_JS_v152</div>
        
        <div className="text-zinc-500 uppercase tracking-wider border-t border-zinc-900 pt-1">FPS Meter:</div>
        <div className={`text-right font-medium border-t border-zinc-900 pt-1 ${telemetry.fps >= 55 ? 'text-emerald-400' : 'text-amber-500'}`}>
          {telemetry.fps} FPS
        </div>
        
        <div className="text-zinc-500 uppercase tracking-wider">Vertices:</div>
        <div className="text-right text-cyan-400">{(telemetry.vertexCount / 1000).toFixed(1)}k</div>
        
        <div className="text-zinc-500 uppercase tracking-wider">Draw Calls:</div>
        <div className="text-right text-yellow-400">{telemetry.drawCalls}</div>

        <div className="text-zinc-500 uppercase tracking-wider">Active Meshes:</div>
        <div className="text-right text-zinc-300">{telemetry.activeElements}</div>

        <div className="text-zinc-500 uppercase tracking-wider">Wind Velocity:</div>
        <div className="text-right text-orange-400">{telemetry.windSpeed}</div>

        <div className="text-zinc-500 uppercase tracking-wider border-t border-zinc-900 pt-1">Vert Load:</div>
        <div className="text-right text-zinc-300 border-t border-zinc-900 pt-1 font-semibold">{telemetry.structuralLoad}</div>
      </div>
    </div>
  );
}
