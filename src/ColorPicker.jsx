/* eslint-disable react/prop-types */
import { useState } from 'react'

const ColorPickerModal = ({ 
  isOpen, 
  onClose, 
  onColorChange 
}) => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6'); // Default blue
  const predefinedColors = [
    '#3B82F6',   // Blue
    '#10B981',   // Green
    '#EF4444',   // Red
    '#8B5CF6',   // Purple
    '#F59E0B',   // Amber
    '#6366F1',   // Indigo
    '#EC4899',   // Pink
    '#64748B',   // Slate
  ];

  const handleColorChange = () => {
    onColorChange(selectedColor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 max-w-sm w-full"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Choose Selection Color
        </h2>
        
        {/* Predefined Color Palette */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {predefinedColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-full h-10 rounded-md transition-all duration-200 ${
                selectedColor === color 
                  ? 'ring-4 ring-blue-500 scale-105' 
                  : 'hover:scale-105 hover:shadow-md'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>

        {/* Custom Color Input */}
        <div className="flex items-center mb-4">
          <input 
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full h-12 appearance-none rounded-md"
          />
          <span 
            className="ml-2 text-sm dark:text-white"
            style={{ color: selectedColor }}
          >
            {selectedColor}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleColorChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Color
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerModal;