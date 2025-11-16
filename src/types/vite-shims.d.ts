// Minimal shims for editor diagnostics regarding Vite / plugin / Node path.
// These are type fallbacks only — when you run `npm install` the real types will be used.

declare module 'vite' {
  export function defineConfig(config: any): any;
  const anyExport: any;
  export default anyExport;
}

declare module '@vitejs/plugin-react-swc' {
  const swcPlugin: any;
  export default swcPlugin;
}

declare module 'path' {
  export function join(...paths: any[]): string;
  export const dirname: (p: string) => string;
  const anyPath: any;
  export default anyPath;
}

// Some configs use __dirname — declare it to avoid editor errors in TS files.
declare const __dirname: string;
