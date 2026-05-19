import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const modes: { value: 'light' | 'dark' | 'system'; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={14} />, label: 'Light' },
    { value: 'dark', icon: <Moon size={14} />, label: 'Dark' },
    { value: 'system', icon: <Monitor size={14} />, label: 'System' },
  ];

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme selector">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setTheme(mode.value)}
          className={theme === mode.value ? 'active' : ''}
          aria-label={mode.label}
          title={mode.label}
          role="radio"
          aria-checked={theme === mode.value}
        >
          {mode.icon}
        </button>
      ))}
    </div>
  );
};
