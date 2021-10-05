import { defineCustomElements } from '../dist/esm/loader';
import { loadFontsForStorybook } from './utils/loadFontsForStorybook';


defineCustomElements();
loadFontsForStorybook();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}