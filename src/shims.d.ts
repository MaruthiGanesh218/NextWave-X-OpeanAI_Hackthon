// Temporary shims to avoid TypeScript errors when type packages are not installed in this environment.
// These are safe no-op declarations — when you run locally with npm installed these will be overridden
// by real type definitions from @types/* or package-provided types.

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  // Allow library-managed attributes (like React's `key` and `ref`) to be used
  // without strict mapping to component props in this shim environment.
  interface LibraryManagedAttributes<C, P> {
    [key: string]: any;
  }
}

declare module 'recharts';
declare module 'lucide-react';
declare module 'motion/react';
declare module '@jsr/supabase__supabase-js';

declare module 'react' {
  export type ReactNode = any;
  export function useState<T = any>(initial?: T): [T, (v: any) => void];
  export function useEffect(...args: any[]): void;
  export function createElement(...args: any[]): any;
  export const Fragment: any;
  const ReactDefault: any;
  export default ReactDefault;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}

declare module 'react-dom' {
  export function render(...args: any[]): any;
  export const hydrate: any;
  const ReactDOMDefault: any;
  export default ReactDOMDefault;
}

// Minimal React namespace to stop missing type diagnostics in editor environments
declare namespace React {
  type ReactNode = any;
  type FC<P = {}> = (props: P & { children?: ReactNode }) => any;
  type ComponentType<P = {}> = FC<P> | ((props: P) => any);
  interface ChangeEvent<T = any> { target: any; }
  interface MouseEvent<T = any> { currentTarget: any; }
  interface CSSProperties { [key: string]: any }
  function useState<T = any>(initial?: T): [T, (v: any) => void];
  function useEffect(...args: any[]): void;
  function createElement(...args: any[]): any;
}
