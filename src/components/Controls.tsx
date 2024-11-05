import React from 'react';

interface ControlsProps {
  text: string;
  setText: (text: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  color: string;
  setColor: (color: string) => void;
  curvature: number;
  setCurvature: (curve: number) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  onDownload: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  text,
  setText,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  color,
  setColor,
  curvature,
  setCurvature,
  backgroundColor,
  setBackgroundColor,
  onDownload,
}) => {
  const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];

  return (
    <div className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
        <input
          type="range"
          min="12"
          max="72"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-500 mt-1 block">{fontSize}px</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Curvature</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={curvature}
          onChange={(e) => setCurvature(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-500 mt-1 block">{Math.round(curvature * 100)}%</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setBackgroundColor('#ffffff')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              backgroundColor === '#ffffff'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            White
          </button>
          <button
            onClick={() => setBackgroundColor('transparent')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              backgroundColor === 'transparent'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Transparent
          </button>
        </div>
      </div>

      <button
        onClick={onDownload}
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
      >
        Download Image
      </button>
    </div>
  );
};