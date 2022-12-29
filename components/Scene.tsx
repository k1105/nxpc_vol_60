import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { RefObject } from "react";

type Props = {
  noticePanel: RefObject<HTMLDivElement>;
};

export default function Scene({ noticePanel }: Props) {
  const { camera, gl } = useThree();
  const scrollY = useRef(0);
  const trainRef = useRef(null);
  const planeRef = useRef(null);
  const initialPlanePosition = 3;
  const endPlanePosition = -5;
  let closeState = false;

  const offset = -9.985; //電車の先端からのカメラ距離
  const trainLength = 18.74; //カメラの移動距離スケールにおける電車の長さ

  const handleScroll = () => {
    scrollY.current = window.scrollY;
  };

  const logoMap = useLoader(TextureLoader, "logo_1024x1024.png");
  const alphaMap = useLoader(TextureLoader, "logo_1024x1024_alpha.png");

  const model = useLoader(GLTFLoader, "gltf/wiredTexture.gltf");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  useFrame((_, delta) => {
    camera.position.z = -scrollY.current / window.innerHeight + 12;

    //スクロールで前に進みます。の画面をハンドリングする

    if (noticePanel.current) {
      noticePanel.current.style.opacity = String(
        Math.max(0, camera.position.z - 10)
      );
    }

    const step = Math.abs(
      Math.floor((camera.position.z + offset) / trainLength)
    );
    const criteria = window.innerWidth > 1000 ? 0.8 : 1.5;
    //@ts-ignore
    trainRef.current.position.set(
      -1,
      -1,
      -(Math.max(step - 1, 0) * trainLength)
    );
    // trainRef.current.position.set(-1, -1, 0);
    if (
      camera.position.z < initialPlanePosition + criteria &&
      camera.position.z > endPlanePosition
    ) {
      closeState = true;
    } else {
      closeState = false;
    }

    if (closeState) {
      //@ts-ignore
      planeRef.current?.position.set(0, 0, camera.position.z - criteria);
    }

    if (
      //@ts-ignore
      planeRef.current?.position.z > initialPlanePosition
    ) {
      //@ts-ignore
      planeRef.current?.position.set(0, 0, initialPlanePosition);
    }
    if (
      //@ts-ignore
      planeRef.current?.position.z < endPlanePosition
    ) {
      //@ts-ignore
      planeRef.current?.position.set(0, 0, endPlanePosition);
    }
  });

  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <primitive ref={trainRef} object={model.scene} position={[-1, -1, -10]} />
      <mesh ref={planeRef} position={[0, 0, initialPlanePosition]}>
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"blue"}
        />
      </mesh>
      <mesh position={[0, 0, initialPlanePosition - 5]}>
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"blue"}
        />
      </mesh>
    </>
  );
}
