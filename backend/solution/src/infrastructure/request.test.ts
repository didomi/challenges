import Request from './request';

class Test extends Request {
  attr: string;
}

describe('Request', () => {
  describe('ctor', () => {
    describe('empty', () => {
      let request: Test;

      beforeAll(() => {
        request = new Test();
      });

      it('instantiates new instance', () => {
        expect(request).toBeInstanceOf(Test);
      });
    });

    describe('parameterized', () => {
      let request: Test;

      beforeAll(() => {
        request = new Test({ attr: 'foo-bar' });
      });

      it('instantiates new instance', () => {
        expect(request).toBeInstanceOf(Test);
      });

      it('sets attributes', () => {
        expect(request.attr).toBe('foo-bar');
      });
    });
  });
});
