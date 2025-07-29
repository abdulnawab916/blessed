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
              "Blessed detailz did an amazing job on my car—the interior looked spotless and he was on time and professional. Highly recommend if you want your car looking fresh."
            </p>
            <span className="review-author">- Asif</span>
          </div>
          <div className="review-card">
            <p className="review-text">
              "Super impressed with the service! My car smelled great, and all the stains were gone. The detailer was friendly and worked quickly. I'll be telling my friends about him."
            </p>
            <span className="review-author">- Zarmina</span>
          </div>
          <div className="review-card">
            <p className="review-text">
              "Blessed Detailz made my Honda Civic's paint look like I just got it off the lot. Seriously impressed with the work they did!"
            </p>
            <span className="review-author">- Abdul</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage; 