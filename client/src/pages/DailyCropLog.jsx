import Image from "next/image";

export default function DailyCropLog() {
  return (
    <div className="min-h-screen bg-[#f6f8f6] p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Daily Crop Log
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload today’s crop photo to track health:
          </p>

          <div className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <span className="text-lg">🍅</span>
            <span className="text-sm font-medium text-gray-700">
              Tomato Crop Monitoring · Day 37 after planting (Aug 13)
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">

          {/* Left Section */}
          <div className="col-span-8 space-y-6">

            {/* Today's Crop Check */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Today’s Crop Check
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Please take a clear photo of your tomato crop today.
              </p>

              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-[#f9fbf9] relative overflow-hidden">

                {/* Background Tomatoes */}
                <div className="absolute bottom-0 left-0 opacity-80">
                  <Image src="/tomato-left.png" alt="" width={120} height={120} />
                </div>
                <div className="absolute bottom-0 right-0 opacity-80">
                  <Image src="/tomato-right.png" alt="" width={120} height={120} />
                </div>

                <p className="text-gray-600 font-medium">
                  Today’s Crop Photo
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Please take a clear photo of your tomato crop today.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 bg-[#2f5d50] hover:bg-[#264b41] text-white px-6 py-3 rounded-full font-medium shadow">
                  📷 Upload Crop Photo
                </button>

                <p className="mt-3 text-sm text-gray-400 underline cursor-pointer">
                  Skip for Today
                </p>
              </div>
            </div>

            {/* Recent Logs */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Logs
              </h2>

              <div className="mt-4 space-y-4">

                {[
                  { date: "Aug 12", status: "Check Reminder · Due today", color: "text-yellow-600" },
                  { date: "Aug 10", status: "Completed · Healthy", color: "text-green-600" },
                  { date: "Aug 9", status: "Completed · Healthy", color: "text-green-600" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between border rounded-xl p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {log.date}
                      </p>
                      <p className={`text-sm ${log.color}`}>
                        {log.status} 🌿
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gray-100 rounded-lg" />
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-4 space-y-6">

            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">August 2024</h3>
                <div className="flex gap-2 text-gray-400">
                  <button>‹</button>
                  <button>›</button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-500">
                {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 mt-3 text-sm text-center">
                {[...Array(31)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      i === 13
                        ? "bg-[#2f5d50] text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                  Check Reminder
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                  Completed Log
                </div>
              </div>

              <button className="mt-5 w-full bg-[#2f5d50] hover:bg-[#264b41] text-white py-2 rounded-full font-medium">
                Manage Reminders
              </button>
            </div>

            {/* Expert Help */}
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <div className="text-3xl mb-2">🎧</div>
              <h3 className="font-semibold text-gray-800">
                Need Expert Help?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Connect with our crop experts for further assistance.
              </p>
              <button className="mt-4 w-full bg-[#2f5d50] hover:bg-[#264b41] text-white py-2 rounded-full font-medium">
                Call Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
