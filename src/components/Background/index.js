import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
const Starfield = ({ backgroundColor = '#030014' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const createCircleTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const circleTexture = createCircleTexture();
    const starCount = 5000;
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      map: circleTexture,
      transparent: true,
      alphaTest: 0.5
    });

    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const shootingStarCount = 60;
    const shootingStarGeometry = new THREE.BufferGeometry();
    const shootingStarMaterial = new THREE.PointsMaterial({
      size: 4,
      map: circleTexture,
      transparent: true,
      alphaTest: 0.5
    });

    const shootingStarVertices = [];
    const shootingStars = [];
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = {
        x: THREE.MathUtils.randFloatSpread(2000),
        y: THREE.MathUtils.randFloatSpread(2000),
        z: THREE.MathUtils.randFloatSpread(2000),
        speed: THREE.MathUtils.randFloat(5, 10),
        lifetime: 0,
        trail: []
      };
      shootingStars.push(shootingStar);
      shootingStarVertices.push(shootingStar.x, shootingStar.y, shootingStar.z);
    }
    shootingStarGeometry.setAttribute('position', new THREE.Float32BufferAttribute(shootingStarVertices, 3));
    const shootingStarPoints = new THREE.Points(shootingStarGeometry, shootingStarMaterial);
    scene.add(shootingStarPoints);

    const tailMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const tailGeometries = shootingStars.map(() => new THREE.BufferGeometry());
    const tails = tailGeometries.map(geo => new THREE.Line(geo, tailMaterial));
    tails.forEach(tail => scene.add(tail));

    camera.position.z = 1000;
    renderer.setClearColor(backgroundColor, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y -= 0.003;
      stars.rotation.x -= 0.0015;
      const positions = shootingStarGeometry.attributes.position.array;
      for (let i = 0; i < shootingStarCount; i++) {
        const shootingStar = shootingStars[i];
        shootingStar.lifetime += 1;
        if (shootingStar.lifetime > 300) {
          shootingStar.x = THREE.MathUtils.randFloatSpread(2000);
          shootingStar.y = THREE.MathUtils.randFloatSpread(2000);
          shootingStar.z = THREE.MathUtils.randFloatSpread(2000);
          shootingStar.speed = THREE.MathUtils.randFloat(5, 10);
          shootingStar.lifetime = 0;
          shootingStar.trail = [];
        }
        shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y, z: shootingStar.z });
        if (shootingStar.trail.length > 10) {
          shootingStar.trail.shift();
        }
        shootingStar.x -= shootingStar.speed;
        shootingStar.y -= shootingStar.speed;
        positions[i * 3] = shootingStar.x;
        positions[i * 3 + 1] = shootingStar.y;
        positions[i * 3 + 2] = shootingStar.z;
        const tailPositions = [];
        shootingStar.trail.forEach(pos => {
          tailPositions.push(pos.x, pos.y, pos.z);
        });
        tailGeometries[i].setAttribute('position', new THREE.Float32BufferAttribute(tailPositions, 3));
        tailGeometries[i].attributes.position.needsUpdate = true;
      }
      shootingStarGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [backgroundColor]);

  return <div ref={mountRef} style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }} />;
};

export default Starfield;
