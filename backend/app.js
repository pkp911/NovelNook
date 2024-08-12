const bp = require('body-parser');
const express=require('express');

const app=express();
app.use(express.json())
// app.use(bp.json());
// app.use(bp.urlencoded({extended:true}));

const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://panprashant123:Nishu${encodeURIComponent('@')}1997@cluster0.zdxam.mongodb.net/BookStore?retryWrites=true&w=majority`
)
.then(()=>console.log("Connected to MongoDB"));

const bookRoute=require('./routes/booksRoutes');
app.use('/api/v1',bookRoute);

app.listen(1000,()=>{
    console.log('Server is running on port 1000');
}); 