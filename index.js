// Adriano Alves
// Jun 09 2019
// Demo code using Multer js
// https://www.npmjs.com/package/multer
// run;
// npm init -y
// npm install express
// npm install --save multer
// npm install colors

var colors = require('colors');
var express = require('express')
var multer  = require('multer')
// In an average web app, only dest might be required, 
// and configured as shown in the following example.
// var upload = multer({ dest: 'uploads/' })
var path = require("path")

console.log('Multer'.rainbow);


const multerConfig = {
    storage: multer.diskStorage({
        destination: function(req,file,next){
            next(null, 'uploads/')
        }
    }),
    filename: function(req,file,next){
        console.log(file);
        
    }
}

const port = process.env.PORT || 3000

var app = express()

// // HTML route for home '/'
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });

 
// app.post('/upload', upload.single('getImg'), function (req, res, next) {
//   // req.file is the `getImg` file
//   // req.body will hold the text fields, if there were any
//   console.log(req);
// //   console.log(res);
  
  
// })

app.post('/uploadfile', multer(multerConfig).single('singleFile'), function (req, res, next) {
  // req.file is the `getImg` file
  // req.body will hold the text fields, if there were any
//   console.log(req.file);
//   console.log(res);
  
  
})
 
// // app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// // })
 
// var cpUpload = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['getImg'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })

app.listen(port, () => console.log (`Server is running at ${port}`));