export class Product {
    
    constructor(
        public id: string,
        public price: number,
        public carousel: {
            imageUrl: string
        }[],
        public additional: string[],
        public dezen: string,
        public gnezdo: string,
        public komplet: {
            ogradica: string,
            masne: string,
            posteljina: string
        },
        public category: string
        ) {}
}