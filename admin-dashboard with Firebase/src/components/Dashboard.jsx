import React, { useState } from "react";
import "../styles/Dashboard.css";
import {
  FaHome,
  FaList,
  FaUsers,
  FaTrash,
  FaUndo,
  FaUserCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewType, setViewType] = useState("");
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [trash, setTrash] = useState([]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  // ✅ Dummy Data (isko aap DB se bhi laa sakte ho)
  const [menuItems, setMenuItems] = useState([
    { name: "Biryani", description: "Delicious chicken biryani", status: "pending" },
    { name: "Korma", description: "Mughlai chicken curry", status: "pending" },
  ]);

  const [caterers, setCaterers] = useState([
    { name: "Caterer 1", email: "cat1@email.com", phone: "1234567890" },
    { name: "Caterer 2", email: "cat2@email.com", phone: "0987654321" },
  ]);

  const [customers, setCustomers] = useState([
    { name: "Customer A", email: "custA@email.com", phone: "9876543210" },
    { name: "Customer B", email: "custB@email.com", phone: "8765432109" },
  ]);

  // ✅ View user details
  const handleView = (user, type) => {
    setSelectedUser(user);
    setViewType(type);
  };

  // ✅ Delete user
  const handleDelete = (index, type) => {
    const targetList = type === "caterer" ? caterers : customers;
    const deletedUser = targetList[index];

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${deletedUser.name}?`
    );
    if (!confirmDelete) return;

    const updatedList = [...targetList];
    updatedList.splice(index, 1);

    if (type === "caterer") {
      setCaterers(updatedList);
    } else {
      setCustomers(updatedList);
    }

    setTrash((prev) => [...prev, { ...deletedUser, type }]);
    setRecentlyDeleted({ user: deletedUser, index, type });
    setShowUndo(true);

    setTimeout(() => {
      setShowUndo(false);
      setRecentlyDeleted(null);
    }, 5000);
  };

  // ✅ Undo delete
  const handleUndo = () => {
    if (!recentlyDeleted) return;
    const { user, index, type } = recentlyDeleted;

    const updatedTrash = trash.filter((item) => item.email !== user.email);
    setTrash(updatedTrash);

    if (type === "caterer") {
      const updated = [...caterers];
      updated.splice(index, 0, user);
      setCaterers(updated);
    } else {
      const updated = [...customers];
      updated.splice(index, 0, user);
      setCustomers(updated);
    }

    setRecentlyDeleted(null);
    setShowUndo(false);
  };

  // ✅ Restore from trash
  const restoreFromTrash = (item) => {
    if (item.type === "caterer") {
      setCaterers([...caterers, item]);
    } else {
      setCustomers([...customers, item]);
    }
    setTrash(trash.filter((t) => t.email !== item.email));
  };

  // ✅ Accept/Reject Menu Items
  const handleAccept = (i) => {
    const updated = [...menuItems];
    updated[i].status = "accepted";
    setMenuItems(updated);
  };

  const handleReject = (i) => {
    const updated = [...menuItems];
    updated[i].status = "rejected";
    setMenuItems(updated);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li onClick={() => setActiveTab("overview")}>
            <FaHome /> Dashboard
          </li>
          <li onClick={() => setActiveTab("menu")}>
            <FaList /> Menu Items
          </li>
          <li onClick={() => setActiveTab("users")}>
            <FaUsers /> Users
          </li>
          <li onClick={() => setActiveTab("trash")}>
            <FaTrash /> Trash
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
          <div className="profile-icon" onClick={toggleProfile}>
            <FaUserCircle />
            {profileOpen && (
              <div className="profile-dropdown">
                <p>Admin</p>
                <button>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Undo Message */}
        {showUndo && (
          <div className="undo-message">
            User deleted.{" "}
            <button onClick={handleUndo}>
              <FaUndo /> Undo
            </button>
          </div>
        )}

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="dashboard-boxes">
            <div className="box">Total Caterers: {caterers.length}</div>
            <div className="box">Total Customers: {customers.length}</div>
            <div className="box">Pending Menu Items: {menuItems.filter(m=>m.status==="pending").length}</div>
          </div>
        )}

        {/* Menu Items */}
        {activeTab === "menu" && (
          <div>
            <h3>Menu Items</h3>
            {menuItems.map((item, i) => (
              <div key={i} className="menu-card">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>Status: {item.status}</p>
                {item.status === "pending" && (
                  <div className="button-group">
                    <button onClick={() => handleAccept(i)}>Accept</button>
                    <button onClick={() => handleReject(i)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div>
            <h3>Caterers</h3>
            {caterers.map((cat, i) => (
              <div key={i} className="user-card">
                <span>{cat.name}</span>
                <div className="button-group">
                  <button onClick={() => handleView(cat, "caterer")}>View</button>
                  <button onClick={() => handleDelete(i, "caterer")}>Delete</button>
                </div>
              </div>
            ))}

            <h3>Customers</h3>
            {customers.map((cust, i) => (
              <div key={i} className="user-card">
                <span>{cust.name}</span>
                <div className="button-group">
                  <button onClick={() => handleView(cust, "customer")}>View</button>
                  <button onClick={() => handleDelete(i, "customer")}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trash */}
        {activeTab === "trash" && (
          <div>
            <h3>Trash Bin</h3>
            {trash.length === 0 ? (
              <p>No deleted users.</p>
            ) : (
              trash.map((item, i) => (
                <div key={i} className="user-card">
                  <span>
                    {item.name} ({item.type})
                  </span>
                  <button onClick={() => restoreFromTrash(item)}>Restore</button>
                </div>
              ))
            )}
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <div className="user-modal">
            <div className="user-modal-content">
              <h3>
                {viewType === "caterer" ? "Caterer" : "Customer"} Details
              </h3>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
