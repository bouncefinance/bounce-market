import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './Model';
import Loader from './Loader';
import { useView3DStyles } from './useView3DStyles';
import { useGLTF } from '@react-three/drei';

export const RenderView3D = ({
  fileUrl,
}: {
  fileUrl: string;
}): React.ReactElement => {
  const classes = useView3DStyles();
  const [isLoad, setIsLoad] = useState(false);

  try {
    if (fileUrl) {
      (async () => {
        // 判断资源是否有效
        await fetch(fileUrl);
        useGLTF.preload(fileUrl);
        setIsLoad(true);
      })();
    }
  } catch (error) {}

  return !isLoad ? (
    <></>
  ) : (
    <Canvas className={classes.canvas}>
      <ambientLight intensity={1} />
      <Suspense fallback={<Loader />}>
        <Model position={[0, -4, -12]} fileUrl={fileUrl} />
      </Suspense>
    </Canvas>
  );
};
