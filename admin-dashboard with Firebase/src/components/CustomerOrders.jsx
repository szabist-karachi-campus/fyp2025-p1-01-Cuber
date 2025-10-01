import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const CustomerOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("email", "==", currentUser.email)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setOrders(list);
    });

    return () => unsub();
  }, [currentUser.email]);

  const active = orders.filter((o) => o.status !== "Delivered");
  const history = orders.filter((o) => o.status === "Delivered");

  return (
    <div style={{ padding: "30px" }}>
      <h2>Active Orders</h2>
      {active.length === 0 ? (
        <p>No active orders.</p>
      ) : (
        active.map((order) => (
          <div
            key={order.id}
            style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0" }}
          >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> Rs {order.total}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((i, idx) => (
                <li key={idx}>{i.name} - Rs {i.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}

      <hr />

      <h2>Order History</h2>
      {history.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        history.map((order) => (
          <div
            key={order.id}
            style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0" }}
          >
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> Rs {order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((i, idx) => (
                <li key={idx}>{i.name} - Rs {i.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerOrders;
