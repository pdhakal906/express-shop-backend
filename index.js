const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const fileUpload = require('express-fileupload');

//allows lilent querying
mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://uname:pwd@cluster0.mp5chzg.mongodb.net/Shopy').then((result) => {
  app.listen(5000);
}).catch((err) => {
  console.log(err)
})


app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}));

app.use('/uploads', express.static('uploads'))

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//urlencoded is used for form data
//app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes)
// app.get('/', (req, res) => {
//   // return res.sendFile("./view/home.html", { root: __dirname })
//   // return res.status(200).json({
//   //   title: 'Backend'
//   // });
//   return res.sendFile('./view/home.html', { root: __dirname })
// })

// app.get('/about', (req, res) => {
//   return res.sendFile('./view/about.html', { root: __dirname })
// })

//If no previous route handles a request, this middleware sends a JSON response with a "not found" message and a 404 status code.
app.use((req, res) => {
  return res.status(404).json({
    message: 'not found'
  })
})
