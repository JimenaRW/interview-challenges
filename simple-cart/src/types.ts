export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface ICart {
  id: number;
  image: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  productId: string;
}

export type CartContextType = {
  cart: ICart[];
  addCart: (cartItem: ICart) => void;
  updateCart: (id: number, action: boolean) => void;
};
