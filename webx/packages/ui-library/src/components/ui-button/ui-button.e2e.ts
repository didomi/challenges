import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('ui-button', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<ui-button></ui-button>');

    element = await page.find('ui-button');
  });

  it('should render', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should have default type', async () => {
    const buttonElement = await page.find('ui-button button');
    expect(buttonElement).toHaveAttribute('type');
  });

  it('should trigger event on click', async () => {
    const buttonElement = await page.find('ui-button button');
    const event = await buttonElement.spyOnEvent('click');

    await buttonElement.click();

    expect(event).toHaveReceivedEvent();
  });

  it('should not trigger event on click when disabled', async () => {
    const buttonElement = await page.find('ui-button button');
    const event = await buttonElement.spyOnEvent('click');

    element.setAttribute('disabled', true);

    await page.waitForChanges();
    await buttonElement.click();

    expect(event).toHaveReceivedEventTimes(0);
  });
});
