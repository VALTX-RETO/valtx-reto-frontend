export interface Product {
    sIdProduct: string;
    sNombre: string;
    sCategoria: string;
    images: ProductImage[];
}

export interface ProductImage {
    sIdImage: string;
    sUrl: string;
}

export interface ProductDialogData {
    product?: Product;
    readonly?: boolean;
}

export interface ImagesDialogData {
    productId: string;
}