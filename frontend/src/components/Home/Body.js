import React, { useState, useEffect } from 'react';
import './Body.css';

import bg1 from '../images/bgphoto2.jpg';
import bg2 from '../images/bgphoto.webp';

const products = [
  {
    id: '68be906425d1639086aec63a',
    category: 'Football',
    name: 'FC Barcelona Home Jersey 2025/26',
    team: 'Barcelona',
    description: 'Official FC Barcelona home jersey with latest design and technology',
    price: 89.99,
    stock: 50,
    image: require('../images/fcb2526.webp'),
  },
  {
    id: '68be906425d1639086aec63b',
    category: 'Football',
    name: 'Real Madrid Away Jersey 2024/25',
    team: 'Real Madrid',
    description: 'Real Madrid away jersey featuring the iconic white design',
    price: 94.99,
    stock: 45,
    image: require('../images/rm_2024a.avif'),
  },
  {
    id: '68be906425d1639086aec63c',
    category: 'Football',
    name: 'Spain National Team Jersey 2025/26',
    team: 'Spain',
    description: 'Official Spain national team jersey for international matches',
    price: 79.99,
    stock: 30,
    image: require('../images/spain2526.jpeg'),
  },
  {
    id: '68be906425d1639086aec63d',
    category: 'Football',
    name: 'Arsenal Emirates Jersey 2025/26',
    team: 'Arsenal',
    description: 'Arsenal home jersey with Emirates sponsorship',
    price: 84.99,
    stock: 35,
    image: require('../images/ars2526.jpeg'),
  },
  {
    id: '68be906425d1639086aec63e',
    category: 'Cricket',
    name: 'India National Cricket Team Jersey',
    team: 'India',
    description: 'Official India cricket team jersey for international matches',
    price: 79.99,
    stock: 40,
    image: require('../images/indc.jpeg'),
  },
  {
    id: '68be906425d1639086aec63f',
    category: 'Cricket',
    name: 'Australia National Cricket Team Jersey',
    team: 'Australia',
    description: 'Official Australia cricket team jersey for international matches',
    price: 74.99,
    stock: 38,
    image: require('../images/ausc.jpeg'),
  },
  {
    id: '68be906425d1639086aec640',
    category: 'NBA',
    name: 'Los Angeles Lakers Jersey',
    team: 'Lakers',
    description: 'Official Los Angeles Lakers NBA jersey',
    price: 89.99,
    stock: 25,
    image: require('../images/laknba.jpeg'),
  },
  {
    id: '68be906425d1639086aec641',
    category: 'NBA',
    name: 'Golden State Warriors Jersey',
    team: 'Warriors',
    description: 'Official Golden State Warriors NBA jersey',
    price: 84.99,
    stock: 30,
    image: require('../images/gsnba.jpeg'),
  },
  {
    id: '68be906425d1639086aec642',
    category: 'Football',
    name: 'Manchester United Home Jersey 2024/25',
    team: 'Manchester United',
    description: 'Official Manchester United home jersey with latest design',
    price: 88.99,
    stock: 40,
    image: require('../images/mutd2425.jpeg'),
  },
  {
    id: '68be906425d1639086aec643',
    category: 'Football',
    name: 'Chelsea Away Jersey 2024/25',
    team: 'Chelsea',
    description: 'Official Chelsea away jersey with iconic blue design',
    price: 85.99,
    stock: 38,
    image: require('../images/clsa2425.jpeg'),
  },
  {
    id: '68be906425d1639086aec644',
    category: 'Cricket',
    name: 'England National Cricket Team Jersey',
    team: 'England',
    description: 'Official England cricket team jersey for international matches',
    price: 78.99,
    stock: 35,
    image: require('../images/engc.jpeg'),
  },
  {
    id: '68be906425d1639086aec645',
    category: 'Cricket',
    name: 'South Africa National Cricket Team Jersey',
    team: 'South Africa',
    description: 'Official South Africa cricket team jersey for international matches',
    price: 76.99,
    stock: 33,
    image: require('../images/sac.jpeg'),
  },
  {
    id: '68be906425d1639086aec646',
    category: 'NBA',
    name: 'Chicago Bulls Jersey',
    team: 'Bulls',
    description: 'Official Chicago Bulls NBA jersey',
    price: 87.99,
    stock: 28,
    image: require('../images/cbnba.jpeg'),
  },
  {
    id: '68be906425d1639086aec647',
    category: 'NBA',
    name: 'Miami Heat Jersey',
    team: 'Heat',
    description: 'Official Miami Heat NBA jersey',
    price: 83.99,
    stock: 27,
    image: require('../images/mhnba.jpeg'),
  },
  {
    id: '68be906425d1639086aec648',
    category: 'Football',
    name: 'Liverpool Home Jersey 2024/25',
    team: 'Liverpool',
    description: 'Official Liverpool home jersey with latest design',
    price: 90.99,
    stock: 42,
    image: require('../images/liv2425.jpeg'),
  },
  {
    id: '68be906425d1639086aec649',
    category: 'Cricket',
    name: 'New Zealand National Cricket Team Jersey',
    team: 'New Zealand',
    description: 'Official New Zealand cricket team jersey for international matches',
    price: 75.99,
    stock: 30,
    image: require('../images/nzc.jpeg'),
  },
];

const Body = ({ onAddToCart, cartCount = 0, onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [teamFilter, setTeamFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  const categories = ['All Categories', 'Football', 'Cricket', 'NBA'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    const matchesTeam = product.team.toLowerCase().includes(teamFilter.toLowerCase());
    const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
    return matchesSearch && matchesCategory && matchesTeam && matchesMinPrice && matchesMaxPrice;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const bgImages = [bg1, bg2];

  return (
    <main className="body-container">
      <div className="intro-container" style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}>
        <section className="intro-section">
          <h1>Premium Sports Jerseys</h1>
          <p>Discover authentic jerseys from your favorite football, cricket, and NBA teams</p>
          <div className="category-buttons">
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                className={categoryFilter === cat ? `active ${cat.toLowerCase()}` : cat.toLowerCase()}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="filter-section">
        <input
          type="text"
          placeholder="Search jerseys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Team name"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
        />
        <button className="cart-button" onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </section>

      <section className="products-section">
        <h2>All Products</h2>
        <p>15 jerseys found</p>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="category-label">{product.category.toUpperCase()}</div>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="team-name">{product.team}</p>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price.toFixed(2)}</p>
              <p className="stock">Stock: {product.stock}</p>
              <button className="add-to-cart-btn" onClick={() => onAddToCart(product.id)}>+ Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};



export default Body;
