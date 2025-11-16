// Minimal react shims to quiet editor diagnostics until dev dependencies are installed.
declare module 'react' {
  export function useState<T>(initial?: T): [T, (v: any) => void];
  export function useEffect(...args: any[]): void;
  export function useRef<T = any>(initial?: T | null): { current: T | null };
  export function createElement(...args: any[]): any;
}

declare module 'leaflet' {
  const L: any;
  export default L;
}

// Minimal global L namespace so files referencing L.Map/L.TileLayer types compile
declare namespace L {
  interface Map { remove(): void }
  interface TileLayer { }
}
