export const calculateTotal = (items: any[]) => {
  return items.reduce((total, item) => total + item.price, 0).toFixed(2);
};

export const calculateTableTotal = (customers: any[]) => {
  return customers.reduce((total, customer) => 
    total + customer.items.reduce((subtotal: number, item: any) => subtotal + item.price, 0)
  , 0).toFixed(2);
};
