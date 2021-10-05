import { defineCustomElements } from 'ui-library';

export * from './components';

const setUpUILibrary = async (): Promise<void> => {
  await defineCustomElements(window);
}
export { setUpUILibrary };
