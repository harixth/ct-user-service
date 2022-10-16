export default {
  type: "object",
  properties: {
    userId: { type: "string" },
    name: { type: "string" },
  },
  required: ["userId"],
} as const;
