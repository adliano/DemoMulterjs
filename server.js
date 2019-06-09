// Require the express
const express = require('express')
// Init the express
const app = express()
// Requirer Multer
const multer = require('multer')
// Require PATH
const path = require('path')
// Port setup
const PORT = process.env.PORT || 3000
// Set Multer storage
/*
The next thing will be to define a storage location for our files.
Multer gives the option of storing files to disk, as shown below. 
Here, we set up a directory where all our files will be saved,
and we'll also give the files a new identifier.
*/
let storage = multer.diskStorage({
    // Set Destination
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    // Set File Name
    filename: function(req, file, cb){
        console.log(req);
        // HERE is where we can decide the name of the file
        cb(null, `myImageName.jpg`)

        /* output of file
        { fieldname: 'singleFile',
          originalname: '<File original name>',
          encoding: '7bit',
          mimetype: 'image/jpeg' }
        */

    }
})
// Init Multer upload storage
let upload = multer({storage: storage})


/**************************************************
 ********************** POST **********************
 *************************************************/
// name="singleFile"
app.post('/uploadfile', upload.single('singleFile'),function(req, res, next){
    console.log('inside single file route');
    // get file
    let file = req.file
    // Check if we have a file
    if(!file){
        console.log('not a file');
        // If no file return an Error
        let err = new Error('Missing File')
        err.httpStatusCode = 400
        return next(err)
    }
    // Else send the file
    //res.send(file)
    res.redirect('/')
})
/**************************************************
 *************** multiple files *******************
 *************************************************/
//Uploading multiple files
// name="multiFiles"
app.post('/multiple', upload.array('multiFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(files)
  })
/**************************************************
 ********************** GET ***********************
 *************************************************/
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, "./index.html"));
})
// Listen server
/**************************************************
 ***************** Entry Point ********************
 *************************************************/
app.listen(PORT, function () {
    console.log(`Server Listen to Port ${PORT}`);
    
})