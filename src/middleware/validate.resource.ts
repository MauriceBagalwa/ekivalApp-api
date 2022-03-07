export async function validateSchema(schema: any, value: any) {
      return await schema.validateAsync(value);
};