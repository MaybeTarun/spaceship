import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import '../index.css';

interface LoaderProps {
  counter: number;
}

const loader: React.FC<LoaderProps> = ({ counter }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(counter);
  }, [counter]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black flex items-end justify-end px-4 md:px-20 text-[#bcbcc4]"
      initial={{ opacity: 1 }}
      animate={{ opacity: counter === 100 ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-[6rem] md:text-[16rem] font1">
        <p className="counter">{currentValue}</p>
      </div>
    </motion.div>
  );
};

export default loader;
