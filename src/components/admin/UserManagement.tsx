import React, { useState } from 'react';
import { User, Edit, Trash, UserPlus } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const dummyUsers: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Staff', active: true },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', active: false },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Staff', active: true },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Customer', active: true },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(dummyUsers);

  const handleAddUser = () => {
    // Implement add user functionality
    console.log('Add user');
  };

  const handleEditUser = (userId: string) => {
    // Implement edit user functionality
    console.log('Edit user', userId);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
        >
          <UserPlus className="mr-2" /> Add User
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 rounded ${user.active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {user.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="text-blue-500 mr-2"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleToggleUserStatus(user.id)}
                  className={`${user.active ? 'text-red-500' : 'text-green-500'}`}
                >
                  {user.active ? <User size={18} /> : <UserPlus size={18} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;