import { newSpecPage } from '@stencil/core/testing';
import { UiInput } from './ui-input';

describe('ui-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiInput],
      html: `<ui-input></ui-input>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-input>
    `);
  });
});
