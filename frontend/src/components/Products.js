import React, { useState } from 'react';
import { FiDownload, FiMusic, FiHeadphones, FiBookOpen, FiPlay, FiX, FiStopCircle } from 'react-icons/fi';
import { FaMusic } from 'react-icons/fa';
import QRPayment from './QRPayment';

const previewContent = {
  1: {
    title: 'Beginner Guitar Masterclass — Sample Lesson',
    type: 'video',
    description: 'Lesson 1: Holding the Guitar & First Chords (C, G, D)',
    duration: '12:34'
  },
  2: {
    title: 'Vocal Warmup Pack — Sample Track',
    type: 'audio',
    description: 'Breathing Exercise 1 — Deep Breath & Lip Trills',
    duration: '3:20'
  },
  3: {
    title: 'Worship Rhythm Backing Track — Key of G',
    type: 'audio',
    description: 'Oceans (Where Feet May Fail) — Acoustic Groove',
    duration: '4:15'
  },
  4: {
    title: 'Music Theory Essentials — Chapter 1 Preview',
    type: 'ebook',
    description: 'The Musical Alphabet, Half Steps & Whole Steps, Staff Reading',
    duration: '15 pages'
  }
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [previewId, setPreviewId] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Beginner Guitar Masterclass',
      description: 'Complete video course covering chords, strumming patterns, and your first 10 songs.',
      price: 499,
      category: 'Course',
      icon: <FiMusic />,
      popular: true,
      features: ['10 HD Video Lessons', 'Chord Charts PDF', 'Practice Tracks', 'Lifetime Access']
    },
    {
      id: 2,
      name: 'Vocal Warmup Pack',
      description: 'Professional vocal warmup tracks and exercises used by Shawn himself.',
      price: 299,
      category: 'Audio Pack',
      icon: <FiHeadphones />,
      features: ['5 Audio Tracks', 'Breathing Exercises Guide', 'Pitch Training Loops', 'Daily Routine Chart']
    },
    {
      id: 3,
      name: 'Worship Rhythm Backing Tracks',
      description: 'Premium worship-style backing tracks in multiple keys. Ideal for practice and worship.',
      price: 399,
      category: 'Backing Tracks',
      icon: <FaMusic />,
      features: ['20 HQ Tracks', 'Multi-Key Versions', 'BPM Range 70-130', 'Studio Mastered']
    },
    {
      id: 4,
      name: 'Music Theory Essentials E-Book',
      description: 'Comprehensive guide to music theory for the modern musician.',
      price: 199,
      category: 'E-Book',
      icon: <FiBookOpen />,
      features: ['120+ Pages', 'Interactive Examples', 'Quiz Included', 'Printable']
    }
  ];

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handleClosePreview = () => setPreviewId(null);

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Digital Products</span>
          <h2 className="section-title">Level Up Your <span className="gradient-text">Musicianship</span></h2>
          <p className="section-subtitle">Premium learning materials and audio packs — preview before you buy</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div className={`product-card reveal ${product.popular ? 'popular' : ''}`} key={product.id}>
              {product.popular && <span className="popular-badge">Most Popular</span>}
              <span className="product-category">{product.category}</span>
              <div className="product-icon">{product.icon}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-features">
                {product.features.map((feature, i) => (
                  <span key={i}>✓ {feature}</span>
                ))}
              </div>
              <div className="product-footer">
                <span className="product-price">₹{product.price}</span>
                <div className="product-btns">
                  <button
                    className="btn btn-preview"
                    onClick={() => setPreviewId(product.id)}
                  >
                    <FiPlay /> Preview
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleBuy(product)}>
                    <FiDownload /> Get
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedProduct && (
          <div className="payment-modal" onClick={() => setShowPayment(false)}>
            <div className="payment-modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowPayment(false)}>×</button>
              <h3>Purchase: {selectedProduct.name}</h3>
              <p className="product-price-display">₹{selectedProduct.price}</p>
              <QRPayment
                productName={selectedProduct.name}
                price={selectedProduct.price}
                compact={true}
              />
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewId && (
          <div className="payment-modal" onClick={handleClosePreview}>
            <div className="payment-modal-content preview-modal" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={handleClosePreview}>×</button>
              <div className="preview-media-area">
                <div className="preview-player">
                  <div className="preview-poster">
                    {previewContent[previewId].type === 'video' ? (
                      <>
                        <img src="/shawn.jpg" alt="Lesson preview" className="preview-bg" />
                        <div className="preview-play-btn"><FiPlay /></div>
                      </>
                    ) : previewContent[previewId].type === 'ebook' ? (
                      <div className="preview-ebook-icon">
                        <FiBookOpen />
                        <span>Page 1 of 15</span>
                      </div>
                    ) : (
                      <div className="preview-audio-vis">
                        {[...Array(30)].map((_, i) => (
                          <div key={i} className="audio-bar" style={{
                            animationDelay: `${i * 0.1}s`,
                            height: `${20 + Math.random() * 80}%`
                          }}></div>
                        ))}
                        <div className="audio-play-btn"><FiPlay /></div>
                      </div>
                    )}
                    <div className="preview-duration-badge">{previewContent[previewId].duration}</div>
                  </div>
                  <div className="preview-info">
                    <span className="preview-type-badge">{previewContent[previewId].type}</span>
                    <h4>{previewContent[previewId].title}</h4>
                    <p>{previewContent[previewId].description}</p>
                  </div>
                </div>
              </div>
              <div className="preview-footer">
                <p>Full version included with purchase</p>
                <button className="btn btn-primary btn-sm" onClick={() => { handleClosePreview(); handleBuy(products.find(p => p.id === previewId)); }}>
                  <FiDownload /> Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;