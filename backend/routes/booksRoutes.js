const router=require('express').Router();
const bookModel=require('../models/booksModel');
router.post("/add", async(req, res)=>{
    try {
        const data=req.body;
        // console.log(data);
        const newBook=new bookModel(data);
        //database mein store hua data 
        await newBook.save().then(() => {
            res.status(200).json({ message: "Book added successfully" });
        }).catch((error) => {
            res.status(500).json({ message: "Error adding book", error });
        });
    } catch (error) {
        console.log(error);
    }
});


router.get("/getBooks",async(req, res)=>{
    let books;
    try {
        books=await bookModel.find();
        res.status(200).json({books});
    } catch (error) {
        console.log(error);
    }
} );
/*get request  by id */
router.get("/getBook/:id", async(req, res)=>{
    
    const id=req.params.id;
    try {
        const book=await bookModel.findById(id);
        if(!book)return res.status(404).json({message:"Book not found"});
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
    }
});
/*update books by id */
router.put("/updateBook/:id", async(req, res)=>{
    const id=req.params.id;
    const {bookname, description, author, image, price}=req.body;
    // let book;
    try {
      const  book= await bookModel.findByIdAndUpdate(id, {
            bookname,
            description,
            author,
            image,
            price,
        },
        {new:true}//this ensures the updated document is returned
    );
    if(!book)return res.status(404).json({message:"Book Not Found"});
     res.status(200).json(book);
} catch(error){
        console.error(error);
       res.status(500).json({message:"Internal Sever error"});
     }
});
router.delete("/deleteBook/:id", async(req, res)=>{
    const id=req.params.id;
    try {
        const book= await bookModel.findByIdAndDelete(id);
       if(!book){
        return res.status(404).json({message:"Book not found"});

       }
       res.status(200).json({message:"DELETED"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports=router;
