import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const categories = ['Values', 'Emotions', 'Relationships', 'Future', 'Experiences'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CategoryDropDown = ({ onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    onChange?.(selectedCategory);
  }, [selectedCategory, onChange]);

  return (
    <div className="relative z-0 w-full">
      <label className="block mb-2 font-semibold text-sm text-gray-200 select-none">Оберіть Категорію:</label>

      <Menu as="div" className="relative w-full">
  <div className="relative inline-flex group w-full">
    
    <div className="absolute -inset-px rounded-xl transition-all duration-1000 bg-gradient-to-r from-fuchsia-600 via-rose-600 to-orange-600 opacity-70 blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>

    <Menu.Button className="relative inline-flex w-full justify-between items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-xl shadow-sm hover:brightness-110  focus:outline-none transition-all duration-200 z-10">
      <span>{selectedCategory}</span>
      <ChevronDown size={16} aria-hidden="true" />
    </Menu.Button>
  </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 mt-2 w-full origin-top-right rounded-md bg-gray-900 shadow-lg focus:outline-none max-h-60 overflow-auto">
            {categories.map((category) => (
              <Menu.Item key={category}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={classNames(
                      active ? 'bg-gray-700 text-white' : 'text-gray-300',
                      'flex w-full items-center rounded-md px-4 py-2 text-sm focus:outline-none transition'
                    )}
                    aria-current={selectedCategory === category ? 'true' : undefined}
                  >
                    {category}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CategoryDropDown;
