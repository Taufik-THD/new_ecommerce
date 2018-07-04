const Storage = require('@google-cloud/storage');
require('dotenv').config()

const config = {
  CLOUD_BUCKET: process.env.CLOUD_BUCKET,
  PROJECT_ID: process.env.GCLOUD_PROJECT,
}

// prepare storage
const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: process.env.KEYFILE_PATH
});

// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);

// just a helper to create absolute path to GCS
function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

// the real middleware
function sendUploadToGCS (req, res, next) {
  console.log('masuk dalem')
  console.log(req.file)
  // if (!req.file) {
  //   return next('upload mungkin gagal');
  // }

  const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop()+"!d";
  const file = bucket.file(gcsname);

  // prepare the stream
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });
  console.log('sini');
  // handle when upload error
  stream.on('error', (err) => {
    console.log(err);
    req.file.cloudStorageError = err;
    next(err);
  });

  // handle when upload finish
  stream.on('finish', () => {
    console.log('masuk sini');
    req.file.cloudStorageObject = gcsname;
    file.makePublic() //make the uploaded file public
      .then(() => {
        console.log('masuk sini')
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
  });

  // write the file
  stream.end(req.file.buffer);
}

module.exports = {
  sendUploadToGCS
};
