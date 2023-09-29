const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbName = 'Test';

mongoose.connect(``, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB Connected');
  initializeGridFS();
});

async function initializeGridFS() {
  const gfs = new mongoose.mongo.GridFSBucket(db.db);

  const fileName = 'Bolano.mp3';
  const fileLoc = path.join(__dirname, 'audiofiles', fileName);
  const downLoc = path.join(__dirname, 'downloads', fileName);

  async function uploadFile() {
    const writestream = gfs.openUploadStream(fileName);

    fs.createReadStream(fileLoc).pipe(writestream);

    writestream.on('close', () => {
      console.log('Upload complete.');
      downloadFile();
    });
  }

  async function downloadFile() {
    const readstream = gfs.openDownloadStreamByName(fileName);

    const writestream = fs.createWriteStream(downLoc);

    readstream.pipe(writestream);

    writestream.on('finish', () => {
      console.log('Download Completed!');
      mongoose.connection.close();
    });
  }

  uploadFile();
}
