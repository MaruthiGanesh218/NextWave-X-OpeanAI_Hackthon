import React from 'react';

export function NoData({ message = 'No data available' }: { message?: string }) {
  return (
    <div className="p-6 rounded-lg border border-dashed border-gray-200 text-center bg-white">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

export default NoData;
