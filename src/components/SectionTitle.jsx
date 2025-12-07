import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ children }) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{children}</h2>
      <div className="title-underline-animated"></div>
    </div>
  );
};

export default SectionTitle;
