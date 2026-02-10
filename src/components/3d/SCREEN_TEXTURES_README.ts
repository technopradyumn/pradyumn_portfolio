// Instructions for adding real screenshots:
// 
// 1. Take screenshots of your actual apps/code
// 2. Save them in: public/images/screens/
//    - phone-screen.png (1080x2340 or similar)
//    - laptop-screen.png (2560x1600 or similar)
//    - emulator-screen.png (1080x2340 or similar)
//
// 3. Update the texture paths in RealisticDevices.tsx:
//    - Use useTexture hook from @react-three/drei
//    - Apply textures to the screen meshes
//
// Example code to add:
// ```tsx
// import { useTexture } from '@react-three/drei';
// 
// const phoneTexture = useTexture('/images/screens/phone-screen.png');
// const laptopTexture = useTexture('/images/screens/laptop-screen.png');
// const emulatorTexture = useTexture('/images/screens/emulator-screen.png');
// 
// // Then in the mesh:
// <meshStandardMaterial map={phoneTexture} />
// ```
//
// For ultra-realistic DSLR quality screenshots:
// - Use 8K resolution if possible
// - Ensure good lighting
// - Use anti-aliasing
// - Save as PNG for transparency support
// - Optimize file size with tools like TinyPNG

export const SCREEN_TEXTURE_GUIDE = {
    phone: {
        path: '/images/screens/phone-screen.png',
        recommendedSize: '1080x2340',
        aspectRatio: '19.5:9'
    },
    laptop: {
        path: '/images/screens/laptop-screen.png',
        recommendedSize: '2560x1600',
        aspectRatio: '16:10'
    },
    emulator: {
        path: '/images/screens/emulator-screen.png',
        recommendedSize: '1080x2340',
        aspectRatio: '19.5:9'
    }
};
