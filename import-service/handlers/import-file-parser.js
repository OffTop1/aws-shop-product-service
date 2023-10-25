import { S3Client } from "@aws-sdk/client-s3";
import { parseCSV } from '../utils/parse-csv.js';
import { REGION } from "../utils/constants.js";
import ImportService from "../services/import-service.js";

const client = new S3Client({ region: REGION });
const importService = new ImportService(client);

async function importFileParser(event) {

  for (const record of event.Records) {
    const key = record.s3.object.key;
    const payload = await importService.getObject(key);
    await importService.moveObject(key);
    parseCSV(payload, console.log);
  }

  return {
    statusCode: 202
  }
}

export default importFileParser;
