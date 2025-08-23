'use client';
import { useState, useEffect } from 'react';

interface MenuItem {
  id: string;
  label: string;
}

interface StickyMenuProps {
  menuItems: MenuItem[];
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    // Offset pentru navbar (aproximativ 80px)
    const yOffset = -100;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export default function StickyMenu({ menuItems }: StickyMenuProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset pentru navbar

      for (let i = menuItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(menuItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  return (
    <div className="hidden lg:block fixed top-1/3 right-8 z-40">
      <nav className="flex flex-col gap-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-3 border border-orange-200">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group px-4 py-2 rounded-lg font-semibold transition-all duration-200 relative text-left ${
                isActive 
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md' 
                  : 'text-red-700 hover:bg-orange-100'
              }`}
            >
              {item.label}
              <span 
                className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </button>
          );
        })}
      </nav>
    </div>
  );
} 