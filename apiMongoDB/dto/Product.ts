export interface ProductParams {
    name: string;
    images: [string];
    related_images?: string[];
    price: number;
    oldPrice: number;
    description: string;
    quantity: number;
    inStock: boolean;
    isFeatured: boolean;
    category: string;
}
