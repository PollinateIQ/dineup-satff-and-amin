import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { motion } from 'framer-motion';
import { Plus, Download } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [generatedQRs, setGeneratedQRs] = useState<{ tableNumber: string; qrValue: string }[]>([]);
  const restaurantId = 'restaurant-123'; // This should be dynamically set based on the logged-in restaurant owner

  const generateQRCode = () => {
    if (!tableNumber) return;

    const qrValue = `${window.location.origin}/table/${restaurantId}/${tableNumber}`;
    setGeneratedQRs([...generatedQRs, { tableNumber, qrValue }]);
    setTableNumber('');

    // Here you would typically send this data to your backend
    console.log('Saving QR code to database:', { restaurantId, tableNumber, qrValue });
  };

  const downloadQRCode = (tableNumber: string) => {
    const canvas = document.getElementById(`qr-code-${tableNumber}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `table-${tableNumber}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Table QR Code Generator</h2>
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
          className="flex-grow p-2 border rounded"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateQRCode}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Plus className="mr-2" /> Generate QR
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {generatedQRs.map(({ tableNumber, qrValue }) => (
          <div key={tableNumber} className="bg-white p-4 rounded-lg shadow-md">
            <QRCode
              id={`qr-code-${tableNumber}`}
              value={qrValue}
              size={200}
              level="H"
              includeMargin={true}
            />
            <p className="mt-2 text-center">Table {tableNumber}</p>
            <p className="mt-1 text-xs text-center text-gray-500 break-all">{qrValue}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => downloadQRCode(tableNumber)}
              className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <Download className="mr-2" /> Download QR
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodeGenerator;