"use client";
import { OrbitControls, useAnimations, useGLTF, Stars, SpotLight, Plane} from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { gsap } from 'gsap';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

const Light = () => {
  const spotLightRef = useRef<THREE.SpotLight | null>(null!);
  const directLightRef = useRef<THREE.DirectionalLight | null>(null!);
  const { camera } = useThree();
  const planetPosition = new THREE.Vector3(); // 행성의 위치를 저장할 변수

  useFrame(() => {
    if (spotLightRef.current && directLightRef.current) {
      // 카메라와 행성 사이의 거리 계산
      const distanceToPlanet = camera.position.distanceTo(planetPosition);
      directLightRef.current.target.position.copy(new THREE.Vector3(0,0,0));
  
      // 스포트라이트의 X축 위치 계산
      const spotlightX = camera.position.x / distanceToPlanet;
      const spotlightY = camera.position.y / distanceToPlanet;
      const spotlightZ = camera.position.z / distanceToPlanet;
  
      // 스포트라이트 위치 업데이트
      spotLightRef.current.position.x = spotlightX;
      spotLightRef.current.position.y = spotlightY;
      spotLightRef.current.position.z = spotlightZ;
      
      
      directLightRef.current.position.copy(new THREE.Vector3(camera.position.x+2, camera.position.y+2, camera.position.z));
      // 스포트라이트가 행성을 향하도록 설정 (필요한 경우)
      spotLightRef.current.target.position.copy(planetPosition);
    }
  });
  
  return (
    <mesh>
      <SpotLight ref={spotLightRef} color='#00BFFF' angle={Math.PI/2.2}/>
      <directionalLight ref={directLightRef} intensity={90} castShadow />
    </mesh>
  );
}

const EarthlatLongToVector3 = (lat:any,lon:any,radius:any) => {
  const phi = ((lat+ 0.25) * Math.PI) / 180;
  const theta = (((lon-90) - 180) * Math.PI) / 180;
  const x = -(radius * Math.cos(phi) * Math.cos(theta));
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);
  return new THREE.Vector3(x,y,z);
}

interface PinProps {
  lat: number;
  lon: number;
  radius: number;
  country: string;
  year: string;
  color: string;
}

const Earth = () => {
  const model = useGLTF('/earth/scene.gltf');

  return (
    <mesh receiveShadow castShadow>
        <primitive object={model.scene} scale={0.0005} />
    </mesh>
  );
};

const Atmosphere = () => {

  return(
    <mesh receiveShadow castShadow>
        <ambientLight intensity={10}/>
        <sphereGeometry args={[2.16, 64, 64]}/>
        <meshPhongMaterial color='skyblue' opacity={1} transparent side={THREE.BackSide}/>
    </mesh>
  )
}

const Cloud = () => {
  const cloudRef = useRef<THREE.Mesh | null>(null!);
  const cloud = useLoader(THREE.TextureLoader, '/earth/textures/cloud.png');

  useFrame(({clock}) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = clock.getElapsedTime() * 0.008;
    }
  });

  return(
    <mesh ref={cloudRef} renderOrder={0} receiveShadow castShadow>
        <sphereGeometry args={[2.14, 32, 32]}/>
        <meshPhongMaterial map={cloud} transparent opacity={0.9}/>
    </mesh>
  )};

interface DisasterData {
  dLatitude: number;
  dLongitude: number;
  dCountry: string;
  dDate: string;
  dStatus: string;
}  

