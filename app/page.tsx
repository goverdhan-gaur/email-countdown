'use client';

import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Calendar, Type, Palette } from 'lucide-react';
import dayjs from 'dayjs';

export default function Home() {
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    setTargetDate(dayjs().add(7, 'days').format('YYYY-MM-DDTHH:mm'));
  }, []);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(100);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [label, setLabel] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    if (!targetDate) return;

    const params = new URLSearchParams({
      time: targetDate,
      width: width.toString(),
      height: height.toString(),
      bg: bgColor,
      color: textColor,
      label: label,
    });

    // Use window.location.origin to get the base URL
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    setGeneratedUrl(`${baseUrl}/api/countdown?${params.toString()}`);
  }, [targetDate, width, height, bgColor, textColor, label]);

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const copyToClipboard = () => {
    const imgTag = `<img src="${generatedUrl}" alt="Countdown Timer" />`;
    navigator.clipboard.writeText(imgTag);
    alert('Copied to clipboard!');
  };
  console.log(generatedUrl);
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Email Countdown Timer
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Create real-time countdown GIFs for your email marketing campaigns.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Configuration Panel */}
          <div className="p-8 bg-gray-50 border-r border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-md mr-3">
                <Calendar size={20} />
              </span>
              Configuration
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Date & Time</label>
                <input
                  type="datetime-local"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label (Optional)</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="e.g. Offer Ends In:"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-9 w-9 border border-gray-300 rounded-md p-1"
                    />
                    <span className="text-sm text-gray-500 font-mono">{bgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-9 w-9 border border-gray-300 rounded-md p-1"
                    />
                    <span className="text-sm text-gray-500 font-mono">{textColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="p-8 bg-white flex flex-col justify-center">
            <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <span className="bg-green-100 text-green-600 p-2 rounded-md mr-3">
                <Palette size={20} />
              </span>
              Preview
            </h2>

            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-gray-50"
                style={{ minHeight: '200px', width: '100%' }}
              >
                {generatedUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={previewKey}
                    src={generatedUrl}
                    alt="Countdown Preview"
                    className="max-w-full h-auto shadow-sm"
                  />
                )}
              </div>

              <button
                onClick={refreshPreview}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh Preview
              </button>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Embed Code</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex-grow focus-within:z-10">
                  <input
                    type="text"
                    readOnly
                    value={`<img src="${generatedUrl}" alt="Countdown Timer" />`}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 p-3 bg-gray-50 font-mono text-xs border"
                  />
                </div>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <Copy size={16} />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
