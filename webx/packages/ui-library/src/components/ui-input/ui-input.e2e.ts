import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('ui-input', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<ui-input></ui-input>');

    element = await page.find('ui-input');
  });

  it('should render', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should set input type', async () => {
    element.setAttribute('type', 'email');
    await page.waitForChanges();

    expect(element).toHaveAttribute('type');
  });

  it('should display error', async () => {
    element.setAttribute('error', 'required');
    await page.waitForChanges();

    const errorElement = await page.find('ui-input >>> p');
    expect(errorElement).toHaveClass('ui-input-error-active');
  });

  it('should display email error', async () => {
    element.setAttribute('type', 'email');
    element.setAttribute('error', 'email');
    await page.waitForChanges();

    const errorElement = await page.find('ui-input >>> p');
    expect(errorElement.textContent).toBe('Sorry, email seems wrong');
  });

  it('should trigger event on input', async () => {
    const inputElement = await page.find('ui-input >>> input');
    const event = await inputElement.spyOnEvent('input');

    await inputElement.type('text');

    expect(event).toHaveReceivedEventTimes(4);
  });

  it('should not trigger event on input when disabled', async () => {
    element.setAttribute('disabled', true);
    const inputElement = await page.find('ui-input >>> input');
    const event = await inputElement.spyOnEvent('input');

    await page.waitForChanges();
    await inputElement.type('text');

    expect(event).toHaveReceivedEventTimes(0);
  });
});
