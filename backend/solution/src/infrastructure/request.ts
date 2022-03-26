// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Request {
  constructor(attributes?: { [name: string]: unknown }) {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        (this as Record<string, unknown>)[key] = value;
      }
    }
  }
}

export default Request;
