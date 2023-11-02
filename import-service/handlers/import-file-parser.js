import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from '@aws-sdk/client-sqs';
import { parseCSV } from '../utils/parse-csv.js';
import { REGION } from "../utils/constants.js";
import ImportService from "../services/import-service.js";
import SQSService from "../services/sqs-service.js";

const s3Client = new S3Client({ region: REGION });
const sqsClient = new SQSClient({ region: REGION });

const importService = new ImportService(s3Client);
const sqsService = new SQSService(sqsClient);

async function importFileParser(event) {
  const filteredRecords = event.Records.filter(Boolean);

  for (const record of filteredRecords) {
    const key = record.s3.object.key;
    const payload = await importService.getObject(key)
    const parsedProducts = await parseCSV(payload);
    await sendMessageToSQS(parsedProducts);
  }

  return {
    statusCode: 202
  }
}

async function sendMessageToSQS(products) {
  const promises = products.map(
    product => sqsService.sendMessage(product)
  )
  return Promise.all(promises);
}

export default importFileParser;
