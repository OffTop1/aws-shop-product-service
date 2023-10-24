import aws from 'aws-sdk';
import ProductService from '../services/product-service.js';
import StockService from '../services/stock-service.js';
import { merge } from '../tests/utils.js';

const dynamo = new aws.DynamoDB.DocumentClient();
const productService = new ProductService(dynamo, 'Products');
const stockService = new StockService(dynamo, 'Stock');

export default async event => {

  console.log('GetProductList function', event);

  try {
    const products = await productService.queryAllProducts();
    const stocks = await stockService.queryAllStocks();
    const productList = merge(products, stocks);

    return {
      statusCode: 200,
      body: JSON.stringify(productList, null, 4),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}
