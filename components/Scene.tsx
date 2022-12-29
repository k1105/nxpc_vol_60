import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function Scene() {
  const { camera, gl } = useThree();
  const scrollY = useRef(0);
  const trainRef = useRef(null);
  const planeRef = useRef(null);
  let closeState = false;

  const offset = -9.985; //電車の先端からのカメラ距離
  const trainLength = 18.74; //カメラの移動距離スケールにおける電車の長さ

  const handleScroll = () => {
    scrollY.current = window.scrollY;
  };

  const logoMap = useLoader(TextureLoader, "logo_1024x1024.png");
  const alphaMap = useLoader(TextureLoader, "logo_1024x1024_alpha.png");
  console.log(alphaMap);

  const model = useLoader(GLTFLoader, "gltf/wiredTexture.gltf");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  useFrame((_, delta) => {
    camera.position.z = -scrollY.current / window.innerHeight + 7;
    const step = Math.abs(
      Math.floor((camera.position.z + offset) / trainLength)
    );
    const criteria = window.innerWidth > 1000 ? 0.8 : 1.5;
    //@ts-ignore
    trainRef.current.position.set(-1, -1, -((step - 1) * trainLength));
    // trainRef.current.position.set(-1, -1, 0);
    //@ts-ignore
    if (Math.abs(planeRef.current?.position.z - camera.position.z) < criteria) {
      closeState = true;
    }
    if (closeState) {
      //@ts-ignore
      planeRef.current?.position.set(0, 0, camera.position.z - criteria);
    }
  });

  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <primitive ref={trainRef} object={model.scene} position={[-1, -1, -10]} />
      <Text fontSize={0.07} color={0xffffff} position={[0, 0, -8]}>
        Performer
      </Text>
      <Text fontSize={0.07} color={0xffffff} position={[0, 0, -9]}>
        Schedule
      </Text>
      <Text fontSize={0.07} color={0xffffff} position={[0, 0, -6]}>
        JACKSON Kaki
      </Text>
      <Text fontSize={0.07} color={0xffffff} position={[0, 0, -7]}>
        DJ MOTIVE
      </Text>
      <mesh ref={planeRef} position={[0, 0, -5]}>
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"white"}
        />
      </mesh>
    </>
  );
}
