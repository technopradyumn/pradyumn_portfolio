import { createContext, useContext, useState, ReactNode } from 'react';

interface FourDModeContextType {
    is4DMode: boolean;
    toggle4DMode: () => void;
    intensity: number;
}

const FourDModeContext = createContext<FourDModeContextType | undefined>(undefined);

export const FourDModeProvider = ({ children }: { children: ReactNode }) => {
    const [is4DMode, setIs4DMode] = useState(false);
    const [intensity, setIntensity] = useState(1);

    const toggle4DMode = () => {
        setIs4DMode(prev => !prev);
    };

    return (
        <FourDModeContext.Provider value={{ is4DMode, toggle4DMode, intensity }}>
            {children}
        </FourDModeContext.Provider>
    );
};

export const useFourDMode = () => {
    const context = useContext(FourDModeContext);
    if (!context) {
        throw new Error('useFourDMode must be used within FourDModeProvider');
    }
    return context;
};
