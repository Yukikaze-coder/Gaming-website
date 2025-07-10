import { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';


function CustomCursor({ isHovering3D }) {
    const [position, setPosition] = useState({ x: 0, y: 0})
    const [isMobile, setIsMobile] = useState(false)
    const cursorRef = useRef(null)

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e) => {
            if (!isMobile) {
                setPosition({ x: e.clientX, y: e.clientY });
            }
        };

        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', checkMobile);
        }
    }, [isMobile]);

    // Don't render cursor on mobile
    if (isMobile) return null;

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 z-30 pointer-events-none mix-blend-difference"
            animate={{
                x: position.x - (isHovering3D ? 12 : 15),
                y: position.y - (isHovering3D ? 12 : 15),
                scale: isHovering3D ? 1.5 : 1,
            }}
            transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 28, 
                mass: 0.5
            }}
            >

                <motion.div className={`rounded-full ${isHovering3D ? "bg-violet-500" : "bg-white"}`}
                animate={{
                    width: isHovering3D ? "24px" : "40px",
                    height: isHovering3D ? "24px" : "40px",
                }}
                transition={{ duration: 0.2 }} 
                />
                {isHovering3D && (
                    <motion.div className="absolute inset-0 rounded-full bg-transparent border border-violet-500"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0.5 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                )}

        </motion.div>
    );
}


const Characters = () => {

const [selectedAvatar, setSelectedAvatar] = useState("VIKI");
const [cursorInModelArea, setCursorInModelArea] = useState(false);
const [isMobile, setIsMobile] = useState(false);

// Debug logging
useEffect(() => {
    console.log("Selected avatar changed to:", selectedAvatar);
}, [selectedAvatar]);

// Check for mobile device
useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
        window.removeEventListener('resize', checkMobile);
    };
}, []);

const Avatar = {
    VIKI: {
        name: "VIKI",
        power: 75,
        stable:95,
        penetrate: 30,
        portable: 80,
        starts: 3
    },
    EVA: {
        name: "EVA",
        power: 90,
        stable: 80,
        penetrate: 70,
        portable: 60,
        starts: 4
    }
}

const currentAvatar = Avatar[selectedAvatar];

