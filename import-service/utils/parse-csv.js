import fs from 'fs';
import csv from 'csv-parser';

function parseCSV(payload) {
  return new Promise(resolve => {
    const parsedPayload = [];
    fs.createReadStream(payload)
      .pipe(csv())
      .on('data', data => parsedPayload.push(data))
      .on('end', () => {
        resolve(parsedPayload)
      })
  });
}

export { parseCSV };
