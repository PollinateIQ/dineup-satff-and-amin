import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import MenuCategory from '../components/MenuCategory';
import ShoppingCart from '../components/ShoppingCart';
import FloatingActionButton from '../components/FloatingActionButton';
import { Clock, ShoppingBag } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Skeleton } from "../components/ui/skeleton";
import { getRestaurants, getRestaurantDetails, getOrderHistory } from '../utils/api';
import { Restaurant, MenuItem, Order, MenuCategory as MenuCategoryType } from '../types';

const MenuPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategoryType[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const fetchedRestaurants = await getRestaurants();
        setRestaurants(fetchedRestaurants);
        if (fetchedRestaurants.length > 0) {
          setSelectedRestaurant(fetchedRestaurants[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch restaurants'));
        console.error('Error fetching restaurants:', err);
      }
    };

    const fetchLastOrder = async () => {
      try {
        const orders = await getOrderHistory(1); // Get only the most recent order
        if (orders.length > 0) {
          setLastOrder(orders[0]);
        } else {
          setLastOrder(null);
        }
      } catch (err) {
        console.error('Error fetching last order:', err);
        setLastOrder(null);
      }
    };

    fetchRestaurants();
    fetchLastOrder();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (selectedRestaurant) {
        setIsLoading(true);
        try {
          const restaurantDetails = await getRestaurantDetails(selectedRestaurant.id);
          if (restaurantDetails) {
            setMenuItems(restaurantDetails.menu_items || []);
            setMenuCategories(restaurantDetails.menu_categories || []);
          } else {
            setError(new Error('Failed to fetch restaurant details'));
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch menu items'));
          console.error('Error fetching menu items:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMenuItems();
  }, [selectedRestaurant]);

  const categories = ['all', ...menuCategories.map(category => category.name)];

  const filteredMenu = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => {
        const category = menuCategories.find(cat => cat.id === item.category);
        return category?.name === activeCategory;
      });

  // Group menu items by category
  const menuItemsByCategory = filteredMenu.reduce((acc, item) => {
    const category = menuCategories.find(cat => cat.id === item.category);
    const categoryName = category ? category.name : 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleTakeOut = () => {
    if (lastOrder) {
      navigate(`/menu?reorder=${lastOrder.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-2/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeCategory}>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 pr-0 md:pr-4">
                {Object.entries(menuItemsByCategory).map(([category, items], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MenuCategory category={{ name: category, items }} />
                  </motion.div>
                ))}
              </div>
              <div className="w-full md:w-1/3 mt-8 md:mt-0">
                <ShoppingCart />
                {lastOrder && (
                  <>
                    <Button asChild className="w-full mt-4">
                      <Link to={`/order/${lastOrder.id}`}>
                        <Clock className="mr-2" />
                        View Current Order
                      </Link>
                    </Button>
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle>Last Order</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Order #{lastOrder.id}</p>
                        <p className="text-sm text-gray-600">Date: {new Date(lastOrder.created_at).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 mb-4">Total: ${lastOrder.total_price.toFixed(2)}</p>
                        <Button onClick={handleTakeOut} className="w-full">
                          <ShoppingBag className="mr-2" />
                          Take Out
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      {lastOrder && (
        <FloatingActionButton
          currentOrderId={lastOrder.id.toString()}
          lastOrderId={lastOrder.id.toString()}
          onTakeOut={handleTakeOut}
        />
      )}
    </div>
  );
};

export default MenuPage;
