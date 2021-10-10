import { newE2EPage } from '@stencil/core/testing';

describe('ui-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-input></ui-input>');

    const element = await page.find('ui-input');
    expect(element).toHaveClass('hydrated');
  });
});
