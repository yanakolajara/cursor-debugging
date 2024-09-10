import { useState, useEffect } from "react";

// Product component
function Product({ item, addToCart }) {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>Price: ${item.price.toFixed(2)}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
}

// Shopping Cart component
function ShoppingCart({ cartItems }) {
  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span className="item-name">{item.name}</span>
                <span className="item-details">
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </p>
            <p className="total-price">
              <span>Total Price:</span>
              <span>${total}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// New Product Form component
function NewProductForm({ addProduct }) {
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0 || isNaN(newProduct.price)) {
      alert("Please enter a valid name and price.");
      return;
    }
    addProduct(newProduct);
    setNewProduct({ name: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        required
        min="0.01"
        step="0.01"
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

// Main App component
function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Apple", price: 1 },
    { id: 2, name: "Banana", price: 0.5 },
    { id: 3, name: "Cherry", price: 2 },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
    setCart(updatedCart);
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  useEffect(() => {
    console.log("Cart updated");
    // Error 6: Incorrect dependency array
  }, [cart, undefinedVariable]);

  return (
    <div className="container">
      <h1>React Shopping Cart</h1>

      <NewProductForm addProduct={addProduct} />

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <Product item={product.name} addToCart={addToCart} />
          </div>
        ))}
      </div>

      <ShoppingCart cartItems={cart} />
    </div>
  );

  console.log(undefinedVariable);
}

const [state, setState] = useState();

export default App;
