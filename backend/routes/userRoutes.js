const router = require("express").Router();
const userModel = require("../models/userModel");

// const crypt=
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("yaha aya");

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Email already exists" });
    }

    // Create and save new user
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    // Generate token for the user
    const token = await newUser.generateToken(); // Assuming this method exists in your userModel
    console.log("Generated Token:", token); // Print the token

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Send response with token and user details
    res.status(201).cookie("token", token, options).json({
      success: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //    const data={email, password};
    const user = await userModel.findOne({ email }).select("+password");
    
    if (!user) return res.status(200).json({ message: "User Does Not Exist" });
    const isMatch = await user.matchPassword(password);
    console.log(password, userModel.password);
    // console.log(password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    // console.log(userModel.password);
   
    
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = userModel;
    const data = await user.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "User Does Not exist" });
    }
    res.status(200).json({ message: "DELETED" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User Does Not exists" });
    }
    await userModel.findByIdAndUpdate(id, password, { new: true });
    res.status(200).json({ message: "Password Updated" });

    const data = await userModel.findByIdAndUpdate(id, { password: password });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("logout", async(req, res)=>{
   try{
    res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true})
    .json({
      success:true,
      message:"Logged Out",
    })
   }
   catch(error){
    res.status(500).json({message:error.message,

    });
   }
})

//

module.exports = router;
