import React, { useRef, useState, useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import styled from 'styled-components';
import { Texture } from 'three';
import { getStarCount } from '../../api/countApi';
import { useQueryClient } from '@tanstack/react-query';
import { useStarCountStore } from '../../store/starConuntStore';
import { useStarCount } from '../../hooks/queries/useStarCount';
import { useShallow } from 'zustand/react/shallow';
import { userStateStore } from '../../store/userStateStore';
import star from '@/star.png';

interface StarProps {
  texture: Texture;
  offsetTime: number;
}

interface CentralImageProps {
  texture: Texture;
}

const CentralImage: React.FC<CentralImageProps> = ({ texture }) => (
  <mesh position={[0, 0, 0]}>
    <planeGeometry args={[7, 7]} />
    <meshStandardMaterial map={texture} transparent />
  </mesh>
);

const Star: React.FC<StarProps> = ({ texture, offsetTime }) => {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.3 + offsetTime;
    if (ref.current) {
      ref.current.position.x = 5 * Math.sin(time);
      ref.current.position.y = (4 * Math.sin(time)) / 2;
      ref.current.position.z = 1.5 * Math.cos(time);
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ffffff" map={texture} transparent />
    </mesh>
  );
};

const MyElement3D = React.memo(function MyElement3D() {
  const [textureStar, setTextureStar] = useState<Texture | null>(null);
  const [texturePlanet, setTexturePlanet] = useState<Texture | null>(null);

  const starImagePath = star;

  const planet = userStateStore((state) => state.planet);
  const planetImagePath = `/assets/images/planet${planet}.png`;

  const [starCount, setStarCountState] = useStarCountStore(
    useShallow((state) => [state.starCount, state.setStarCountState]),
  );

  const queryClient = useQueryClient();

  const starCountQuery = useStarCount();

  useEffect(() => {
    getStarCount();
    setStarCountState(starCountQuery.data);
  }, [starCountQuery.data, setStarCountState]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['worryCount'],
    });
  }, [starCount, queryClient]);

  useEffect(() => {
    new TextureLoader().load(starImagePath, (texture) => {
      setTextureStar(texture);
    });
    new TextureLoader().load(planetImagePath, (texture) => {
      setTexturePlanet(texture);
    });
  }, [planetImagePath, starImagePath]);
  return (
    <AnimationGroup>
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 5, 5]} />
        {texturePlanet && <CentralImage texture={texturePlanet} />}
        {textureStar &&
          Array.from({ length: starCount < 6 ? starCount : 5 }, (_, index) => (
            <Star
              key={index}
              texture={textureStar}
              offsetTime={
                (index * (2 * Math.PI)) / (starCount < 6 ? starCount : 5)
              }
            />
          ))}
      </Canvas>
    </AnimationGroup>
  );
});

export default MyElement3D;

const AnimationGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  max-height: 300px;
  background: transparent !important;
  canvas {
    background: transparent !important;
  }
`;
