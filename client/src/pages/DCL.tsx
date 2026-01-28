import React, { useState } from 'react';

const DEMO_LOGS = [
  {
    id: '1',
    date: 'Aug 12',
    status: 'Check Reminder',
    subStatus: 'Due today',
    type: 'reminder',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    date: 'Aug 10',
    status: 'Completed',
    subStatus: 'Healthy',
    type: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    date: 'Aug 9',
    status: 'Completed',
    subStatus: 'Healthy',
    type: 'completed',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=100&h=100&fit=crop'
  }
];

// Calendar matching exact image: dates 8,9 are yellow/orange circles, 12 has green check, 14 is dark teal, 15 is teal
const DEMO_CALENDAR = [
  null, null, null, { date: 1 }, { date: 2 }, { date: 3 }, { date: 4 },
  { date: 5 }, { date: 6 }, { date: 7 }, 
  { date: 8, status: 'warning' }, { date: 9, status: 'warning' }, { date: 10 }, { date: 11 },
  { date: 12, status: 'check' }, { date: 13 }, { date: 14, status: 'completed-dark' }, { date: 15, status: 'completed' },
  { date: 16 }, { date: 17 }, { date: 18 }, { date: 19 }, { date: 20 }, { date: 21 }, { date: 22 },
  { date: 23 }, { date: 24 }, { date: 25 }, { date: 26 }, { date: 27 }, { date: 28 }, { date: 29 },
  { date: 30 }
];

const Camera = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4" fill="white"></circle>
  </svg>
);

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CheckIcon = ({ size = 10, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="4">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function DailyCropLog() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      alert('Photo uploaded: ' + file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Daily Crop Log</h1>
              <p className="text-gray-600 text-sm">Upload today's crop photo to track health:</p>
            </div>

            {/* Tomato Badge */}
            <div className="bg-gray-200 rounded-lg px-4 py-3 inline-flex items-center gap-2">
              <span className="text-xl">🍅</span>
              <span className="font-semibold text-gray-800">Tomato Crop Monitoring</span>
              <span className="text-gray-500">· Day 37 after planting (Aug 13)</span>
            </div>

            {/* Upload Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Today's Crop Check</h2>
              <p className="text-gray-600 text-sm mb-5">Please take a clear photo of your tomato crop today.</p>

              <div className="relative bg-gradient-to-b from-green-50 to-white rounded-xl border-2 border-dashed border-gray-300 p-8 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-20 h-28 opacity-30">
                  <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover object-top"/>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-28 opacity-30">
                  <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover object-top"/>
                </div>

                <div className="relative z-10 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Crop Photo</h3>
                  <p className="text-gray-600 text-sm mb-5">Please take a clear photo of your tomato crop today.</p>

                  <label className="inline-block">
                    <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden"/>
                    <div className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-full cursor-pointer transition-colors inline-flex items-center gap-2 text-sm font-medium">
                      <Camera />
                      Upload Crop Photo
                    </div>
                  </label>

                  <div className="mt-3">
                    <button onClick={() => alert('Skipped')} className="text-gray-600 hover:text-gray-800 text-xs">
                      or Skip for Today
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Logs */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Logs</h2>
              <div className="space-y-3">
                {DEMO_LOGS.map((log) => (
                  <div key={log.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="font-semibold text-gray-800 text-sm min-w-[50px]">{log.date}</div>
                      <div className="flex-1">
                        <div className="text-sm mb-1.5">
                          <span className="font-semibold text-gray-800">{log.status}</span>
                          <span className="text-gray-500"> · {log.subStatus}</span>
                          {log.type === 'completed' && <span className="ml-1">🌿</span>}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${log.type === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}>
                            {log.type === 'completed' ? <CheckIcon size={10} /> : <span className="text-white text-[10px] font-bold">!</span>}
                          </div>
                          <span>Check</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 ml-3">
                      <img src={log.imageUrl} alt="" className="w-full h-full object-cover"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Calendar Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Manage Crop Logs</h2>

              <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg py-2 px-3">
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <ChevronLeft />
                </button>
                <span className="font-semibold text-gray-800 text-sm">August 2024</span>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <ChevronRight />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="mb-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={idx} className="text-center text-xs font-semibold text-gray-600 py-1.5">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1.5">
                  {DEMO_CALENDAR.map((day, idx) => (
                    <div key={idx} className="aspect-square flex items-center justify-center">
                      {day ? (
                        <div className={`
                          w-full h-full flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-all
                          ${day.status === 'completed-dark' ? 'bg-teal-700 text-white' : 
                            day.status === 'completed' ? 'bg-teal-600 text-white' :
                            day.status === 'check' ? 'bg-green-500 text-white' :
                            day.status === 'warning' ? 'bg-amber-400 text-white' :
                            'text-gray-700 hover:bg-gray-100'}
                        `}>
                          {day.status === 'check' ? <CheckIcon size={12} /> : day.date}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 py-3 border-t border-gray-200 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                  <span>Check Reminder</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <div className="w-3 h-3 bg-teal-600 rounded-sm"></div>
                  <span>Completed Log</span>
                </div>
              </div>

              <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-full text-sm font-medium transition-colors">
                Manage Reminders
              </button>
            </div>

            {/* Expert Help Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👨‍🌾</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Need Expert Help?</h3>
                  <p className="text-xs text-gray-600">Connect with our crop experts for further assistance.</p>
                </div>
              </div>
              <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-full text-sm font-medium transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}