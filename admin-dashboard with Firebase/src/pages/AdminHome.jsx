import React, { useState } from "react";
import "../styles/AdminHome.css";

const AdminHome = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedUserId, setSelectedUserId] = useState(null); // ✅ selected user

  // Menu Items
  const [menuItems] = useState([
    { id: 1, name: "Biryani", desc: "Delicious chicken biryani", status: "Pending" },
    { id: 2, name: "Korma", desc: "Mughlai chicken curry", status: "Pending" },
  ]);

  // Users (Caterers)
  const [users] = useState([
    { id: 1, name: "Caterer 1", info: "cati@email.com", status: "Active" },
    { id: 2, name: "Caterer 2", info: "0967654821", status: "Active" },
  ]);

  // Customers
  const [customers] = useState([
    { id: 1, name: "Customer A", info: "cust@email.com", status: "Active" },
    { id: 2, name: "Customer B", info: "custB@email.com", status: "Active" },
  ]);

  const [trash] = useState([]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const menuTabs = ["Overview", "Menu", "Users", "Trash"];

  // Counts
  const totalCustomers = customers.length;
  const totalCaterers = users.length;
  const pendingMenus = menuItems.filter(item => item.status === "Pending").length;

  // ✅ View button handler
  const handleViewUser = (userId) => {
    setActiveTab("Users");
    setSelectedUserId(userId);
  };

  return (
    <div className={`admin-dashboard ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Admin</h2>
        <ul>
          {menuTabs.map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                setSelectedUserId(null); // reset selected user on tab switch
              }}
            >
              {tab === "Overview" && "🏠 Dashboard"}
              {tab === "Menu" && "📋 Menu Items"}
              {tab === "Users" && "👥 Users"}
              {tab === "Trash" && "🗑️ Trash"}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="tabs">
            {menuTabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedUserId(null);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="top-actions">
            <button className="btn-darkmode" onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <div className="profile">
              <span>👤 Admin ▾</span>
            </div>
          </div>
        </div>

        {/* Overview */}
        {activeTab === "Overview" && (
          <div>
            {/* Summary Cards */}
            <div className="summary-cards">
              <div className="summary-card">
                <h2>{totalCustomers}</h2>
                <p>Total Customers</p>
              </div>
              <div className="summary-card">
                <h2>{totalCaterers}</h2>
                <p>Total Caterers</p>
              </div>
              <div className="summary-card">
                <h2>{pendingMenus}</h2>
                <p>Pending Menu Items</p>
              </div>
            </div>

            {/* Grid Boxes */}
            <div className="grid">
              {/* Menu Items */}
              <div className="box">
                <h3>Menu Items</h3>
                {menuItems.map(item => (
                  <div className="menu-item" key={item.id}>
                    <h4>
                      {item.name}{" "}
                      <span className={`status ${item.status.toLowerCase()}`}>
                        ({item.status})
                      </span>
                    </h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Users */}
              <div className="box">
                <h3>Users</h3>
                {users.map(user => (
                  <div className="user-item" key={user.id}>
                    <span>👤 {user.name}</span>
                    <small>{user.info}</small>
                    <span className="status active">({user.status})</span>
                    <button className="btn-view" onClick={() => handleViewUser(user.id)}>
                      View
                    </button>
                  </div>
                ))}
              </div>

              {/* Customers */}
              <div className="box">
                <h3>Customers</h3>
                {customers.map(customer => (
                  <div className="user-item" key={customer.id}>
                    <span>👤 {customer.name}</span>
                    <small>{customer.info}</small>
                    <span className="status active">({customer.status})</span>
                    <button className="btn-view" onClick={() => handleViewUser(customer.id)}>
                      View
                    </button>
                  </div>
                ))}
              </div>

              {/* Trash */}
              <div className="box">
                <h3>Trash</h3>
                {trash.length === 0 ? (
                  <p>No deleted users</p>
                ) : (
                  trash.map((t, index) => (
                    <p key={index}>
                      {t.type}: {t.name} ({t.info})
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "Users" && (
          <div className="users-list">
            <h2>All Users</h2>
            {users.concat(customers).map((user) => (
              <div
                key={user.id}
                className={`user-item ${selectedUserId === user.id ? "highlight" : ""}`}
              >
                <span>👤 {user.name}</span>
                <small>{user.info}</small>
                <span className="status active">({user.status})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
