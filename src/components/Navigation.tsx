import React from 'react';
import { Heart, GamepadIcon, Headphones, Users, BookOpen, Wind } from 'lucide-react';

interface NavigationProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function Navigation({ onPageChange, currentPage }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', icon: Heart, label: 'Home', color: 'text-pink-500' },
    { id: 'games', icon: GamepadIcon, label: 'Games', color: 'text-purple-500' },
    { id: 'audio', icon: Headphones, label: 'Audio', color: 'text-blue-500' },
    { id: 'breathe', icon: Wind, label: 'Breathe', color: 'text-cyan-500' },
    { id: 'journal', icon: BookOpen, label: 'Journal', color: 'text-green-500' },
    { id: 'support', icon: Users, label: 'Support', color: 'text-orange-500' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              color={item.color}
              active={currentPage === item.id}
              onClick={() => onPageChange(item.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, color, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`nav-item ${active ? 'active' : ''} group`}
    >
      <div className={`p-2 rounded-xl transition-all duration-300 ${
        active 
          ? `${color} bg-current/10 shadow-lg scale-110` 
          : 'text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-50'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-xs font-medium transition-all duration-300 ${
        active ? color : 'text-gray-500 group-hover:text-gray-700'
      }`}>
        {label}
      </span>
      
      {/* Active indicator */}
      {active && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-pulse" />
      )}
    </button>
  );
}