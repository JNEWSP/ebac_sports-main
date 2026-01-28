export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
  // acrescente outros campos conforme necessidade do projeto original
}

export interface CartItem extends Product {
  quantity: number;
}