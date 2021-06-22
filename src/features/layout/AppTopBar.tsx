import React from 'react';

import Plant from '../plant/Plant';

export const AppTopBar = ({ onToggleMenu }: any) => {
  return (
    <div className="layout-topbar clearfix">
      <button type="button" className="p-link layout-menu-button" onClick={onToggleMenu}>
        <span className="pi pi-bars" />
      </button>
      <div className="layout-topbar-icons">
        <span className="layout-topbar-search">
          <Plant />
        </span>

        <button type="button" className="p-link">
          <span className="layout-topbar-item-text">User</span>
          <span className="layout-topbar-icon pi pi-user" />
        </button>
      </div>
    </div>
  );
};
