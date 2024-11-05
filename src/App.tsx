import React, { useState } from 'react';
import { TextCanvas } from './components/TextCanvas';
import { Controls } from './components/Controls';
import { SEOContent } from './components/SEOContent';
import html2canvas from 'html2canvas';

function App() {
  const [text, setText] = useState('Your Curved Text');
  const [fontSize, setFontSize] = useState(36);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [color, setColor] = useState('#000000');
  const [curvature, setCurvature] = useState(0.5);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleDownload = async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'curved-text.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Free Curved Text Generator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <TextCanvas
              text={text}
              fontSize={fontSize}
              fontFamily={fontFamily}
              color={color}
              curvature={curvature}
              backgroundColor={backgroundColor}
            />
          </div>

          <Controls
            text={text}
            setText={setText}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            color={color}
            setColor={setColor}
            curvature={curvature}
            setCurvature={setCurvature}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            onDownload={handleDownload}
          />
        </div>

        <SEOContent />
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-600">
          <p>Free Curved Text Generator - Create beautiful curved text designs instantly</p>
        </div>
      </footer>
    </div>
  );
}

export default App;