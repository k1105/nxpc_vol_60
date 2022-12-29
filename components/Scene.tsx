import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { RefObject } from "react";

type Props = {
  noticePanel: RefObject<HTMLDivElement>;
};

export default function Scene({ noticePanel }: Props) {
  const offset = -9.985; //電車の先端からのカメラ距離
  const trainLength = 18.74; //カメラの移動距離スケールにおける電車の長さ

  const { camera, gl } = useThree();
  const scrollY = useRef(0);
  const heading = useRef(0);
  const back = useRef(0);
  const trainRef = useRef(null);

  const logoRef = useRef(null);
  const logo2Ref = useRef(null);
  const logo3Ref = useRef(null);
  const logo4Ref = useRef(null);
  const logo5Ref = useRef(null);

  const trackRangeArray = [
    { start: 3, end: -5, ref: logoRef },
    { start: 3 - trainLength, end: -5 - trainLength, ref: logo2Ref },
    { start: 3 - trainLength * 2, end: -5 - trainLength * 2, ref: logo3Ref },
    { start: 3 - trainLength * 3, end: -5 - trainLength * 3, ref: logo4Ref },
    { start: 3 - trainLength * 4, end: -5 - trainLength * 4, ref: logo5Ref },
  ];

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
    ); //車両をワープさせる
    if (
      camera.position.z < trackRangeArray[heading.current].start + criteria &&
      camera.position.z > trackRangeArray[heading.current].end
    ) {
      //@ts-ignore
      trackRangeArray[heading.current].ref.current?.position.set(
        0,
        0,
        camera.position.z - criteria
      );
    }

    if (camera.position.z < trackRangeArray[heading.current].end) {
      back.current = heading.current;
      heading.current = Math.min(
        heading.current + 1,
        trackRangeArray.length - 1
      );
    } else if (camera.position.z > trackRangeArray[back.current].end) {
      heading.current = back.current;
      back.current = Math.max(0, back.current - 1);
    }
  });

  return (
    <>
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <primitive ref={trainRef} object={model.scene} position={[-1, -1, -10]} />

      <mesh
        ref={trackRangeArray[0].ref}
        position={[0, 0, trackRangeArray[0].start]}
      >
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"blue"}
        />
      </mesh>
      <mesh
        ref={trackRangeArray[1].ref}
        position={[0, 0, trackRangeArray[1].start]}
      >
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"blue"}
        />
      </mesh>
      <mesh
        ref={trackRangeArray[2].ref}
        position={[0, 0, trackRangeArray[2].start]}
      >
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"blue"}
        />
      </mesh>
      <mesh
        ref={trackRangeArray[3].ref}
        position={[0, 0, trackRangeArray[3].start]}
      >
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
