import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "../styles/CustomerDashboard.css"; // 👈 CSS import

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products from firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setProducts(list);
    });
    return () => unsub();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Add items to cart first");
      return;
    }
    const total = cart.reduce((acc, cur) => acc + Number(cur.price), 0);
    try {
      await addDoc(collection(db, "orders"), {
        email: currentUser.email,
        items: cart,
        total: total,
        status: "New",
        createdAt: new Date(),
      });
      setCart([]);
      alert("Order Placed!");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="customer-dashboard">
      {/* Products Section */}
      <div className="products-section">
        <h2>Available Products</h2>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <p className="price">Rs {p.price}</p>
              <button onClick={() => addToCart(p)}>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h3>Your Cart</h3>
        {cart.map((c, idx) => (
          <div key={idx} className="cart-item">
            <span>
              {c.name} - Rs {c.price}
            </span>
            <button onClick={() => removeItem(idx)}>X</button>
          </div>
        ))}

        <hr />
        <p>
          <strong>Total: </strong>
          Rs {cart.reduce((acc, cur) => acc + Number(cur.price), 0)}
        </p>
        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
