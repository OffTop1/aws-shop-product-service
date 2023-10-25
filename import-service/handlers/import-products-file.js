import { S3Client } from "@aws-sdk/client-s3";
import { REGION, BUCKET } from '../utils/constants.js';
import ImportService from "../services/import-service.js";

const client = new S3Client({ region: REGION });
const importService = new ImportService(client);

async function importProductsFile(event) {
  const filename = event.queryStringParameters.name;
  const KEY = `uploaded/${filename}`;
  const params = { Bucket: BUCKET, Key: KEY };

  try {
    const presignedUrl = await importService.createPresignedUrl(params);
    return {
      statusCode: 200,
      body: presignedUrl
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}

export default importProductsFile;
