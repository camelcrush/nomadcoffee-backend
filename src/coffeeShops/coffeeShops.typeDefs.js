import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User
    photos(offset: Int): [CoffeeShopPhoto]
    categories: [Category]
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    totalShops: Int!
  }
  type Category {
    id: Int!
    name: String!
    slug: String
    shops(offset: Int): [CoffeeShop]
    totalShops: Int
  }
`;
