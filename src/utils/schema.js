import {schema} from 'normalizr';
const categoriesSchema = new schema.Entity('categories');
const productsSchema = new schema.Entity('products');
const attributesSchema = new schema.Entity('attributes');
const ordersSchema = new schema.Entity('orders');
const usersSchema = new schema.Entity('users');

ordersSchema.define({
  products: [productsSchema],
  attributes: [attributesSchema],
  product: productsSchema,
});

usersSchema.define({
  orders: [ordersSchema],
});

categoriesSchema.define({
  products: [productsSchema],
});

productsSchema.define({
  attributes: [attributesSchema],
});

export const Schema = {
  categories: categoriesSchema,
  orders: ordersSchema,
  users: usersSchema,
  products: productsSchema,
  attributes: attributesSchema,
};
