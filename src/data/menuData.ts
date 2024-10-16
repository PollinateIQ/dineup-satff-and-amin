import { MenuCategory } from '../types/menu';

export const menuData: MenuCategory[] = [
  {
    id: 'starters',
    name: 'Starters',
    items: [
      {
        id: 'bruschetta',
        name: 'Bruschetta',
        description: 'Grilled bread rubbed with garlic and topped with olive oil, salt, and tomato.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: 'starters'
      },
      {
        id: 'calamari',
        name: 'Calamari',
        description: 'Crispy fried squid served with marinara sauce.',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: 'starters'
      }
    ]
  },
  {
    id: 'main-courses',
    name: 'Main Courses',
    items: [
      {
        id: 'steak',
        name: 'Ribeye Steak',
        description: 'Grilled ribeye steak served with roasted vegetables and mashed potatoes.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: 'main-courses'
      },
      {
        id: 'salmon',
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon grilled to perfection, served with quinoa and asparagus.',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: 'main-courses'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        description: 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: 'desserts'
      },
      {
        id: 'cheesecake',
        name: 'New York Cheesecake',
        description: 'Rich and creamy cheesecake with a graham cracker crust, topped with fresh berries.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        category: 'desserts'
      }
    ]
  }
];