/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line import/no-anonymous-default-export
export default (requestType: Function) => {
  return (ctor: Function): void => {
    ctor.prototype.__REQUEST_TYPE__ = requestType.prototype.constructor.name;
  };
};
