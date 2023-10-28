import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/pc.glb");
  return (
    <group {...props} dispose={null} rotation={[0, Math.PI / 3, 0]} position={[0, -2, 0]}>
      <group position={[0, 2.194, 0]} scale={[2.592, 2.083, 1]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube001_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube001_2.geometry} material={materials["Material.001"]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube001_3.geometry} material={materials["Material.002"]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube001_4.geometry} material={materials["Material.003"]} />
      </group>
      <pointLight intensity={6961.328} decay={2} position={[-3.307, 4.022, -3.691]} rotation={[-0.811, 0.41, 2.715]} />
      <group position={[-0.694, 2.945, -0.831]} scale={[1.163, 1.031, 0.078]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube_2.geometry} material={materials["Material.004"]} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Cube002.geometry} material={materials.Material} position={[1.485, 0.821, 0.306]} scale={0.651} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.Material}
        position={[2.644, 2.854, -0.004]}
        rotation={[0.004, -0.01, -2.636]}
        scale={0.72}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.Material}
        position={[2.644, 2.411, -0.004]}
        rotation={[0.004, -0.01, -2.636]}
        scale={0.72}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials.Material}
        position={[2.644, 1.952, -0.004]}
        rotation={[0.004, -0.01, -2.636]}
        scale={0.72}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials.Material}
        position={[2.644, 1.505, -0.004]}
        rotation={[0.004, -0.01, -2.636]}
        scale={0.72}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials.Material}
        position={[2.644, 1.058, -0.004]}
        rotation={[0.004, -0.01, -2.636]}
        scale={0.72}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials.Material}
        position={[2.644, 0.614, -0.004]}
        rotation={[0.004, -0.01, -2.636]}
        scale={0.72}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.Material}
        position={[-1.278, 0.821, 0.306]}
        scale={0.651}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials.Material}
        position={[0.184, 0.171, -0.008]}
        scale={[2.33, 1.005, 0.903]}
      />
      <group position={[-1.219, 2.943, -0.47]} scale={[0.651, 0.128, 0.275]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube004_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube004_2.geometry} material={materials["Material.003"]} />
      </group>
      <group position={[-1.219, 2.544, -0.47]} scale={[0.651, 0.128, 0.275]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube005_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube005_2.geometry} material={materials["Material.003"]} />
      </group>
      <group position={[0.143, 2.821, -0.47]} rotation={[0, 0, 1.566]} scale={[0.266, 0.03, 0.064]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube006_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube006_2.geometry} material={materials["Material.003"]} />
      </group>
      <group position={[0.048, 2.821, -0.47]} rotation={[0, 0, 1.566]} scale={[0.266, 0.03, 0.064]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube007_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube007_2.geometry} material={materials["Material.003"]} />
      </group>
      <group position={[-0.061, 2.821, -0.47]} rotation={[0, 0, 1.566]} scale={[0.266, 0.03, 0.064]}>
        <mesh castShadow receiveShadow geometry={nodes.Cube008_1.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Cube008_2.geometry} material={materials["Material.003"]} />
      </group>
      <group position={[1.347, 3.487, -0.741]} rotation={[Math.PI / 2, 0, 0]} scale={0.308}>
        <mesh castShadow receiveShadow geometry={nodes.Cube009.geometry} material={materials["Material.003"]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube009_1.geometry} material={materials.Material} />
      </group>
      <group position={[1.347, 2.538, -0.741]} rotation={[Math.PI / 2, 0, 0]} scale={0.308}>
        <mesh castShadow receiveShadow geometry={nodes.Cube011.geometry} material={materials["Material.003"]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube011_1.geometry} material={materials.Material} />
      </group>
      <group position={[2.102, 3.086, 0.082]} rotation={[Math.PI / 2, 0, 1.564]} scale={0.308}>
        <mesh castShadow receiveShadow geometry={nodes.Cube012.geometry} material={materials["Material.003"]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube012_1.geometry} material={materials.Material} />
      </group>
      <group position={[2.102, 2.137, 0.082]} rotation={[Math.PI / 2, 0, 1.564]} scale={0.308}>
        <mesh castShadow receiveShadow geometry={nodes.Cube013.geometry} material={materials["Material.003"]} />
        <mesh castShadow receiveShadow geometry={nodes.Cube013_1.geometry} material={materials.Material} />
      </group>
      <pointLight intensity={3961.328} decay={2} position={[-3.057, 7.288, 3.929]} rotation={[-0.811, 0.41, 2.715]} />
      <pointLight intensity={3961.328} decay={2} position={[5.841, 6.451, 1.191]} rotation={[-0.811, 0.41, 2.715]} />
    </group>
  );
}

useGLTF.preload("/pc.glb");
