export class Product{
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;

    constructor(){
        this.id = 0,
        this.title = '',
        this.price = 0,
        this.category = '',
        this.description = '',
        this.image = ''
    }
}