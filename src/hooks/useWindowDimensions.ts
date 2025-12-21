import { useState, useEffect } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

export const useWindowDimensions = (): WindowDimensions => {
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return dimensions;
};

export const useIsMobile = (breakpoint: number = 1024): boolean => {
    const { width } = useWindowDimensions();
    return width <= breakpoint;
};
