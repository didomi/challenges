import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'ui-library',
  extras: {
    tagNameTransform: true,
    cloneNodeFix: true,
  },
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'ui-library',
      directivesProxyFile: '../ui-library-angular/src/directives/proxies.ts',
    }),
    reactOutputTarget({
      componentCorePackage: 'ui-library',
      proxiesFile: '../ui-library-react/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
