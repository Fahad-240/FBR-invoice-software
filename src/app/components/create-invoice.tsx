import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Send } from 'lucide-react';
import { hsCodeMasterList, getHSCodeData } from '../data/hsCodeMaster';

interface InvoiceItem {
  id: string;
  description: string;
  hsCode: string;
  quantity: number;
  unit: string;
  rate: number;
  taxRate: number;
  scheduleReference: string;
}

export function CreateInvoice() {
  const navigate = useNavigate();

  // Buyer Information
  const [buyerType, setBuyerType] = useState<'Registered' | 'Unregistered'>('Registered');
  const [buyerName, setBuyerName] = useState('');
  const [buyerNTN, setBuyerNTN] = useState('');
  const [buyerSTRN, setBuyerSTRN] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [buyerProvince, setBuyerProvince] = useState('Punjab');

  // Invoice Details
  const [invoiceType, setInvoiceType] = useState('Tax Invoice');
  const [saleType, setSaleType] = useState('Local');
  const [paymentMode, setPaymentMode] = useState('Cash');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', hsCode: '', quantity: 0, unit: 'PCS', rate: 0, taxRate: 0, scheduleReference: '' },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', hsCode: '', quantity: 0, unit: 'PCS', rate: 0, taxRate: 0, scheduleReference: '' },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          // If HS Code is being updated, auto-map tax rate and schedule reference
          if (field === 'hsCode') {
            const hsData = getHSCodeData(value);
            if (hsData) {
              return {
                ...item,
                hsCode: value,
                taxRate: hsData.taxRate,
                scheduleReference: hsData.scheduleReference,
              };
            }
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const calculateLineAmount = (item: InvoiceItem) => {
    return item.quantity * item.rate;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateLineAmount(item), 0);
  };

  const calculateTax = () => {
    return items.reduce((sum, item) => {
      const lineAmount = calculateLineAmount(item);
      const taxAmount = lineAmount * (item.taxRate / 100);
      return sum + taxAmount;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSaveDraft = () => {
    alert('Invoice saved as draft');
  };

  const handleSubmitToFBR = () => {
    alert('Invoice submitted to FBR successfully');
    navigate('/invoices');
  };

  return (
    <div className="max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">Create Sales Tax Invoice</h1>
        <p className="text-sm text-slate-600">FBR Digital Invoice Generation</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm">
        {/* Seller Information */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm lg:text-base text-slate-900">Seller Information (Read-Only)</h2>
        </div>
        <div className="px-4 lg:px-6 py-5 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-xs text-slate-600 mb-1">Company Name</label>
              <input
                type="text"
                value="ABC Enterprises (Pvt) Ltd"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">NTN</label>
              <input
                type="text"
                value="1234567-8"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">STRN</label>
              <input
                type="text"
                value="32-00-0000-000-00"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Address</label>
              <input
                type="text"
                value="123 Business District, Karachi, Pakistan"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Origin Province</label>
              <input
                type="text"
                value="Sindh"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Buyer Information */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm lg:text-base text-slate-900">Buyer Information</h2>
        </div>
        <div className="px-4 lg:px-6 py-5 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Buyer Type */}
            <div className="col-span-2">
              <label className="block text-xs text-slate-600 mb-2">Buyer Type *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Registered"
                    checked={buyerType === 'Registered'}
                    onChange={(e) => {
                      setBuyerType('Registered');
                      setBuyerSTRN('');
                    }}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-900">Registered Buyer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Unregistered"
                    checked={buyerType === 'Unregistered'}
                    onChange={(e) => {
                      setBuyerType('Unregistered');
                      setBuyerSTRN('9999997');
                    }}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-900">Unregistered Buyer</span>
                </label>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-slate-600 mb-1">Buyer Name *</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* STRN Field - conditional based on buyer type */}
            <div>
              <label className="block text-xs text-slate-600 mb-1">
                Buyer STRN {buyerType === 'Registered' && '*'}
              </label>
              <input
                type="text"
                value={buyerType === 'Unregistered' ? '9999997' : buyerSTRN}
                onChange={(e) => buyerType === 'Registered' && setBuyerSTRN(e.target.value)}
                readOnly={buyerType === 'Unregistered'}
                className={`w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${buyerType === 'Unregistered' ? 'bg-slate-50 text-slate-500' : ''
                  }`}
                placeholder={buyerType === 'Registered' ? 'Enter STRN' : 'Auto-filled for unregistered'}
              />
              {buyerType === 'Unregistered' && (
                <p className="text-xs text-slate-500 mt-1">Auto-set to 9999997 for unregistered buyers</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1">NTN / CNIC</label>
              <input
                type="text"
                value={buyerNTN}
                onChange={(e) => setBuyerNTN(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1">Destination Province *</label>
              <select
                value={buyerProvince}
                onChange={(e) => setBuyerProvince(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Punjab</option>
                <option>Sindh</option>
                <option>Khyber Pakhtunkhwa</option>
                <option>Balochistan</option>
                <option>Islamabad Capital Territory</option>
                <option>Gilgit-Baltistan</option>
                <option>Azad Jammu & Kashmir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Cash</option>
                <option>Credit</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-slate-600 mb-1">Address</label>
              <input
                type="text"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Invoice Confirmation */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm lg:text-base text-slate-900">Invoice Confirmation</h2>
        </div>
        <div className="px-4 lg:px-6 py-5 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-xs text-slate-600 mb-1">Invoice Number</label>
              <input
                type="text"
                value="INV-2026-00249"
                readOnly
                className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-slate-50 text-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Invoice Date</label>
              <input
                type="date"
                defaultValue="2026-02-09"
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Invoice Type *</label>
              <select
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Tax Invoice</option>
                <option>Commercial Invoice</option>
                <option>Export Invoice</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">Sale Type *</label>
              <select
                value={saleType}
                onChange={(e) => setSaleType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-sm text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Local</option>
                <option>Inter-Provincial</option>
                <option>Export</option>
              </select>
            </div>
          </div>
        </div>

        {/* Item Details Table */}
        <div className="px-4 lg:px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm lg:text-base text-slate-900">Item Details</h2>
            <button
              onClick={addItem}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-sm rounded-sm hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Item</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[30%]">Description / Product Name</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[12%]">HS Code</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[10%]">Quantity</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[10%]">Unit</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[12%]">Rate (PKR)</th>
                <th className="px-4 py-3 text-left text-xs text-slate-600 w-[15%]">Line Amount</th>
                <th className="px-4 py-3 text-center text-xs text-slate-600 w-[8%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.hsCode}
                      onChange={(e) => updateItem(item.id, 'hsCode', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select HS Code</option>
                      {hsCodeMasterList.map((hsItem) => (
                        <option key={hsItem.code} value={hsItem.code}>
                          {hsItem.code} - {hsItem.description}
                        </option>
                      ))}
                    </select>
                    {item.hsCode && (
                      <p className="text-xs text-slate-600 mt-1">
                        Tax: {item.taxRate}%
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.unit}
                      onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option>PCS</option>
                      <option>KG</option>
                      <option>LTR</option>
                      <option>MTR</option>
                      <option>BOX</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.rate || ''}
                      onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900">
                    PKR {calculateLineAmount(item).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 hover:bg-red-50 rounded-sm text-red-600 disabled:opacity-30"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="px-4 lg:px-6 py-5 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-end">
            <div className="w-full sm:w-96">
              <div className="flex justify-between py-2 border-b border-slate-300">
                <span className="text-sm text-slate-700">Subtotal:</span>
                <span className="text-sm text-slate-900">PKR {calculateSubtotal().toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-300">
                <span className="text-sm text-slate-700">Sales Tax (Variable):</span>
                <span className="text-sm text-slate-900">PKR {calculateTax().toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-3 bg-primary text-white px-4 mt-2 rounded-sm">
                <span className="text-base">Total Invoice Value:</span>
                <span className="text-lg">PKR {calculateTotal().toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 lg:px-6 py-5 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 rounded-sm hover:bg-slate-50"
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </button>
          <button
            onClick={handleSubmitToFBR}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Save & Submit to FBR</span>
            <span className="sm:hidden">Submit to FBR</span>
          </button>
        </div>
      </div>
    </div>
  );
}