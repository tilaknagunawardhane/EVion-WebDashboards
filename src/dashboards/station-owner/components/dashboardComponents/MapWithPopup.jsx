import React, { useState } from 'react';
import MapImage from '../../../../assets/map-placeholder.png';
import { COLORS, FONTS } from '../../../../constants';

const MapWithPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Collapsed Map Card */}
      <div className="w-full h-full px-4 py-4 bg-white rounded-xl shadow-sm relative">
        {/* Expand Button */}
        <button
          onClick={() => setOpen(true)}
          className="absolute top-6 right-4"
        >
          {/* Expand SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
        <div flex w-full justify-between items-center mb-4>
            <h2 className="text-base font-semibold" style={{color: COLORS.mainTextColor}}>My Stations</h2>
        </div>
        <img
          src={MapImage}
          alt="Charging Stations Map"
          className="w-full h-auto object-cover rounded-lg mt-2"
        />
      </div>

      {/* Popup Overlay */}
        {open && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-4 rounded-xl overflow-hidden shadow-xl max-w-5xl w-full">
            
            {/* Reduce Button */}
            <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 bg-white rounded-full p-1 shadow hover:bg-gray-50 z-10"
            >
                {/* Reduce SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21H3m0 0v-6m0 6L14 10" />
                </svg>
            </button>

            {/* Map Image */}
            <img
                src={MapImage}
                alt="Expanded Map"
                className="w-full h-[80vh] object-cover rounded-xl"
            />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-md shadow-md px-4 py-2 text-sm flex flex-col gap-2 border border-gray-200">
                <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md" style={{ backgroundColor: COLORS.primary }}></span>
                <span className="text-gray-800">Evion Stations</span>
                </div>
                <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md" style={{ backgroundColor: COLORS.danger }}></span>
                <span className="text-gray-800">My Stations</span>
                </div>
                <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md" style={{ backgroundColor: COLORS.star }}></span>
                <span className="text-gray-800">Closed/Disabled Stations</span>
                </div>
                <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-md" style={{ backgroundColor: COLORS.mainTextColor }}></span>
                <span className="text-gray-800">Other Charging Stations</span>
                </div>
            </div>
            </div>
        </div>
        )}

    </>
  );
};

export default MapWithPopup;
