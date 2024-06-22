const Product = require("../models/product");
const {rm} =require('fs')

const createProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({ "message": "Unauthorized." })
        }

        const { title, description, category, price, stock } = req.body;



        const image = req.file

        if (!image) return res.status(400).json({ "message": "Please upload image." })

        const product = await Product.create({
            title,
            description,
            category,
            price,
            stock,
            image: image?.path
        });

        res.status(201).json({ "message": "Product created", product })



    } catch (error) {
        res.status(500).json({ error: "Internal Server error" })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" })
    }
}
const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({ "message": "Product not found." })
        }
        res.status(200).json({ product })

    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({ "message": "Unauthorized." })
        }

        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({ "message": "Product not found." })
        }
        rm(product.image,()=>{
            console.log("Image deleted")
        })

        await product.deleteOne()

        res.status(200).json({ message:"Product deleted." })

    } catch (error) {
        res.status(500).json({ "Error": error.message })
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct
}