"use client"; // this is a client component

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={[0.65]}
            scale={40}
            blur={1}
            for={9}
          />
          <Environment preset="studio" /> {/* environment giving preset light setups */}
        </Suspense>
      </Canvas>
    </div>
  );
}

// the shapes
function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3, // radius
      geometry: new THREE.IcosahedronGeometry(3), // gem shapes
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // pill shapes
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // soccer ball shapes
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // gem shapes
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // donut shapes
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    // new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0, metalness: 1, }),
    // new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0, metalness: 0.5, }),
  ];

  //   pass to geometry
  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(true);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleCLick(e) {
    const mesh = e.object;

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`, // random rotate 2 degrees
      y: `+=${gsap.utils.random(0, 2)}`, // random rotate 2 degrees
      z: `+=${gsap.utils.random(0, 2)}`, // random rotate 2 degrees
      duration: 1.3,
      ease: "elastic.out(1, 0.3)",
      yoyo: true, // back to where it started
    });

    mesh.material = getRandomMaterial();
  }

  // hover
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      let ctx = gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.0,
        ease: "elastic.out(1, 0.3)",
        delay: 0.3,
      });
    });
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>  {/* float giving a rotating animation */}
        <mesh
          geometry={geometry}
          onClick={handleCLick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
