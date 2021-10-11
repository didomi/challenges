import renderer from 'react-test-renderer';
import Root from './root.component';

const component = renderer.create(<Root />);
const tree = component.toJSON();

test('Component must mount', () => {
  expect(component).toBeTruthy();
});

test('Title must be present', () => {
  const h1 = tree.children[0];
  expect(h1.type).toEqual('h1');
  expect(h1.children.includes('Sign in')).toBe(true);
});

test('Form must be present', () => {
  const form = tree.children[1];
  expect(form.type).toEqual('form');
});
