import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
}

export const useIntersectionObserver = (
    options: IntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [options.threshold, options.root, options.rootMargin]);

    return [ref, isIntersecting];
};
