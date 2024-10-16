import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MobileNavigation from './MobileNavigation'
import { Utensils } from 'lucide-react'

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  // Mock order ID for demonstration
  const currentOrderId = '123456';

  return (
    <>
      <header className="bg-white shadow-md hidden md:block">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
            <Utensils className="h-8 w-8 mr-2" />
            DineUp
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/menu" className="text-gray-600 hover:text-blue-600">Menu</Link></li>
              <li><Link to={`/order/${currentOrderId}`} className="text-gray-600 hover:text-blue-600">View Current Order</Link></li>
              {user ? (
                <>
                  <li><Link to="/order-history" className="text-gray-600 hover:text-blue-600">Order History</Link></li>
                  <li><span className="text-gray-600">Welcome, {user.username}</span></li>
                  <li><button onClick={logout} className="text-gray-600 hover:text-blue-600">Logout</button></li>
                  {user.role === 'admin' && (
                    <li><Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin Dashboard</Link></li>
                  )}
                </>
              ) : (
                <>
                  <li><Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link></li>
                  <li><Link to="/signup" className="text-gray-600 hover:text-blue-600">Signup</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <MobileNavigation currentOrderId={currentOrderId} />
    </>
  )
}

export default Header