export const EarthCanvas = () => {
  // 카메라 옮기기
  const [reasetCamera, setResetCamera] = useState(false);
  const [disasterData, setDisasterData] = useState<DisasterData[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const curPath = currentPath.split('/')[1];
    async function getDisaster() {
      try {
        const response = await axios.get('https://worldisaster.com/api/disasters', {timeout: 5000});
        const updatedData = response.data;

        // Filter based on pathname and dStatus
        const filteredData = updatedData.filter((item:any) => {
          if (curPath ==='archive') {
            return item.dStatus !== 'ongoing';
          } else if (curPath === 'live') {
            return item.dStatus === 'ongoing';
          } return false;
        });
    
        setDisasterData(filteredData);
        setIsLoading(false);
        console.log("데이터 가져오기 성공");
      } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
          console.log("타임아웃");
          console.log(error);
        }
        console.log("데이터 가져오기 실패");
        console.log(error);
      }
    }

    if (currentPath.includes("archive") || currentPath.includes("live")) {
      setIsLoading(true);
      getDisaster();
    }
  },[currentPath])
  console.log(disasterData)

  const Pin: React.FC<PinProps> = (props) => {
    const groupRef = useRef<THREE.Group>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);
    const sphereRef = useRef<THREE.Mesh>(null!);
    const plateRef = useRef<THREE.Mesh>(null!);
    const { camera } = useThree();
    const country = props.country;
    const year = props.year.toString().split('-')[0];

    useEffect(() => {
      if (typeof props.radius === 'number') {
        const position = EarthlatLongToVector3(props.lat, props.lon, props.radius);
        if (groupRef.current) {
          groupRef.current.position.copy(position);
          groupRef.current.lookAt(new THREE.Vector3(0,0,0));
        }
        if (meshRef.current) {
          meshRef.current.rotation.x = 0.2;
          meshRef.current.rotation.y = 1.54;
          meshRef.current.rotation.z = 1.38; 
        }
        if (sphereRef.current) {
          sphereRef.current.position.x = 0;
          sphereRef.current.position.y = 0;
          sphereRef.current.position.z = -0.12; 
        }
      }
    }, [props.lat, props.lon, props.radius]);
  
    useEffect(() => {
      if (plateRef.current) {
        plateRef.current.rotation.x = 3.14;
      }
    })
  
    const onPinClick = () => {
      if (country && year) {
        zoomInToLocation(props.lat, props.lon, router);
      } else {
        console.error("Country or year is undefined");
      }
    };
  
  const zoomInToLocation = (lat:number|string, lon:number|string, router:any) => {
    // 클릭한 지점으로 이동할 카메라 위치 계산
    const intermediatePosition = EarthlatLongToVector3(lat, lon, 5); // 예시 값, 지구 표면에서 높은 위치
    // 최종 목적지 위치 계산
    const finalPosition = EarthlatLongToVector3(lat, lon, 2.3); // 지구 표면에서 약간 떨어진 위치
  
    // 클릭한 지점으로 빠르게 이동
    gsap.to(camera.position, {
      x: intermediatePosition.x,
      y: intermediatePosition.y,
      z: intermediatePosition.z,
      duration: 0.6, // 빠른 이동
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(new THREE.Vector3(0, 0, 0)),
      onComplete: () => {
        // 천천히 최종 목적지로 줌인
        gsap.to(camera.position, {
          x: finalPosition.x,
          y: finalPosition.y,
          z: finalPosition.z,
          duration: 1.5, // 천천히 이동
          ease: "power2.inOut",
          onUpdate: () => camera.lookAt(new THREE.Vector3(0, 0, 0)),
          onComplete: () => {
            try{
              router.push(`detail1/${country}`);
            } catch (error) {
              console.log("이동실패", error);
              setTimeout(() => {
                gsap.to(camera.position, {
                  x: intermediatePosition.x,
                  y: intermediatePosition.y,
                  z: intermediatePosition.z,
                  duration: 1.5, // 천천히 이동
                });
            }, 1000);
          }
        }
      });
    }});
  };
  
  return (
    <group ref={groupRef}>
      {/* 몸통 */}
      <mesh ref={meshRef} onClick={onPinClick}>
        <coneGeometry args={[0.05, 0.15]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {/* 머리 */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.04]}/>
        <meshBasicMaterial 
          color={props.color}
        />
      </mesh>
    </group>
  );
  };

  return (
    <>
    {isLoading? <div className='flex items-center justify-center z-2 w-[100vw] h-[100vh]'>Loading...</div>:
      <Canvas>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0.5}
          maxPolarAngle={2}
          minDistance={2.7} 
          maxDistance={5}

        />
        <Light />
        <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={7} 
        saturation={0}
        fade={true}/>
        <Earth />
        <Cloud />
        <Atmosphere />
        {disasterData.map((data, index) => {
          if (data.dLatitude !== undefined && data.dLongitude !== undefined && data.dCountry!==undefined && data.dDate!==undefined){
          return(
            <Pin 
              key={index} 
              lat={data.dLatitude} 
              lon={data.dLongitude} 
              radius={2.2} 
              country={data.dCountry} 
              year={data.dDate}
              color={currentPath.includes("archive")? "blue" : "green"} />
          )}
        })}
      </Canvas>
      }
    </>
  )
}

export default EarthCanvas;