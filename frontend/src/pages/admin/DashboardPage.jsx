import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, Users, Calendar, Loader2, Eye } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import Modal from '../../compoennts/Modal';
const DashboardPage = () => {
  const { users, loading, fetchUsers, deleteUser, fetchUserProfile } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewProfile = async (userId) => {
    try {
      const profile = await fetchUserProfile(userId);
      setSelectedUserProfile(profile);
      setProfileModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleSearch = () => {
    const searchParams = {
      name: searchTerm,
      startDate,
      endDate,
    };
    fetchUsers(searchParams);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <Users size={32} className="text-red-500" />
          <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        </motion.div>
        <button onClick={handleSearch} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Search
        </button>
      </div>

      {/* Search and Filter Section */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" size={20} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" size={20} />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
      </motion.div>

      {/* Users List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-red-600" size={48} />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <motion.div key={user._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{user.name || 'N/A'}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                {user.role !== 'employee' && (
                  <p className="text-sm text-gray-500 flex items-center">
                    Role: 
                    <span className="ml-2 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      {user.role}
                    </span>
                  </p>
                )}
                <button
                  onClick={() => handleViewProfile(user._id)}
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  <Eye size={14} />
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {users.length === 0 && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-gray-500">
          No users found
        </motion.div>
      )}

      {/* Profile Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)}>
        {selectedUserProfile ? (
          <>
            <h2 className="text-lg font-bold mb-2">{selectedUserProfile.user.name}s Profile</h2>
            <p>Email: {selectedUserProfile.user.email}</p>
            <p>Role: {selectedUserProfile.user.role}</p>
            <p>Joined: {new Date(selectedUserProfile.user.createdAt).toLocaleDateString()}</p>

            <h3 className="mt-4 text-md font-semibold">Todos</h3>
            <ul className="space-y-2">
              {selectedUserProfile.todos.map((todo) => (
                <li key={todo._id} className="text-gray-700">
                  <strong>{todo.title}</strong> - {todo.description} <br />
                  Status: {todo.status}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </motion.div>
  );
};

export default DashboardPage;