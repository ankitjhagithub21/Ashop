const User = require("../models/user");

const addToCart = async (req, res) => {
   
    try {


        const userId = req.user._id; 
        const { productId, quantity } = req.body; 

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ "Error": "User not found" });
        }

       
        const existingItemIndex = user.cart.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            // Update quantity if the product is already in the cart
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new product to the cart
            user.cart.push({ productId, quantity });
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ "Message": "Product added to cart", "Cart": user.cart });


    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { productId } = req.body; 

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ "Error": "User not found" });
        }

        
        user.cart = user.cart.filter(item => item.productId !== productId);

        // Save the updated user
        await user.save();

        res.status(200).json({ "Message": "Product removed from cart", "Cart": user.cart });

    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" })
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user by isAuth middleware

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ "Error": "User not found" });
        }

        // Send the user's cart in the response
        res.status(200).json({ "Cart": user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Error": "Internal server error" });
    }
};

const incrementQuantity = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { productId } = req.body; 
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ "Error": "User not found" });
        }

        // Find the product in the cart
        const product = user.cart.find(item => item.productId === productId);

        if (!product) {
            return res.status(404).json({ "Error": "Product not found in cart" });
        }

        // Increment the quantity
        product.quantity += 1;

        // Save the updated user
        await user.save();

        res.status(200).json({ "Message": "Product quantity incremented", "Cart": user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Error": "Internal server error" });
    }
};

const decrementQuantity = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user by isAuth middleware
        const { productId } = req.body; // Expect productId in the request body

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ "Error": "User not found" });
        }

        // Find the product in the cart
        const product = user.cart.find(item => item.productId === productId);

        if (!product) {
            return res.status(404).json({ "Error": "Product not found in cart" });
        }

        // Decrement the quantity
        product.quantity -= 1;

        // Remove the product from the cart if the quantity is zero or less
        if (product.quantity <= 0) {
            user.cart = user.cart.filter(item => item.productId !== productId);
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ "Message": "Product quantity decremented", "Cart": user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "Error": "Internal server error" });
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getCart,
    incrementQuantity,
    decrementQuantity
}

