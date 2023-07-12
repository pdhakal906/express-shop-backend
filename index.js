const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
mongoose.connect('mongodb+srv://pdhakal906:moles900@cluster0.mp5chzg.mongodb.net/Shopy').then((result) => {
  app.listen(5000);
}).catch((err) => {
  console.log(err)
})




app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(productRoute);
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


app.use((req, res) => {
  return res.status(404).json({
    message: 'not found'
  })
})