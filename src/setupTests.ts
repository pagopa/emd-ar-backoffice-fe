import '@testing-library/jest-dom';

if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
}


if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
    class ResizeObserverMock {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    // @ts-expect-error - polyfill minimale per jsdom
    window.ResizeObserver = ResizeObserverMock;
}