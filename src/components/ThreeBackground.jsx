import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let renderer, scene, camera, animationFrameId, geometry, particleMaterial, particleTexture, crystalGeo, crystalMat;

    try {
      // Scene, Camera, Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 30;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      currentMount.appendChild(renderer.domElement);

      // 1. Starfield / Pink Sparkle Particles
      const particleCount = 900;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const pinkPalette = [
        new THREE.Color('#FFB6C1'),
        new THREE.Color('#FF69B4'),
        new THREE.Color('#FFA3C8'),
        new THREE.Color('#FFFFFF'),
        new THREE.Color('#D81E5B'),
      ];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

        const randomColor = pinkPalette[Math.floor(Math.random() * pinkPalette.length)];
        colors[i * 3] = randomColor.r;
        colors[i * 3 + 1] = randomColor.g;
        colors[i * 3 + 2] = randomColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Particle Texture creation via canvas
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 182, 193, 0.8)');
        grad.addColorStop(0.7, 'rgba(255, 77, 141, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        particleTexture = new THREE.CanvasTexture(canvas);
      }

      particleMaterial = new THREE.PointsMaterial({
        size: 1.2,
        map: particleTexture || null,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      // 2. Floating 3D Geometric Polyhedrons
      const floatingGroup = new THREE.Group();
      crystalGeo = new THREE.IcosahedronGeometry(1.2, 0);
      crystalMat = new THREE.MeshStandardMaterial({
        color: 0xffa3c8,
        metalness: 0.85,
        roughness: 0.15,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const crystals = [];
      for (let i = 0; i < 12; i++) {
        const mesh = new THREE.Mesh(crystalGeo, crystalMat);
        mesh.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.scale.setScalar(Math.random() * 0.8 + 0.4);
        mesh.userData = {
          rotSpeedX: (Math.random() - 0.5) * 0.012,
          rotSpeedY: (Math.random() - 0.5) * 0.012,
          floatOffset: Math.random() * Math.PI * 2,
        };
        crystals.push(mesh);
        floatingGroup.add(mesh);
      }
      scene.add(floatingGroup);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const pinkPointLight = new THREE.PointLight(0xff4d8d, 3, 60);
      pinkPointLight.position.set(10, 15, 10);
      scene.add(pinkPointLight);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const handleTouchMove = (e) => {
        if (e.touches && e.touches.length > 0) {
          mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });

      const handleResize = () => {
        if (!currentMount || !renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 3;
        camera.position.y = -targetY * 3;
        camera.lookAt(scene.position);

        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = elapsedTime * 0.015;

        crystals.forEach((crystal) => {
          crystal.rotation.x += crystal.userData.rotSpeedX;
          crystal.rotation.y += crystal.userData.rotSpeedY;
          crystal.position.y += Math.sin(elapsedTime * 1.5 + crystal.userData.floatOffset) * 0.012;
        });

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);

        if (currentMount && renderer?.domElement && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
        geometry?.dispose();
        particleMaterial?.dispose();
        particleTexture?.dispose();
        crystalGeo?.dispose();
        crystalMat?.dispose();
        renderer?.dispose();
      };
    } catch (err) {
      console.warn("Three.js setup fallback:", err);
    }
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
};
