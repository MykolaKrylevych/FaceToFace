import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { ICONS } from '../utils/IconConfig';


const iconNames = Object.keys(ICONS);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const LucideIconSelector = ({ onChange }) => {
  const [selectedIcon, setSelectedIcon] = useState('Activity');

  useEffect(() => {
    onChange?.({ name: selectedIcon, component: ICONS[selectedIcon] });
  }, [selectedIcon, onChange]);

  const SelectedIcon = ICONS[selectedIcon];

  return (
    <div>
      
      <label className="block mb-2 font-semibold select-none">Оберіть іконку:</label>
      <Menu as="div" className="relative w-full">
  <div className="relative inline-flex group w-full">
    
    <div className="absolute -inset-px rounded-xl opacity-70 blur-lg transition-all duration-1000 bg-gradient-to-r from-teal-300 via-lime-300 to-green-400 group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>

    
    <Menu.Button className="relative inline-flex w-full justify-between items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-xl transition-all duration-200 hover:brightness-110 focus:outline-none z-10">
      <div className="flex items-center gap-2">
        {SelectedIcon && <SelectedIcon size={18} aria-hidden="true" />}
        <span>{selectedIcon}</span>
      </div>
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
          <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
            {iconNames.map((name) => {
              const Icon = ICONS[name];
              return (
                <Menu.Item key={name}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedIcon(name)}
                      className={classNames(
                        active ? 'bg-gray-700 text-white' : 'text-gray-300',
                        'flex w-full items-center rounded-md px-3 py-2 text-sm gap-2 focus:outline-none'
                      )}
                      aria-current={selectedIcon === name ? 'true' : undefined}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {name}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LucideIconSelector;
