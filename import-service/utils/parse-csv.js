import csv from 'csv-parser';

function parseCSV(payload) {
  return new Promise(resolve => {
    const parsedPayload = [];

    if (!payload) {
      resolve(parsedPayload)
    }

    payload
      .pipe(csv())
      .on('data', data => parsedPayload.push(data))
      .on('end', () => {
        resolve(parsedPayload)
      })
      .on('error', error => {
        console.log(JSON.stringify(error))
        resolve(parsedPayload)
      })
  });
}

export { parseCSV };
