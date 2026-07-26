import React from 'react';

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
}

export default NotFound;