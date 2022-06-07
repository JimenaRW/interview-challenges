import {createContext, FC, ReactNode, useState} from "react";

import {ICart, CartContextType} from "../types";

export const CartContext = createContext<Partial<CartContextType>>({});

const CartProvider: FC<ReactNode> = ({children}) => {
  const [cart, setCart] = useState<ICart[]>([]);

  const addCart = (cartItem: ICart) => setCart([...cart, cartItem]);

  const updateCart = (id: number, action: boolean) => {
    cart.filter((cartItem: ICart) => {
      if (cartItem.id === id) {
        if (action === true) {
          cartItem.quantity++;
          setCart([...cart]);
        } else {
          if (cartItem.quantity === 1) {
            const cartCopy = cart.filter((cartItem: ICart) => cartItem.id !== id);

            return setCart([...cartCopy]);
          }
          cartItem.quantity--;
          setCart([...cart]);
        }
      }
    });
  };

  return (
    <CartContext.Provider value={{cart, addCart, updateCart}}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
