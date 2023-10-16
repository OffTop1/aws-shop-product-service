import aws from 'aws-sdk';
import ProductService from '../services/product-service.js';
import products from '../mocks/products.js';

const dynamo = new aws.DynamoDB.DocumentClient();
const productService = new ProductService(dynamo, 'Products');

async function populateTables() {
  const promises = products.map(product => productService.createProduct(product));

  return Promise.all(promises);
}

export { populateTables }
