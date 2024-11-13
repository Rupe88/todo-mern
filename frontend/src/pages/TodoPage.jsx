import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoContext } from '../context/TodoContext';
import { Calendar, Plus, Trash2, Edit, Check } from 'lucide-react';

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
  const [editTaskId, setEditTaskId] = useState(null);

  const priorities = {
    low: 'bg-orange-100 text-orange-700',
    medium: 'bg-red-100 text-red-700',
    high: 'bg-purple-100 text-purple-700'
  };

  const statuses = {
    active: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateTask(editTaskId, newTask);
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      await createTask(newTask);
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
    setShowForm(true);
  };

  const handleComplete = async (task) => {
    await completeTask(task._id, { status: 'completed' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-orange-50 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-orange-800">My Tasks</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(!showForm)}
            className="mb-4 flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus size={20} />
            {isEditing ? 'Edit Task' : 'Add New Task'}
          </motion.button>

          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSubmit}
                className="mb-6 overflow-hidden"
              >
                <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    required
                  />
                  
                  <textarea
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    rows="3"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input
                        type="datetime-local"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                        className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                        className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
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
                        className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                      >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors w-full"
                  >
                    {isEditing ? 'Update Task' : 'Create Task'}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="text-center py-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"
              />
            </div>
          ) : (
            <motion.div layout className="space-y-4">
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.div
                    key={task._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`bg-white rounded-lg shadow p-4 border transition-colors ${
                      task.status === 'completed' ? 'border-green-100' : 'border-orange-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${
                            task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'
                          }`}>{task.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${priorities[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${statuses[task.status]}`}>
                            {task.status}
                          </span>
                        </div>
                        
                        <p className={`text-gray-600 mb-2 ${
                          task.status === 'completed' ? 'line-through text-gray-400' : ''
                        }`}>{task.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
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
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TodoPage;