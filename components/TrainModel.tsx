import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { Ref } from "react";
import { Mesh, BufferGeometry, Material } from "three";

export const TrainModel = forwardRef(function Information(_, ref) {
  const { nodes, materials } = useGLTF("gltf/wiredTexture.gltf");
  return (
    <>
      <mesh
        ref={ref as Ref<Mesh<BufferGeometry, Material | Material[]>>}
        position={[-1, -1, -10]}
        rotation={[Math.PI / 2, 0, 0]}
        //@ts-ignore
        geometry={nodes.mesh.geometry}
        material={materials["main"]}
      />
    </>
  );
});
