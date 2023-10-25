import fs from 'fs';
import csv from 'csv-parser';

function parseCSV(payload, callback) {
  const parsedPayload = [];
  fs.createReadStream(payload)
    .pipe(csv())
    .on('data', data => parsedPayload.push(data))
    .on('end', () => {
      callback(parsedPayload)
    })
}

export { parseCSV };
