import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useState, useEffect, Suspense } from 'react';
import Loader from './components/loader';

function useScreenSize() {
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newScale = Math.max(0.3, Math.min(0.5, width / 2560));
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return scale;
}

function Model({ onLoad, scale }: { onLoad: () => void; scale: number }) {
  const { scene } = useGLTF('./src/assets/models/spaceship.glb', true);
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return <primitive object={scene} scale={scale} position={[0, -1, 0]} />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const scale = useScreenSize();

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev < 100) {
            return prev + 1;
          }
          clearInterval(interval);
          return 100;
        });
      }, 30);
    }
  }, [loading]);

  const handleModelLoad = () => {
    setCounter(100);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader counter={counter} />}
      <div className="h-dvh w-dvw bg-[#090a0f] relative">
        <Canvas camera={{ position: [-1, 1, 3], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]} />
            <Model onLoad={handleModelLoad} scale={scale} />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
      <div className='h-fit w-fit bg-transparent absolute top-0 left-0 p-4 text-white text-3xl md:text-4xl font2'>SpaceShip</div>
    </>
  );
}

export default App;
