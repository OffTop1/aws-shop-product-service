
class StockService {
  constructor(model, tableName) {
    this.model = model;
    this.tableName = tableName;
  }

  async queryAllStocks() {
    const queryResult = await this.model.scan({
      TableName: this.tableName
    }).promise();

    return queryResult.Items;
  }
}

export default StockService;
