import React from 'react';

export const AppFooter = () => {
  return (
    <div className="layout-footer">
      <span className="footer-text" style={{ marginRight: '5px' }}>
        <i className="pi pi-star" style={{ fontSize: '1.5rem' }}></i>
      </span>
      <span className="footer-text" style={{ marginLeft: '5px', marginRight: '5px' }}>
        ~ hope you like it,
      </span>
      <span className="footer-text" style={{ marginLeft: '5px' }}>
        <i className="pi pi-thumbs-up" style={{ fontSize: '1.5rem' }}></i>
      </span>
    </div>
  );
};
