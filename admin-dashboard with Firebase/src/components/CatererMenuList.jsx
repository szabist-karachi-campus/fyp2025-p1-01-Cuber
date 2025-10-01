import React from 'react';
import '../styles/CatererMenuList.css';

const CatererMenuList = ({ menuItems, onAccept, onReject }) => {
  return (
    <div>
      {menuItems.map((item, index) => (
        <div key={index} className={`menu-card ${item.status}`}>
          <div className="menu-header">
            <h4>{item.name}</h4>
            <span className={`status-badge ${item.status}`}>{item.status}</span>
          </div>
          <p>{item.description}</p>
          <div className="button-group">
            <button
              className="accept-btn"
              onClick={() => onAccept(index)}
              disabled={item.status !== 'pending'}
            >
              Accept
            </button>
            <button
              className="reject-btn"
              onClick={() => onReject(index)}
              disabled={item.status !== 'pending'}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatererMenuList;
