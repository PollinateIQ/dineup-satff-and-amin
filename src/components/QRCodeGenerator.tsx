import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  tableNumber: number;
  restaurantId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ tableNumber, restaurantId }) => {
  const qrValue = `${window.location.origin}/menu/${restaurantId}?table=${tableNumber}`;

  return (
    <div className="flex flex-col items-center">
      <QRCodeSVG value={qrValue} size={200} />
      <p className="mt-2 text-center">Scan to view menu for Table {tableNumber}</p>
    </div>
  );
};

export default QRCodeGenerator;