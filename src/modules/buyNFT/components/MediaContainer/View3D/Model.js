import React, { useState, useEffect, useCallback } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';

export default function Model(props) {
  const { scene, animations } = useGLTF(props.fileUrl);
  const { actions, names, ref } = useAnimations(animations);
  useFrame(({ clock }) => {
    ref.current.rotation.y = Math.sin(clock.getElapsedTime());
  });
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 0.6 : 1,
    config: config.wobbly,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (actions) {
      actions[names[activeIndex]].reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions[names[activeIndex]]) {
        actions[names[activeIndex]].fadeOut(0.5);
      }
    };
  }, [actions, names, activeIndex]);

  const handleChangeAnmition = useCallback(() => {
    if (activeIndex < names.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  }, [activeIndex, names.length]);

  return (
    <animated.group
      ref={ref}
      {...props}
      dispose={null}
      scale={scale}
      onPointerOver={() => setActive(!active)}
      onClick={handleChangeAnmition}
    >
      <primitive object={scene} />
    </animated.group>
  );
}
