import getProductById from '../handlers/get-product-by-id.js';
import products from '../mocks/products.js';
import { getMockEvent } from './utils.js';


describe('getProductById', () => {

  it('should return product by its id', async () => {

    const mockEvent = getMockEvent('7567ec4b-b10c-45c5-9345-fc73c48a80a1');
    const result = await getProductById(mockEvent);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(products[0]);

  });

  it('should return 404 when product does not exist', async () => {

    const productId = 'nonExistentProductId'
    const mockEvent = getMockEvent('nonExistentProductId');

    const response = await getProductById(mockEvent);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({
      message: `Product with ID ${productId} does not exist`
    });

  });

});