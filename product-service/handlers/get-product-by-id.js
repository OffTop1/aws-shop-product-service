import aws from 'aws-sdk';
import ProductService from '../services/product-service.js';

const dynamo = new aws.DynamoDB.DocumentClient();
const productService = new ProductService(dynamo, 'Products');

export default async event => {
  console.log('GetProductById function', event);
  try {
    const { productId } = event.pathParameters;
    const product = await productService.queryProductById(productId);

    if (product) {
      return {
        statusCode: 200,
        body: JSON.stringify(product, null, 4)
      }
    }

    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Product with ID ${productId} does not exist`
      }, null, 4)
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}
