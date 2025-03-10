import express, { Request, Response } from "express"
import { PRODUCTS } from "../Models/ProductModel"
import { ProductParams } from "../dto/Product"

const path = 'http://localhost:9000/assets/'

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, oldPrice, description, quantity, inStock, isFeatured, category } = <ProductParams>req.body;
    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => path + file.filename)

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock, isFeatured, category
    });

    try {
        console.log(product)
        await product.save();
        res.status(200).json(`Product created successfully at ${path}`)
    } catch (error) {
        res.status(500).json(`Failed to create Product ${error}`)
    }
}

export const getProductByCateID = async (req: Request, res: Response) => {
    console.log(req.params.CateID)
    try {
        const result = await PRODUCTS.find({ category: req.params.CateID })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`ProductByCateID fetch failed ${error}`)
    }
}

export const getProductByID = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.findById(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Product fetch failed ${error}`)
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products not found ${error}`)
    }
}

export const getProductByFeature = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({ isFeatured: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products not found: ${error}`)
    }
}

export const getTrendingProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(4)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Trending products not found: ${error}`)
    }
}

export const addRelatedImagesToProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            res.status(400).json({ message: "No images uploaded" });
            return
        }

        const newRelatedImages = files.map((file: Express.Multer.File) => path + file.filename);

        const updatedProduct = await PRODUCTS.findByIdAndUpdate(
            id,
            { $push: { related_images: { $each: newRelatedImages } } },
            { new: true }
        );

        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return 
        }

        res.status(200).json({ message: "Related images added successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: `Failed to add related images: ${error}` });
    }
};
