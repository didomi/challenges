var schema = {
  type: "object",
  properties: {
    consents: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number",
            unique: true,
            minimum: 1,
          },
          name: {
            type: "string",
            faker: "name.name",
          },
          email: {
            type: "string",
            faker: "internet.email",
          },
          consent: {
            type: "array",
            minItems: 1,
            maxItems: 3,
            items: [{ type: "string" }, { type: "string" }, { type: "string" }],
          },
        },
        required: ["consent", "type", "name", "email"],
      },
    },
  },
  required: ["consents"],
};

module.exports = schema;
