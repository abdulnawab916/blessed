import React from 'react';
import './ReviewsPage.css';

const ReviewsPage: React.FC = () => {
  return (
    <section id="reviews" className="reviews-page">
      <div className="reviews-container">
        <h2>Customer Reviews</h2>
        <div className="reviews-list">
          <div className="review-card">
            <p className="review-text">
              "Absolutely amazing service! My car looks brand new. Highly recommend Blessed Detailz!"
            </p>
            <span className="review-author">- Sarah L.</span>
          </div>
          <div className="review-card">
            <p className="review-text">
              "Professional, friendly, and attention to detail is unmatched. Will be back for sure."
            </p>
            <span className="review-author">- Mike D.</span>
          </div>
          <div className="review-card">
            <p className="review-text">
              "Best detailing experience I've ever had. Booking was easy and the results were fantastic."
            </p>
            <span className="review-author">- Emily R.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage; 