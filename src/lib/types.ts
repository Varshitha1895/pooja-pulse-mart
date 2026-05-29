export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit?: string;
  catalog: 'retail' | 'wholesale' | 'both';
  description?: string;
};
