import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { motion } from 'framer-motion';
import { Plus, Download, Trash, Edit, Save, X, Printer, Image as ImageIcon, FileText } from 'lucide-react';
import { getRestaurantSettings } from '../utils/settingsHelper';
import { usePDF } from 'react-to-pdf';

interface QRCodeData {
  id: string;
  tableNumber: string;
  qrValue: string;
  size: number;
  fgColor: string;
  bgColor: string;
  logoUrl: string;
  logoSize: number;
  includeTableInfo: boolean;
}

interface RestaurantSettings {
  name: string;
  logo: string;
}

const QRCodeGenerator: React.FC = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [generatedQRs, setGeneratedQRs] = useState<QRCodeData[]>([]);
  const [restaurantSettings, setRestaurantSettings] = useState<RestaurantSettings>({ name: '', logo: '' });
  const [currentQR, setCurrentQR] = useState<QRCodeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const { toPDF, targetRef } = usePDF({filename: 'restaurant-qr-codes.pdf'});

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getRestaurantSettings();
      setRestaurantSettings({
        name: settings.name,
        logo: settings.logo,
      });
    };
    fetchSettings();
  }, []);

  const generateQRCode = () => {
    if (!tableNumber) return;

    const newQRCode: QRCodeData = {
      id: Date.now().toString(),
      tableNumber,
      qrValue: `${window.location.origin}/table/${tableNumber}`,
      size: 200,
      fgColor: '#000000',
      bgColor: '#FFFFFF',
      logoUrl: '',
      logoSize: 50,
      includeTableInfo: true,
    };

    setGeneratedQRs([...generatedQRs, newQRCode]);
    setTableNumber('');
  };

  const deleteQRCode = (id: string) => {
    setGeneratedQRs(generatedQRs.filter(qr => qr.id !== id));
  };

  const editQRCode = (qr: QRCodeData) => {
    setCurrentQR(qr);
    setIsModalOpen(true);
  };

  const saveQRCode = (updatedQR: QRCodeData) => {
    setGeneratedQRs(generatedQRs.map(qr => qr.id === updatedQR.id ? updatedQR : qr));
    setIsModalOpen(false);
    setCurrentQR(null);
  };

  const generatePDF = () => {
    toPDF();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">QR Code Generator</h2>
      
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
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

      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePDF}
          className="bg-purple-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FileText className="mr-2" /> Generate PDF of All QR Codes
        </motion.button>
      </div>

      <div ref={targetRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedQRs.map((qrData) => (
            <div key={qrData.id} className="bg-white p-6 rounded-lg shadow-md">
              <QRCode 
                value={qrData.qrValue} 
                size={qrData.size}
                fgColor={qrData.fgColor}
                bgColor={qrData.bgColor}
                level="H"
                imageSettings={qrData.logoUrl ? {
                  src: qrData.logoUrl,
                  x: undefined,
                  y: undefined,
                  height: qrData.logoSize,
                  width: qrData.logoSize,
                  excavate: true,
                } : undefined}
              />
              {qrData.includeTableInfo && (
                <p className="mt-2 text-center">Table {qrData.tableNumber}</p>
              )}
              <div className="mt-4 flex justify-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => editQRCode(qrData)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteQRCode(qrData.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  <Trash size={16} />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden print content */}
      <div className="hidden">
        <div ref={printRef}>
          {generatedQRs.map((qrData) => (
            <div key={qrData.id} className="mb-8">
              <div className="text-center mb-4">
                <img src={restaurantSettings.logo} alt="Restaurant Logo" className="mx-auto h-16" />
                <h2 className="text-xl font-bold mt-2">{restaurantSettings.name}</h2>
                {qrData.includeTableInfo && (
                  <p className="text-lg">Table {qrData.tableNumber}</p>
                )}
              </div>
              <QRCode 
                value={qrData.qrValue} 
                size={qrData.size}
                fgColor={qrData.fgColor}
                bgColor={qrData.bgColor}
                level="H"
                imageSettings={qrData.logoUrl ? {
                  src: qrData.logoUrl,
                  x: undefined,
                  y: undefined,
                  height: qrData.logoSize,
                  width: qrData.logoSize,
                  excavate: true,
                } : undefined}
                className="mx-auto"
              />
              <p className="text-center mt-2">{qrData.qrValue}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && currentQR && (
        <QRCodeEditModal
          qrData={currentQR}
          onSave={saveQRCode}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

interface QRCodeEditModalProps {
  qrData: QRCodeData;
  onSave: (updatedQR: QRCodeData) => void;
  onClose: () => void;
}

const QRCodeEditModal: React.FC<QRCodeEditModalProps> = ({ qrData, onSave, onClose }) => {
  const [editedQR, setEditedQR] = useState<QRCodeData>(qrData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditedQR(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedQR);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Edit QR Code</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Size</label>
            <input
              type="number"
              name="size"
              value={editedQR.size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Foreground Color</label>
            <input
              type="color"
              name="fgColor"
              value={editedQR.fgColor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Background Color</label>
            <input
              type="color"
              name="bgColor"
              value={editedQR.bgColor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Logo URL</label>
            <input
              type="text"
              name="logoUrl"
              value={editedQR.logoUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Logo Size</label>
            <input
              type="number"
              name="logoSize"
              value={editedQR.logoSize}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="includeTableInfo"
                checked={editedQR.includeTableInfo}
                onChange={handleChange}
                className="mr-2"
              />
              Include Table Information
            </label>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QRCodeGenerator;