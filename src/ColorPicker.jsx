/* eslint-disable react/prop-types */
import { useState } from 'react'
import { X } from 'lucide-react';

const ColorPickerModal = ({ 
  isOpen, 
  onClose, 
  onColorChange 
}) => {
  const [selectedColor, setSelectedColor] = useState('#6366f1'); // Default electric-indigo
  const predefinedColors = [
    '#6366f1',   // Electric Indigo
    '#8b5cf6',   // Violet
    '#d946ef',   // Fuchsia
    '#ec4899',   // Pink
    '#06b6d4',   // Cyan
    '#10b981',   // Emerald
    '#f59e0b',   // Amber
    '#ef4444',   // Red
  ];

  const handleColorChange = () => {
    onColorChange(selectedColor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="bg-charcoal border border-white/10 rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Selection Color
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Predefined Color Palette */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {predefinedColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-full h-10 rounded-lg transition-all duration-200 ${
                selectedColor === color 
                  ? 'ring-2 ring-white scale-105' 
                  : 'hover:scale-105 hover:opacity-80'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>

        {/* Custom Color Input */}
        <div className="flex items-center mb-6 bg-rich-black rounded-lg p-2 border border-white/5">
          <input 
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer bg-transparent border-none p-0 mr-3"
          />
          <span 
            className="text-sm font-mono text-gray-300 uppercase flex-grow"
          >
            {selectedColor}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-transparent text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleColorChange}
            className="px-6 py-2 bg-electric-indigo text-white font-semibold rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerModal;