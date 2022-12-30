import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { RefObject } from "react";
import { BufferGeometry, Mesh, Material } from "three";
import {
  Noise,
  Glitch,
  Vignette,
  EffectComposer,
} from "@react-three/postprocessing";

//<Mesh<BufferGeometry, Material | Material[]>>

type Props = {
  panelRefs: RefsProp;
};

export default function Scene({ panelRefs }: Props) {
  const offset = -9.985; //電車の先端からのカメラ距離
  const trainLength = 18.74; //カメラの移動距離スケールにおける電車の長さ

  const { camera, gl } = useThree();
  const scrollY = useRef(0);
  const heading = useRef(0);
  const back = useRef(0);
  const trainRef = useRef(null);

  const logoRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

  const trackRangeArray = [
    { start: 15, end: 7, ref: panelRefs.notice, type: "html" },
    { start: 3, end: -5, ref: logoRef, type: "plane" },
    {
      start: 3 - trainLength,
      end: -5 - trainLength,
      ref: panelRefs.about,
      type: "html",
    },
    {
      start: 5 - trainLength * 2,
      end: 0.5 - trainLength * 2,
      ref: panelRefs.rekko,
      type: "html",
    },
    {
      start: 0 - trainLength * 2,
      end: -5 - trainLength * 2,
      ref: panelRefs.motive,
      type: "html",
    },
    {
      start: 7 - trainLength * 3,
      end: 2.5 - trainLength * 3,
      ref: panelRefs.ishizuka,
      type: "html",
    },
    {
      start: 2 - trainLength * 3,
      end: -3 - trainLength * 3,
      ref: panelRefs.kaki,
      type: "html",
    },
    {
      start: -3.5 - trainLength * 3,
      end: -8 - trainLength * 3,
      ref: panelRefs.sagyou2,
      type: "html",
    },
    {
      start: 3 - trainLength * 4,
      end: -5 - trainLength * 4,
      ref: panelRefs.info,
      type: "html",
    },
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

    // if (noticePanel.current) {
    //   noticePanel.current.style.opacity = String(
    //     Math.max(0, camera.position.z - 10)
    //   );
    // }

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
      if (trackRangeArray[heading.current].type == "plane") {
        //@ts-ignore
        trackRangeArray[heading.current].ref.current?.position.set(
          0,
          0,
          camera.position.z - criteria
        );
      } else {
        //type: html
        (
          trackRangeArray[heading.current].ref.current as HTMLDivElement
        ).style.pointerEvents = "auto";
        (
          trackRangeArray[heading.current].ref.current as HTMLDivElement
        ).style.opacity = String(
          Math.min(
            trackRangeArray[heading.current].start - camera.position.z,
            1
          ) *
            Math.min(
              camera.position.z - trackRangeArray[heading.current].end,
              1
            )
        );
      }
    }

    if (camera.position.z < trackRangeArray[heading.current].end) {
      //正方向からオブジェクトの表示領域を通過した場合
      back.current = heading.current;
      heading.current = Math.min(
        heading.current + 1,
        trackRangeArray.length - 1
      );
      if (trackRangeArray[back.current].type == "html") {
        (
          trackRangeArray[back.current].ref.current as HTMLDivElement
        ).style.opacity = "0";
        (
          trackRangeArray[back.current].ref.current as HTMLDivElement
        ).style.pointerEvents = "none";
      }
    } else if (camera.position.z > trackRangeArray[back.current].end) {
      heading.current = back.current;
      back.current = Math.max(0, back.current - 1);
    }
  });

  return (
    <>
      <EffectComposer multisampling={1}>
        {/* ... */}
        <Noise />
      </EffectComposer>
      {/* <directionalLight position={[0, 1, 0]} intensity={1.5} /> */}
      <ambientLight intensity={1} />
      <primitive ref={trainRef} object={model.scene} position={[-1, -1, -10]} />
      <mesh
        ref={
          trackRangeArray[1].ref as RefObject<Mesh<BufferGeometry, Material>>
        }
        position={[0, 0, trackRangeArray[1].start]}
      >
        <planeGeometry />
        <meshStandardMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={"black"}
        />
      </mesh>
    </>
  );
}
