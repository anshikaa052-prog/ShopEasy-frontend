import { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts();
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://shopeasy-backend-4thj.onrender.com/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCartHandler = (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    let newCart;
    
    if (existItem) {
      newCart = cartItems.map((x) =>
        x._id === existItem._id ? { ...existItem, qty: existItem.qty + 1 } : x
      );
    } else {
      newCart = [...cartItems, { ...product, qty: 1 }];
    }
    
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    alert(`${product.name} added to cart`);
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Kya tu pakka is product ko delete karna chahta hai?')) {
      try {
        const res = await fetch(`https://shopeasy-backend-4thj.onrender.com/api/products/${id}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          setProducts(products.filter((p) => p._id !== id));
          alert('Product successfully delete ho gaya');
        } else {
          alert('Delete nahi hua. Server error');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Products</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {products.length === 0 ? (
          <h3>No products found. Please add some from admin panel.</h3>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                width: '240px',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                width: '210px',
                height: '210px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  width="210"
                  height="210"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerText = 'No Image';
                    console.log('Photo nahi mili:', product.image);
                  }}
                />
              </div>
              
              <h3 style={{ margin: '5px 0', fontSize: '16px' }}>{product.name}</h3>
              <p style={{ margin: '5px 0', color: '#666' }}>Category: {product.category}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>Stock: {product.stock}</p>
              <p style={{ margin: '10px 0', fontSize: '18px', fontWeight: 'bold' }}>
                ₹{product.price}
              </p>
              
              <button
                onClick={() => addToCartHandler(product)}
                style={{
                  backgroundColor: '#2874f0',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  width: '100%',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => deleteHandler(product._id)}
                style={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  width: '100%',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginTop: '8px'
                }}
              >
                Delete Product
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;