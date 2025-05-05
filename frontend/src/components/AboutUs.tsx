import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400'
    },
    {
      name: 'David Kim',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
    }
  ];

  const faqs = [
    {
      question: 'How do I create a business account?',
      answer: 'To create a business account, click on the "For Business" link and follow the registration process...'
    },
    {
      question: 'How can I report a fake review?',
      answer: 'If you spot a review that violates our guidelines, click the flag icon next to the review...'
    },
    {
      question: 'What are the review guidelines?',
      answer: 'Our review guidelines ensure honest, helpful feedback. Reviews should be based on personal experience...'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="about-container">
      <section className="hero-section">
        <h1>About ReviewHub</h1>
        <p>Connecting people with great local businesses since 2024</p>
      </section>

      <section className="mission-section">
        <div className="mission-card">
          <h2>Our Mission</h2>
          <p>To connect people with great local businesses through trusted reviews and recommendations.</p>
        </div>
        <div className="mission-card">
          <h2>Our Values</h2>
          <p>Trust, transparency, and community are at the heart of everything we do.</p>
        </div>
        <div className="mission-card">
          <h2>Our Impact</h2>
          <p>Helping millions of users make informed decisions every day.</p>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <h3>{faq.question}</h3>
              {expandedFaq === index ? <ChevronUp /> : <ChevronDown />}
            </div>
            {expandedFaq === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>
    </div>
  );
};