export const fetchData = () => {
  return {
    tables: [
      { 
        id: 1, 
        tableNumber: 3,
        status: 'Occupied', 
        color: 'bg-blue-600',
        hasNewOrder: true,
        customers: [
          { id: 1, name: 'John Doe', items: [
            { name: 'Grilled Salmon', price: 22.99 },
            { name: 'Caesar Salad', price: 9.99 },
            { name: 'Iced Tea', price: 2.99 }
          ], paymentStatus: 'Unpaid'},
          { id: 2, name: 'Jane Smith', items: [
            { name: 'Steak', price: 28.99 },
            { name: 'Mashed Potatoes', price: 5.99 },
            { name: 'Wine', price: 8.99 }
          ], paymentStatus: 'Paid'}
        ]
      },
      { 
        id: 2, 
        tableNumber: 7,
        status: 'Occupied', 
        color: 'bg-purple-500',
        hasNewOrder: false,
        customers: [
          { id: 3, name: 'Bob Johnson', items: [
            { name: 'Burger', price: 14.99 },
            { name: 'Fries', price: 3.99 },
            { name: 'Soda', price: 2.50 }
          ], paymentStatus: 'Unpaid'}
        ]
      },
    ],
    orders: [
      {
        id: 1,
        tableNumber: 3,
        items: [
          { name: 'Grilled Salmon', quantity: 1, price: 22.99 },
          { name: 'Caesar Salad', quantity: 1, price: 9.99 },
          { name: 'Iced Tea', quantity: 1, price: 2.99 },
          { name: 'Steak', quantity: 1, price: 28.99 },
          { name: 'Mashed Potatoes', quantity: 1, price: 5.99 },
          { name: 'Wine', quantity: 1, price: 8.99 }
        ],
        status: 'Preparing',
        timeOrdered: '18:30',
      },
      {
        id: 2,
        tableNumber: 7,
        items: [
          { name: 'Burger', quantity: 1, price: 14.99 },
          { name: 'Fries', quantity: 1, price: 3.99 },
          { name: 'Soda', quantity: 1, price: 2.50 }
        ],
        status: 'Ready',
        timeOrdered: '18:45',
      },
    ]
  };
};
