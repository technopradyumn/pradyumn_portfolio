import { Mobile3D } from './Mobile3D';

export const HeroPhone = () => {
    return (
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-[50vh] md:h-full z-50 pointer-events-none opacity-50 md:opacity-100">
            <div className="relative w-full h-full">
                <Mobile3D />
            </div>
        </div>
    );
};