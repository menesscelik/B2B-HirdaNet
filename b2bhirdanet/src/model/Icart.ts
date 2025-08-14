export interface CartItem { 
    productId: number;
    imageUrl: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart {
    cartId: number;
    customerId: number;
    cartItems: CartItem[];
}