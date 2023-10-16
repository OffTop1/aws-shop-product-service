import products from "../mocks/products.js";

export default async event => {
  const { productId } = event.pathParameters;
  const product = products.find(product => product.id === productId);

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
}
