import React from 'react';
import { ChromePicker } from 'react-color';

const CardEditor = ({ cardData, onCardDataChange, onGenerateCard, loading }) => {
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] = React.useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = React.useState(false);

  const templates = [
    { id: 'lantern', name: '🏮 Lantern', value: 'lantern' },
    { id: 'lotus', name: '🪷 Lotus', value: 'lotus' },
    { id: 'buddha', name: '🙏 Buddha', value: 'buddha' }
  ];

  const fonts = [
    'Arial',
    'Georgia',
    'Courier New',
    'Times New Roman',
    'Verdana',
    'Comic Sans MS'
  ];

  return (
    <div className="card-editor">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Card Editor</h2>

      {/* Message Input */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">Message</label>
        <textarea
          value={cardData.message}
          onChange={(e) => onCardDataChange({ message: e.target.value })}
          placeholder="Enter your message"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Sender Name */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">Your Name</label>
        <input
          type="text"
          value={cardData.senderName}
          onChange={(e) => onCardDataChange({ senderName: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Template Selection */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">Select Template</label>
        <div className="template-grid">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onCardDataChange({ templateType: template.value })}
              className={`template-option ${
                cardData.templateType === template.value ? 'active' : ''
              } text-sm`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">Background Color</label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={cardData.backgroundColor}
              onChange={(e) => onCardDataChange({ backgroundColor: e.target.value })}
              className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          <span className="text-sm text-gray-600">{cardData.backgroundColor}</span>
        </div>
      </div>

      {/* Text Color */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">Text Color</label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={cardData.textColor}
              onChange={(e) => onCardDataChange({ textColor: e.target.value })}
              className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          <span className="text-sm text-gray-600">{cardData.textColor}</span>
        </div>
      </div>

      {/* Font Family */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">Font</label>
        <select
          value={cardData.fontFamily}
          onChange={(e) => onCardDataChange({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="form-group">
        <label className="font-semibold text-gray-700">
          Font Size: {cardData.fontSize}px
        </label>
        <input
          type="range"
          min="16"
          max="48"
          value={cardData.fontSize}
          onChange={(e) => onCardDataChange({ fontSize: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerateCard}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors w-full mt-6"
      >
        {loading ? 'Generating...' : '✨ Generate Card'}
      </button>
    </div>
  );
};

export default CardEditor;
