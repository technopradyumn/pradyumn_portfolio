import { useState } from 'react';
import { useFourDMode } from '@/contexts/FourDModeContext';
import './FourDToggleButton.css';

export const FourDToggleButton = () => {
    const { is4DMode, toggle4DMode } = useFourDMode();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={`four-d-toggle ${is4DMode ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
            onClick={toggle4DMode}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Toggle 4D Mode"
        >
            <div className="button-background">
                <div className="dimension-rings">
                    <div className="ring ring-1"></div>
                    <div className="ring ring-2"></div>
                    <div className="ring ring-3"></div>
                    <div className="ring ring-4"></div>
                </div>
                <div className="particle-field">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            '--delay': `${i * 0.1}s`,
                            '--angle': `${(i * 360) / 20}deg`,
                        } as React.CSSProperties}></div>
                    ))}
                </div>
            </div>

            <div className="button-content">
                <div className="dimension-icon">
                    <div className="cube-3d">
                        <div className="cube-face front"></div>
                        <div className="cube-face back"></div>
                        <div className="cube-face left"></div>
                        <div className="cube-face right"></div>
                        <div className="cube-face top"></div>
                        <div className="cube-face bottom"></div>
                    </div>
                    <div className="hypercube-overlay"></div>
                </div>

                <div className="button-text">
                    <span className="dimension-label">
                        {is4DMode ? '4D' : '3D'}
                    </span>
                    <span className="mode-text">
                        {is4DMode ? 'HYPERSPACE' : 'NORMAL'}
                    </span>
                </div>
            </div>

            <div className="energy-pulse"></div>
            <div className="holographic-overlay"></div>
        </button>
    );
};
