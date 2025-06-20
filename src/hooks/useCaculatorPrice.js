import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/formatData";

export function useCaculatorPrice(product) {
  const [price, setPrice] = useState({});

  useEffect(() => {
    if (product?.discount) {
      const oldPrice = formatPrice(product.price);
      const newPrice = formatPrice(
        Number(product.price) * (1 - Number(product.discount) / 100)
      );
      setPrice({
        oldPrice,
        newPrice,
      });
    } else {
      const oriPrice = formatPrice(product.price);
      setPrice({
        oriPrice,
      });
    }
  }, [product]);

  return price;
}
