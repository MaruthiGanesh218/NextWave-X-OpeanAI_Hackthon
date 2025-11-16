// Shims for Deno and jsr-style supabase import used in server functions
declare namespace Deno {
  const env: {
    get(key: string): string | undefined;
  };
}

declare module "jsr:@supabase/supabase-js@2.49.8" {
  export function createClient(url?: string | undefined, key?: string | undefined): any;
}
