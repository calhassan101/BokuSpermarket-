const User = require("../Models/users");
const bcrypt = require("bcrypt");
const jwt = 
require("jsonwebtoken");



exports.createuser = async (req, res) =>{
    //exports.loginuser = async (req, res) {
    try {
        //request body
        const{ name, email, password, gender,phone, role, HasAdminAccess} = req.body;
    // check if all required field are provided
    if (!req.body.name|| 
        !req.body.email|| 
        !req.body.password|| 
        !req.body.gender|| 
        !req.body.phone|| 
        !req.body.role) { 
        return res.status(400).json({message: "provide all require fields"});
        }
        //email check
        const emailExists = await User.findOne({email});
        if (emailExists) {
            return res.status(400).json({
            message:
            "Email already exists"
        });
    }

        //check if phone number already exists
        const phoneExists =
        await
        User.findOne({phone });
        if (phoneExists) {
            return res.status(400).json({
                message:
                "Phone number already exists"
            });
        }

        //encrypt/hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await
        bcrypt.hash(password, salt);

        //create new user
        const user = new User ({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            gender: req.body.gender,
            phone: req.body.phone,
            role: req.body.role||"user",// default role is user if not provided
            HasAdminAccess: req.body.HasAdminAccess||false//default is false if not provided

        });
    
        await user.save ();
        res.status(201).json({message:"user created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
    };
    //check if user exist
    
    exports.loginuser = async (req, 
        res) => {
        try {
            const {email, password} = req.body;
            //check if user exists
            const user = await
            User.findOne({ email});
            if (!user) {
                return res.status(404).json({
                message: "user not found"
            });
            }
            
        
    
    //check if password is correct
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if(!ispasswordvalid) {
        return res.status(401).json({message: "invalid password"});
    }

    //generate a token(you can use jwt or anyother method)
    //const token= generatetoken(user); //implement your token generation logic here

   // const jwt = require("jsonwebtoken");
   
    
    const token =jwt.sign(
        {id:user._id, email:user.email, name: user.name},process.env.JWT_SECRET, {expiresIn: "1hr"}
    ); 
        res.status(200).json({message: "login successful", token});
} catch (error) {
            res.status(500).json({message: "error login", error: error.message});
}
};       
    


