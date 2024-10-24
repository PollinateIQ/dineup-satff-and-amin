import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Utensils, QrCode, Smartphone, Users, ChefHat, BarChart, Sliders, Calendar } from 'lucide-react'
import Footer from '../components/Footer'

const FeatureSection: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 text-white px-4 py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white rounded-full p-4">
            <Utensils className="h-24 w-24 text-blue-600" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-bold mb-4 text-center"
        >
          Welcome to DineUp
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl mb-8 text-center max-w-2xl"
        >
          Enhance your dining experience with our digital menu and ordering system.
        </motion.p>
        <div className="space-y-4 w-full max-w-xs">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/menu"
              className="block w-full bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-center hover:bg-blue-100 transition duration-300"
            >
              View Menu
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link
              to="/scan"
              className="block w-full bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-white hover:text-blue-600 transition duration-300 flex items-center justify-center"
            >
              <QrCode className="mr-2" />
              Scan QR Code
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureSection
              icon={<QrCode size={48} />}
              title="QR-based Digital Menu"
              description="Browse, order, and pay seamlessly, either individually or as a group."
            />
            <FeatureSection
              icon={<Smartphone size={48} />}
              title="Staff Management System"
              description="Streamline order tracking, updates, and customer interactions."
            />
            <FeatureSection
              icon={<BarChart size={48} />}
              title="Admin Dashboard"
              description="Manage inventory, analyze sales, and set role-based permissions."
            />
            <FeatureSection
              icon={<Sliders size={48} />}
              title="Customizable Branding"
              description="Tailor the platform to match your restaurant's unique identity."
            />
            <FeatureSection
              icon={<Users size={48} />}
              title="Group Ordering"
              description="Enable seamless group orders for a better dining experience."
            />
            <FeatureSection
              icon={<ChefHat size={48} />}
              title="Versatile Platform"
              description="Suitable for fine-dining, casual eateries, and fast-food chains."
            />
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Future Development Plans</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              className="bg-blue-100 p-8 rounded-full"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calendar size={64} className="text-blue-500" />
            </motion.div>
            <div className="max-w-md">
              <h3 className="text-2xl font-semibold mb-4">Table Reservation System</h3>
              <p className="text-gray-600">
                We're working on integrating a robust table reservation system to further streamline your restaurant operations and enhance customer convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
          <p className="mb-8 text-xl">Join DineUp today and elevate your dining experience!</p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage