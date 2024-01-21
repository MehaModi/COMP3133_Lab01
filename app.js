// Importing required modules
const fs = require('fs');
const csv = require('csv-parser');

// Defining the file paths
const canadaFilePath = 'canada.txt';
const usaFilePath = 'usa.txt';
const inputCsvFilePath = 'input_countries.csv';

// 3A. Delete canada.txt and usa.txt if already exist using fs module 
if (fs.existsSync(canadaFilePath)) {
  fs.unlinkSync(canadaFilePath);
}

if (fs.existsSync(usaFilePath)) {
  fs.unlinkSync(usaFilePath);
}

// 3B. Filter data of Canada and write data to canada.txt
fs.createReadStream(inputCsvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    if (row.Country === 'Canada') {
      fs.appendFileSync(canadaFilePath, JSON.stringify(row) + '\n');
    }
  })
  .on('end', () => {
    console.log('Filtered data for Canada written to canada.txt');
  });

// 3C. Filter data of United States and write data to usa.txt
fs.createReadStream(inputCsvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    if (row.Country === 'United States') {
      fs.appendFileSync(usaFilePath, JSON.stringify(row) + '\n');
    }
  })
  .on('end', () => {
    console.log('Filtered data for USA written to usa.txt');
  });
