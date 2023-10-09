import getProductList from "../handlers/get-product-list.js";
import products from "../mocks/products.js";

describe('getProductsList', () => {
  it('should return list of products', async () => {

    const mockEvent = {}
    const response = await getProductList(mockEvent);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(products);

  });
});