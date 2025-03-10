import React from "react";
import { ProductListParams, FetchProductsParam } from "../TypesCheck/HomeProps"
import axios from "axios"
interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}
interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}
interface IProdByFeatureProps {
    setGetProductsByFeature: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}
interface ITrendingProductProps {
    setTrendingProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}
export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try {
        const response = await axios.get("http://10.0.2.2:9000/category/getAllCategories");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ),
                related_images: item.related_images ? item.related_images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ) : []
            }));
            
            setGetCategory(fixedData);
        } else {
            console.warn("fetchCategories: API data is not an array", response.data);
            setGetCategory([]);
        }
    } catch (error) {
        console.log("axios get error ", error);
        setGetCategory([]);
    }
};
export const fetchProductsByCatID = async ({ setGetProductsByCatID, catID }: IProdByCatProps) => {
    try {
        const response: FetchProductsParam = await axios.get(`http://10.0.2.2:9000/product/getProductByCateID/${catID}`);
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ),
                related_images: item.related_images ? item.related_images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ) : []
            }));
            
            setGetProductsByCatID(fixedData);
        } else {
            console.warn("FetchProductsByCatID: API data is not an array", response.data);
            setGetProductsByCatID([]);
        }
    } catch (error) {
        console.log("axios get error ", error);
        setGetProductsByCatID([]);
    }
}
export const fetchProductByFeature = async ({ setGetProductsByFeature }: IProdByFeatureProps) => {
    try {
        const response = await axios.get("http://10.0.2.2:9000/product/getAllProducts");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ),
                related_images: item.related_images ? item.related_images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ) : []
            }));
            
            setGetProductsByFeature(fixedData);
        } else {
            console.warn("fetchProductByFeature: API data is not an array", response.data);
            setGetProductsByFeature([]);
        }
    } catch (error) {
        console.log("axios get error ", error);
        setGetProductsByFeature([]);
    }
};
export const fetchTrendingProducts = async ({ setTrendingProducts }: ITrendingProductProps) => {
    try {
        const response: FetchProductsParam = await axios.get("http://10.0.2.2:9000/product/getTrendingProducts");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ),
                related_images: item.related_images ? item.related_images.map((img: string) =>
                    img.replace("http://localhost", "http://10.0.2.2")
                ) : []
            }));
            
            setTrendingProducts(fixedData);
        } else {
            console.warn("fetchCategories: API data is not an array", response.data);
            setTrendingProducts([]);
        }
    } catch (error) {
        console.log("axios get error ", error);
        setTrendingProducts([]);
    }
};