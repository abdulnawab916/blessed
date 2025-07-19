import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <HomePage />
        <AboutPage />
        <ReviewsPage />
      </main>
    </div>
  );
}

export default App;
