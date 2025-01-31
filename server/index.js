console.log('Server is running');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoute = require('./routes/item_route.js');
const cors = require('cors');


dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB...'));

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api", itemRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 

// app.get('/test', (req, res) => {
//     res.send('Test route');
// });

// app.get('/', (req, res) => {
//   res.send('Hello World !!');
// }); 
