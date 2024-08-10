import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./Iphone";
import { useState, Suspense } from "react";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  return (
    <View
      index={index}
      id={gsapType}
      // className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""} ${isGrabbing ? "cursor-grabbing" : "cursor-grab"} overflow-hidden`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        // maxPolarAngle={Math.PI / 2} // Set both maxPolarAngle and minPolarAngle to the same value
        // minPolarAngle={Math.PI / 2} // This will disable vertical rotation
        // onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        onStart={() => setIsGrabbing(true)}
        onEnd={() => {
          setIsGrabbing(false);
          setRotationState(controlRef.current.getAzimuthalAngle());
        }}
      />
      <group ref={groupRef} name={`${index === 1 ? "small" : "large"}`} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone
            key={`${item.color[0]}-${size}`}
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;