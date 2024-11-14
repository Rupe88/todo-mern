import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoContext } from '../context/TodoContext';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Edit, 
  Check,
  X,
  Clock,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

const TodoPage = () => {
  const { tasks, loading, createTask, updateTask, deleteTask, completeTask } = useContext(TodoContext);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'active',
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState();
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const priorities = {
    low: 'bg-blue-50 text-blue-600 border border-blue-200',
    medium: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
    high: 'bg-red-50 text-red-600 border border-red-200'
  };

  const statuses = {
    active: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    completed: 'bg-gray-50 text-gray-600 border border-gray-200',
    pending: 'bg-purple-50 text-purple-600 border border-purple-200'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { ...newTask, file };
    
    if (isEditing) {
      await updateTask(editTaskId, taskData);
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      await createTask(taskData);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
      status: 'active',
    });
    setFile(null);
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setEditTaskId(task._id);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
      priority: task.priority,
      status: task.status,
    });
    setFile(task.file);
    setShowForm(true);
  };

  const handleComplete = async (task) => {
    await completeTask(task._id, { status: 'completed' });
  };

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(task => filterPriority === 'all' || task.priority === filterPriority)
    .filter(task => filterStatus === 'all' || task.status === filterStatus);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              {isEditing ? 'Edit Task' : 'New Task'}
            </motion.button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters and Search Section */}
            <div className="lg:w-1/4 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Filter size={18} />
                  <span>Filters</span>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Priority</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="lg:w-3/4">
              <AnimatePresence>
                {showForm && (
                  <motion.form
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-sm p-6 mb-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {isEditing ? 'Edit Task' : 'Create New Task'}
                        </h2>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        required
                      />

                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setFile(e.target.files[0])}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        />
                      </div>

                      <textarea
                        placeholder="Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        rows="3"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                          <input
                            type="datetime-local"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={newTask.status}
                            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                          >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        {isEditing ? 'Update Task' : 'Create Task'}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
                  />
                </div>
              ) : (
                <motion.div layout className="space-y-4">
                  {filteredTasks.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                      <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No tasks found</h3>
                      <p className="text-gray-500">Try adjusting your filters or create a new task</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {filteredTasks.map((task) => (
                        <motion.div
                          key={task._id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                            task.status === 'completed' ? 'border-l-gray-400' :
                            task.priority === 'high' ? 'border-l-red-500' :
                            task.priority === 'medium' ? 'border-l-yellow-500' :
                            'border-l-blue-500'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className={`text-lg font-semibold ${
                                  task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                                }`}>
                                  {task.title}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorities[task.priority]}`}>
                                  {task.priority}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statuses[task.status]}`}>
                                  {task.status}
                                </span>
                              </div>

                              {task.file && (
                                <img
                                  src={task.file}
                                  alt="Task Attachment"
                                  className="w-full max-w-xs rounded-lg mb-4 object-cover"
                                />
                              )}

                              <p className={`text-gray-600 mb-4 ${
                                task.status === 'completed' ? 'text-gray-400 line-through' : ''
                              }`}>
                                {task.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar size={16} />
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                {task.status !== 'completed' && (
                                  <span className="flex items-center gap-1">
                                    <Clock size={16} />
                                    Due by {new Date(task.dueDate).toLocaleTimeString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {task.status !== 'completed' && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleComplete(task)}
                                  className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                                >
                                  <Check size={20} />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(task)}
                                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                              >
                                <Edit size={20} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteTask(task._id)}
                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                              >
                                <Trash2 size={20} />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoPage;