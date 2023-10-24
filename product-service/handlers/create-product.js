import aws from 'aws-sdk';
import ProductService from '../services/product-service.js';
import { validateProductData } from '../validation/validate-product-data.js';

const dynamo = new aws.DynamoDB.DocumentClient();
const productService = new ProductService(dynamo, 'Products');



export default async event => {

  console.log('CreateProduct function', event);

  const productInfo = event.body;
  const isValidProductData = validateProductData(productInfo);

  if (!isValidProductData) {
    return {
      status: 400,
      body: "Invalid product data"
    }
  }

  try {
    const newProduct = await productService.createProduct(productInfo);
    return {
      statusCode: 200,
      body: JSON.stringify(newProduct, null, 4),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}
