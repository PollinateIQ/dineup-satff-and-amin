import React from 'react';
import { MenuCategory as MenuCategoryType } from '../types/menu';
import MenuItem from './MenuItem';

interface MenuCategoryProps {
  category: MenuCategoryType;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;