const handle3DAreaMouseEnter = () => {
    setCursorInModelArea(true);
}
const handle3DAreaMouseLeave = () => {
    setCursorInModelArea(false);
}

  return (
    <div className="relative w-full h-screen overflow-hidden mb-[10%]">

       <CustomCursor isHovering3D={cursorInModelArea} />

        {/* Section title */}
        <div className="relative z-10 pt-6 text-center">
            <h1 className="text-5xl font-bold tracking-widest md:-mb-14 mb-8" style={{textShadow: "0 0 10px rgba(255, 255, 255, 0.7)"}}>
                FIGHTERS
            </h1>
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex md:flex-row flex-col items-center w-full h-full p-4">
   
        {/* Left side  */}
        <div className="w-full md:w-2/4 flex flex-col md:ml-10">

        {/* Selected Avatar info card */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 mb-4 border-gray-800 shadow-[0_0_15px_rgba(167, 139, 250, 0.2)]">
        <h1 className="text-2xl font-semibold mb-2">
            {currentAvatar.name}
        </h1>

        {/* Avatar statistics */}
        <div className="space-y-3 mb-16">

            {/* Power stat */}
            <div className="flex items-center">
                <span className="w-24 text-gray-400">
                    Power
                </span>

                <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-white" style={{ width: `${currentAvatar.power}%` }}>

                    </div>

                </div>
                <span className="ml-2">
                    {currentAvatar.power}
                </span>
            </div>

            {/* Stable stat */}
            <div className="flex items-center">
                <span className="w-24 text-gray-400">
                    Stable
                </span>

                <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-white" style={{ width: `${currentAvatar.stable}%` }}>

                    </div>

                </div>
                <span className="ml-2">
                    {currentAvatar.stable}
                </span>
            </div>

            {/* Penetrate stat */}
            <div className="flex items-center">
                <span className="w-24 text-gray-400">
                    Penetrate
                </span>

                <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-white" style={{ width: `${currentAvatar.penetrate}%` }}>

                    </div>

                </div>
                <span className="ml-2">
                    {currentAvatar.penetrate}
                </span>
            </div>

            {/* Portable stat */}
            <div className="flex items-center">
                <span className="w-24 text-gray-400">
                    Portable
                </span>

                <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-white" style={{ width: `${currentAvatar.portable}%` }}>

                    </div>
                </div>
                <span className="ml-2">
                    {currentAvatar.portable}
                </span>
            </div>

        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
            <button className="px-4 py-1 bg-violet-900 text-white rounded-md font-semibold hover:opacity-70 transition-all duration-300">
                Proficient
            </button>

            <button className="px-4 py-1 bg-violet-900 text-white rounded-md font-semibold hover:opacity-70 transition-all duration-300">
                Redemption
            </button>
        </div>
    </div>

        {/* Avatar selecttion cards */}
        <div className="grid grid-cols-2 gap-4">

            {/* VIKI card */}
            <div className="relative bg-gray-900/70 backdrop-blur-sm rounded-lg p-3 border flex lg:flex-row flex-col justify-between px-12 items-center cursor-pointer transition-all duration-300"
                 onClick={() => {
                     console.log("VIKI clicked");
                     setSelectedAvatar("VIKI");
                 }}>
                <div className="text-lg mb-2">
                    VIKI
                </div>

                {/* Avatar visual placeholder */}
                <div className="w-20 h-20 bg-gray-800/50 rounded-md flex items-center justify-center mb-2">
                    <img src="/images/VIKI.png" alt="VIKI-IMG" />
                </div>

                {/* Stats rating */}
                <div className="flex">
                    {[...Array(3)].map((_, index) => <Star key={index} className="w-4 h-4 fill-violet-400 text-violet-500" />)}
                </div>

                {/* Highlight for selected avatar */}
                {selectedAvatar === "VIKI" && (
                    <div className="absolute inset-0 border-2 rounded-lg pointer-events-none">
                    </div>
                )}

            </div>

             {/* EVA card */}
            <div className="relative bg-gray-900/70 backdrop-blur-sm rounded-lg p-3 border flex lg:flex-row flex-col justify-between px-12 items-center cursor-pointer transition-all duration-300"
                 onClick={() => {
                     console.log("EVA clicked");
                     setSelectedAvatar("EVA");
                 }}>
                <div className="text-lg mb-2">
                    EVA
                </div>

                {/* Avatar visual placeholder */}
                <div className="w-20 h-20 bg-gray-800/50 rounded-md flex items-center justify-center mb-2">
                    <img src="/images/EVA.png" alt="EVA-IMG" />
                </div>

                {/* Stats rating */}
                <div className="flex">
                    {[...Array(4)].map((_, index) => <Star key={index} className="w-4 h-4 fill-violet-400 text-violet-500" />)}
                </div>

                {/* Highlight for selected avatar */}
                {selectedAvatar === "EVA" && (
                    <div className="absolute inset-0 border-2 rounded-lg pointer-events-none">
                    </div>
                )}

            </div>

        </div>

    </div>

    {/* Right side 3D model */}
    <div className={`relative md:w-2/4 w-full md:h-full h-80 flex items-center justify-between overflow-hidden ${isMobile ? '' : 'cursor-none'}`}
         onMouseEnter={!isMobile ? handle3DAreaMouseEnter : undefined}
         onMouseLeave={!isMobile ? handle3DAreaMouseLeave : undefined}
    >

    <AnimatePresence mode="wait">
    {selectedAvatar === "VIKI" ? (
                <motion.div
                    key="VIKI"
                    className='absolute inset-0'
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5 }}
                >
                     <Spline scene="https://prod.spline.design/jqeEHZ6nwWiqVNr5/scene.splinecode" />
                </motion.div>
    ) : (
                <motion.div
                    key="EVA"
                    className='absolute inset-0'
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5 }}
                >
                    <Spline scene="https://prod.spline.design/Fr2mW2-3DEejbmSf/scene.splinecode" />
                </motion.div>
    )}
    </AnimatePresence>

    </div>

    </div>

        

    </div>
  )
}

export default Characters