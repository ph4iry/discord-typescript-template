export class ConstantRequiredError extends Error {
  property: string;

  constructor(property: string) {
    super(`There is a missing constant that needs to be declared: ${property}\nTip: Add the property "${property}" to your .env file and try again.`);
    this.name = 'ConstantRequiredError';
    this.property = property;
  }

  static validate(...data: {
    name: string,
    data: string | undefined,
  }[]) {
    for (const item of data) {
      if (typeof item.data !== 'string') {
        throw new ConstantRequiredError(item.name);
      }
    }
  }
}

