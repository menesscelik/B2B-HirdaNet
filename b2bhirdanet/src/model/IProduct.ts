export interface IProduct{
    id: number,
    name: string,
    description: string,
    isActive: boolean,
    imageUrl?: string,
    stock: number,
    price: number
}