
class ProductService {
  constructor(model, tableName) {
    this.model = model;
    this.tableName = tableName;
  }

  async queryProductById(id) {
    const product = await this.model.query({
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id }
    }).promise();

    return product;
  }

  async queryAllProducts() {
    const queryResult = await this.model.scan({
      TableName: this.tableName
    }).promise();

    return queryResult.Items;
  }

  async createProduct(productInfo) {
    const newProduct = await this.model.put({
      TableName: this.tableName,
      Item: productInfo
    }).promise();

    return newProduct;
  }
}

export default ProductService;
