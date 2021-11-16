import {
  useGLTF,
  useAnimations,
  Center,
  OrbitControls,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model(props: any) {
  const { scene, animations } = useGLTF(props.fileUrl);
  const { ref } = useAnimations(animations);
  // const [hoverActive, setHoverActive] = useState(false)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = ref.current.rotation.y + 0.02;
    }
  });

  let fixScale = 0;

  try {
    let bBox = new THREE.Box3().setFromObject(scene);
    // @ts-ignore
    var height = bBox.getSize().y;
    fixScale = 5 / height;
  } catch (error) {
    console.error('render3D error');
  }

  // useEffect(
  //   () => {
  //     // @ts-ignore
  //     var height = bBox.size().y;

  //     fixScale = 5 / height
  //     console.log(height)
  //   },
  //   [bBox],
  // )

  return (
    <>
      <Center
        position={[10, 10, 10]}
        // onPointerEnter={() => {
        //   console.log('enter')
        //   setHoverActive(true)
        // }}
        // onPointerLeave={() => {
        //   console.log('leave')
        //   setHoverActive(false)
        // }}
      >
        {/* <Box args={[10, 10, 10]}> */}
        {/* <meshNormalMaterial attach="material" wireframe /> */}
        {/* </Box> */}
        {/* @ts-ignore */}
        <primitive
          ref={ref}
          object={scene}
          scale={[fixScale, fixScale, fixScale]}
        />
      </Center>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
}
