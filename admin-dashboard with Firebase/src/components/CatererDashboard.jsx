import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../styles/CatererDashboard.css"; 

const CatererDashboard = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), product);
      setProduct({ name: "", price: "", description: "", image: "" });
      alert("Product Added!");
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "products", editProduct.id), {
        name: editProduct.name,
        price: editProduct.price,
        description: editProduct.description,
        image: editProduct.image,
      });
      setEditProduct(null);
      alert("Updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Load Products
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const list = [];
      snap.forEach((docx) => list.push({ id: docx.id, ...docx.data() }));
      setProducts(list);
    });
    return () => unsub();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="form-section">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="products-section">
        <h2>Your Products</h2>
        <div className="products-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p className="price">Rs {item.price}</p>
              <div className="btn-group">
                <button onClick={() => setEditProduct(item)}>Edit</button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this product?"))
                      handleDelete(item.id);
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                placeholder="Product Name"
              />
              <input
                type="text"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
                placeholder="Price"
              />
              <input
                type="text"
                name="image"
                value={editProduct.image}
                onChange={handleEditChange}
                placeholder="Image URL"
              />
              <textarea
                name="description"
                value={editProduct.description}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <div className="btn-group">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditProduct(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatererDashboard;
