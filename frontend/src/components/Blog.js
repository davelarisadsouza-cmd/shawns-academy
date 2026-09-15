import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCalendar, FiMusic, FiMessageCircle } from 'react-icons/fi';
import { FaQuoteLeft, FaInstagram } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setPosts(res.data))
      .catch(err => console.log('Blog fetch error', err))
      .finally(() => setLoading(false));
  }, []);

  const localPosts = [
    {
      _id: 'local1',
      title: 'Finding Your Voice: A Beginner\'s Journey',
      excerpt: 'Everyone has a voice. Discover how to find yours, nurture it, and let it shine.',
      content: 'When I first started teaching music, I realized that the biggest obstacle for most students wasn\'t technique—it was self-doubt. Your voice is unique. God gave you one voice and no one else has it. The journey of finding your voice begins with accepting where you are and being patient with the process.\n\nStart with simple exercises, record yourself often, and don\'t compare your beginning to someone else\'s middle. In worship, authenticity matters more than perfection. Keep practicing, keep praying, and your voice will emerge.',
      date: '2025-01-15',
      category: 'Vocal Training',
      readTime: '5 min read'
    },
    {
      _id: 'local2',
      title: 'The Heart of Worship Leading',
      excerpt: 'It\'s not about the songs you lead. It\'s about the hearts you touch.',
      content: 'Worship leading is a sacred responsibility. Before you lead others, you must first lead yourself into the presence of God. The songs matter, but your posture of heart matters more.\n\nI\'ve learned from my pastors—Pastor Sijo Mathew and Pastor Ashwini Sijo Mathew—that worship is a lifestyle, not just a Sunday morning moment. Prepare your heart before you prepare your playlist.',
      date: '2025-02-10',
      category: 'Worship',
      readTime: '7 min read'
    },
    {
      _id: 'local3',
      title: 'Home Studio Setup on a Budget',
      excerpt: 'You don\'t need a $10,000 studio to make great music. Here\'s how to start smart.',
      content: 'Many aspiring producers think they need expensive gear to make quality music. The truth is, your creativity matters more than your equipment. Start with an audio interface, a decent microphone, and free DAW software.\n\nFocus on learning your room\'s acoustics, mastering basic EQ and compression, and creating a space where you can focus. As you grow, your gear will grow with you.',
      date: '2025-03-05',
      category: 'Production',
      readTime: '6 min read'
    },
    {
      _id: 'local4',
      title: 'Practice Makes Progress',
      excerpt: 'The difference between good and great musicians is how they practice, not how much they practice.',
      content: 'Practice doesn\'t make perfect—practice makes progress. The key is deliberate practice: focused, intentional, and structured. Spend 30 focused minutes daily over 3 hours of unfocused playing.\n\nBreak difficult passages into small sections. Record yourself. Set weekly goals. And always, always play with emotion. Music is the language of the soul.',
      date: '2025-04-20',
      category: 'Practice Tips',
      readTime: '4 min read'
    }
  ];

  const allPosts = posts.length > 0 ? posts : localPosts;

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Journal</span>
          <h2 className="section-title">From Shawn's <span className="gradient-text">Blog</span></h2>
          <p className="section-subtitle">Inspiration, tips, and thoughts on music and worship</p>
        </div>

        <div className="blog-grid">
          {allPosts.map((post, index) => (
            <div className="blog-card reveal" key={post._id}>
              <div className="blog-card-header">
                <span className="blog-category">{post.category || post.tags?.[0] || 'Music'}</span>
                <span className="blog-date"><FiCalendar /> {new Date(post.date || post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="blog-quote-icon"><FaQuoteLeft /></div>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              {expanded === post._id && (
                <div className="blog-content">
                  {post.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              <div className="blog-footer">
                <span className="blog-author">- {post.author || 'Shawn Saldana'}</span>
                <button className="read-more-btn" onClick={() => toggleExpand(post._id)}>
                  {expanded === post._id ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="text-center">Loading posts...</div>}
      </div>
    </section>
  );
};

export default Blog;