import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BufferGeometry, Mesh, Material } from "three";
import { Noise, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

//<Mesh<BufferGeometry, Material | Material[]>>

type Props = {
  panelRefs: RefsProp;
  scrollY: MutableRefObject<number>;
};

export default function Scene({ panelRefs, scrollY }: Props) {
  const offset = -9.985; //電車の先端からのカメラ距離
  const trainLength = 18.74; //カメラの移動距離スケールにおける電車の長さ

  const { camera, gl } = useThree();
  const htmlHeading = useRef(0);
  const htmlBack = useRef(0);
  const htmlLastHeading = useRef(0);
  const htmlLastBack = useRef(0);

  const planeHeading = useRef(0);
  const planeBack = useRef(0);
  const planeLastHeading = useRef(0);
  const planeLastBack = useRef(0);
  const trainRef = useRef(null);

  const planeArray = [
    {
      start: 5,
      end: -5,
      ref: useRef<Mesh<BufferGeometry, Material | Material[]>>(null),
      map: useLoader(TextureLoader, "logo.png"),
    },
    {
      start: 5 - trainLength,
      end: -5 - trainLength,
      ref: useRef<Mesh<BufferGeometry, Material | Material[]>>(null),
      map: useLoader(TextureLoader, "about.png"),
    },
    {
      start: 6 - trainLength * 2,
      end: -5 - trainLength * 2,
      ref: useRef<Mesh<BufferGeometry, Material | Material[]>>(null),
      map: useLoader(TextureLoader, "guest.png"),
    },
    {
      start: 6 - trainLength * 3,
      end: -5 - trainLength * 3,
      ref: useRef<Mesh<BufferGeometry, Material | Material[]>>(null),
      map: useLoader(TextureLoader, "performer.png"),
    },
    {
      start: 6 - trainLength * 4,
      end: -5 - trainLength * 4,
      ref: useRef<Mesh<BufferGeometry, Material | Material[]>>(null),
      map: useLoader(TextureLoader, "information.png"),
    },
  ];

  const htmlArray = [
    { start: 15, end: 10, ref: panelRefs.notice },

    {
      start: 3 - trainLength,
      end: -5 - trainLength,
      ref: panelRefs.about,
    },
    {
      start: 5 - trainLength * 2,
      end: 0.5 - trainLength * 2,
      ref: panelRefs.rekko,
    },
    {
      start: 0 - trainLength * 2,
      end: -5 - trainLength * 2,
      ref: panelRefs.motive,
    },
    {
      start: 7 - trainLength * 3,
      end: 2.5 - trainLength * 3,
      ref: panelRefs.ishizuka,
    },
    {
      start: 2 - trainLength * 3,
      end: -3 - trainLength * 3,
      ref: panelRefs.kaki,
    },
    {
      start: -3.5 - trainLength * 3,
      end: -8 - trainLength * 3,
      ref: panelRefs.sagyou2,
    },
    {
      start: 3 - trainLength * 4,
      end: -5 - trainLength * 4,
      ref: panelRefs.info,
    },
  ];

  const handleScroll = () => {
    scrollY.current = window.scrollY;
  };

  const model = useLoader(GLTFLoader, "gltf/wiredTexture.gltf");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  useFrame(() => {
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
      camera.position.z < planeArray[planeHeading.current].start + criteria &&
      camera.position.z > planeArray[planeHeading.current].end
    ) {
      //plane
      //@ts-ignore
      planeArray[planeHeading.current].ref.current?.position.set(
        0,
        0,
        camera.position.z - criteria
      );
    }

    if (
      camera.position.z < htmlArray[htmlHeading.current].start + criteria &&
      camera.position.z > htmlArray[htmlHeading.current].end
    ) {
      //html
      (
        htmlArray[htmlHeading.current].ref.current as HTMLDivElement
      ).style.pointerEvents = "auto";
      (
        htmlArray[htmlHeading.current].ref.current as HTMLDivElement
      ).style.opacity = String(
        Math.min(htmlArray[htmlHeading.current].start - camera.position.z, 1) *
          Math.min(camera.position.z - htmlArray[htmlHeading.current].end, 1)
      );
    }

    planeLastHeading.current = planeHeading.current;
    planeLastBack.current = planeBack.current;
    htmlLastHeading.current = htmlHeading.current;
    htmlLastBack.current = htmlBack.current;

    //plane
    if (camera.position.z < planeArray[planeHeading.current].end - criteria) {
      //正方向からオブジェクトの表示領域を通過した場合
      planeBack.current = planeHeading.current;
      planeHeading.current = Math.min(
        planeHeading.current + 1,
        planeArray.length - 1
      );
    } else if (camera.position.z > planeArray[planeBack.current].end) {
      planeHeading.current = planeBack.current;
      planeBack.current = Math.max(0, planeBack.current - 1);
    }

    if (
      planeHeading.current != planeLastHeading.current ||
      planeBack.current != planeLastBack.current
    ) {
      for (let plane of planeArray) {
        if (camera.position.z < plane.end - criteria) {
          plane.ref.current?.position.set(0, 0, plane.end - criteria);
        } else {
          plane.ref.current?.position.set(0, 0, plane.start);
        }
      }
    }

    //html
    if (camera.position.z < htmlArray[htmlHeading.current].end) {
      //正方向からオブジェクトの表示領域を通過した場合
      htmlBack.current = htmlHeading.current;
      htmlHeading.current = Math.min(
        htmlHeading.current + 1,
        htmlArray.length - 1
      );
    } else if (camera.position.z > htmlArray[htmlBack.current].end) {
      htmlHeading.current = htmlBack.current;
      htmlBack.current = Math.max(0, htmlBack.current - 1);
    }

    if (
      htmlHeading.current !== htmlLastHeading.current ||
      htmlBack.current !== htmlLastBack.current
    ) {
      for (let html of htmlArray) {
        html.ref.current.style.opacity = "0";
        html.ref.current.style.pointerEvents = "none";
      }
    }
  });

  return (
    <>
      <EffectComposer multisampling={0}>
        {/* ... */}
        <Noise blendFunction={BlendFunction.DIVIDE} />
      </EffectComposer>
      {/* <directionalLight position={[0, 1, 0]} intensity={1.5} /> */}
      <ambientLight intensity={0.4} />
      <primitive ref={trainRef} object={model.scene} position={[-1, -1, -10]} />
      {(() => {
        const meshes = [];
        for (let plane of planeArray) {
          meshes.push(
            <mesh ref={plane.ref} position={[0, 0, plane.start]}>
              <planeGeometry />
              <meshStandardMaterial
                alphaMap={plane.map}
                transparent={true}
                color={"red"}
              />
            </mesh>
          );
        }
        return meshes;
      })()}
    </>
  );
}
