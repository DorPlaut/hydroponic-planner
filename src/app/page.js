// LandingPage.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Hydroponic Setup Builder and Planner</h1>

      <div className="card">
        <h2 className="subtitle">Welcome to Your Hydroponic Journey!</h2>

        <p className="paragraph">
          Our Hydroponic Setup Builder and Planner helps you design and
          visualize your perfect hydroponic system. Whether you're a beginner or
          an experienced grower, this tool will guide you through creating your
          ideal setup.
        </p>

        <h3 className="subheading">How to Use:</h3>
        <ol className="list">
          <li>Click the "Go to Editor" button below</li>
          <li>
            Adjust the parameters (width, height, number of tubes, etc.) to fit
            your space and needs
          </li>
          <li>
            Use the various toggles to show/hide elements and change views
          </li>
          <li>
            Review the materials list and measurements for your custom setup
          </li>
        </ol>

        <Link href="/editor" className="btn landing-btn">
          Go to Editor
        </Link>
      </div>
    </div>
  );
};

export default Home;
