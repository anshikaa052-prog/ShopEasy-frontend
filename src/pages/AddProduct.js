import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert('Product added successfully!');
      navigate('/');
    } catch (error) {
      alert('Error adding product');
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Add New Product</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={{ marginBottom: '10px' }}
        />

        <button type="submit" style={{ padding: '10px 20px' }}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;