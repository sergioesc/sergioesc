import { useContext } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { Store } from "../Store.js";
import Rating from "./Rating.js";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

function Product(props) {
  const { product } = props;
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const { cart: {cartItems} } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      toast.error(`Ya no hay dicha cantidad en el stock`);
      return;
    }
    cxtDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Añadido al carrito")

  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>${product.price}</Card.Text>
         {product.countInStock === 0 ? (
           <Button variant="light" disabled> No hay en Stock</Button>
         ): (
           <Button onClick={() => addToCartHandler(product)}>Agregar al carrito</Button>
         )}
      </Card.Body>
    </Card>
  );
}

export default Product;
