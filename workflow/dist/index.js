import { resolve } from 'node:path';
export const Templates = {
  'main': { type: 'from-file', path: resolve(import.meta.dirname, './tengo/tpl/main.plj.gz') }
};
