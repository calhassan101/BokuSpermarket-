const Product = require("../Models/products");

//create a product= async {req, res} =>{
   // try{
      //  const product = newproduct(req.body);
        //await product.save();
        //res.status(200).json(product);
   // } catch (error) {res.status(400).json} ({message:error.message});
//}
//};
//module.exports = {createproduct};
//
exports.createproduct = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const{name, size,description, price, quantity} =
        req.body;
    
        const product = new Product({
        name,
        size,
        description,
        price,
        quantity
    });
        await product.save ();
        res.status(201).json ({message:"product created successfully",
            product
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }

};

//update product
exports.updateproduct = async (req,res) => {
    try {
        const {id} = req.params;//where id is the id of the product to be update
        const{name, size,description, price, quantity } =
        req.body;
        const product = await Product.findByIdAndUpdate(
            id, 
            {name, size,description, price, quantity},
            {new: true}
        );
        if(!product) {
            return 
            res.status(404).json({
                message: "Product  not found"
            });
        }
            res.status(200).json({
                message:"product updated successfully",
                product
            });
        
        
         } catch(error){res.status(500).json({
            message:"error updating product", error:error.message
        });

        }
    };

    
