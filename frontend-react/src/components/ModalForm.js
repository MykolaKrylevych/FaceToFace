import React, { useState, useEffect } from 'react';
import LucideIconSelector from './LucideIconSelector';
import CategoryDropDown from './CategoryDropDown';
import confetti from 'canvas-confetti';
import { ICONS } from '../utils/IconConfig';
import renderIconToBase64 from '../utils/Base64Converter';

const ModalForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [color, setColor] = useState('#ff0000');
  const [selectedCategory, setSelectedCategory] = useState('Values');
  const [selectedIcon, setSelectedIcon] = useState({ name: 'Activity', component: ICONS['Activity'] });



  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ question, selectedColor: color, category: selectedCategory, image: setSelectedIcon });

    const payload = {
      question,
      missionType: selectedCategory,      
      image: renderIconToBase64(selectedIcon.component, color)                 
    };

    try {
      const response = await fetch('https://localhost:5001/api/Mission', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Помилка HTTP: ${response.status}`);
      }

      // 🎉 Конфеті
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // ✅ Очищення форми
      setQuestion('');
      setColor('#ff0000');
      setIsOpen(false);

      const resultText = await response.text(); // або .json() якщо бек повертає JSON
      console.log('Успіх:', resultText);

    } catch (error) {
      console.error('Помилка при надсиланні:', error.message);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:brightness-110 transition"
      >
        Send a Question
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-md bg-gray-900 text-gray-100 rounded-2xl shadow-xl p-6 animate-fade-in">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
              aria-label="Закрити"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Форма заповнення</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Запитання:</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Введіть запитання..."
                  required
                />
              </div>

              <LucideIconSelector onChange={setSelectedIcon} />
              <CategoryDropDown onChange={setSelectedCategory} />

              <div>
                <label className="block text-sm font-medium mb-1">Оберіть колір:</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 border border-gray-700 rounded-md cursor-pointer bg-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white font-semibold rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:brightness-110 transition"
              >
                Зберегти
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
