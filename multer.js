const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/', // this saves your file into a directory called "uploads",
  filename: function(req, file, cb){
    console.log(file);
    
    //cb(null, `myImageName_${Date.now()}.jpg`)
    // cb(null, `myImageName.jpg`)
}
}); 

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/multer.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {
  res.redirect('/');
});

app.listen(3000);