import client from "../client";

export default {
  CoffeeShop: {
    photos: ({ id }, { offset }) =>
      client.coffeeShopPhoto.findMany({
        where: { coffeeShopId: id },
        take: 5,
        skip: offset,
      }),
    categories: ({ id }) =>
      client.category.findMany({ where: { shops: { some: { id } } } }),
  },
  Category: {
    shops: ({ id }, { offset }) =>
      client.category.findUnique({ where: { id } }).shops({
        take: 5,
        skip: offset,
      }),
    totalShops: ({ id }) =>
      client.coffeeShop.count({ where: { categories: { some: { id } } } }),
  },
};
