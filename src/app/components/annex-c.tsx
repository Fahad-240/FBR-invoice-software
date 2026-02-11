import React, { useState } from 'react';
import { Download, FileSpreadsheet, AlertCircle } from 'lucide-react';

interface AnnexCEntry {
    invoiceNumber: string;
    fbrInvoiceNumber: string;
    date: string;
    buyerName: string;
    buyerSTRN: string;
    taxableAmount: number;
    taxAmount: number;
    totalAmount: number;
    province: string;
}

export function AnnexC() {
    const [selectedMonth, setSelectedMonth] = useState('2026-02');

    // Mock data - only FBR-validated invoices
    const annexCData: AnnexCEntry[] = [
        {
            invoiceNumber: 'INV-2026-00248',
            fbrInvoiceNumber: 'FBR-SRB-2026-0012458',
            date: '2026-02-09',
            buyerName: 'XYZ Corporation',
            buyerSTRN: '33-00-1234-567-89',
            taxableAmount: 75000,
            taxAmount: 13500,
            totalAmount: 88500,
            province: 'Punjab',
        },
        {
            invoiceNumber: 'INV-2026-00247',
            fbrInvoiceNumber: 'FBR-SRB-2026-0012457',
            date: '2026-02-09',
            buyerName: 'ABC Trading Co.',
            buyerSTRN: '32-00-9876-543-21',
            taxableAmount: 35850,
            taxAmount: 6453,
            totalAmount: 42303,
            province: 'Sindh',
        },
        {
            invoiceNumber: 'INV-2026-00245',
            fbrInvoiceNumber: 'FBR-SRB-2026-0012455',
            date: '2026-02-08',
            buyerName: 'Omega Services',
            buyerSTRN: '34-00-5555-666-77',
            taxableAmount: 24364,
            taxAmount: 4386,
            totalAmount: 28750,
            province: 'Khyber Pakhtunkhwa',
        },
        {
            invoiceNumber: 'INV-2026-00243',
            fbrInvoiceNumber: 'FBR-SRB-2026-0012453',
            date: '2026-02-08',
            buyerName: 'Beta Solutions',
            buyerSTRN: '32-00-7777-888-99',
            taxableAmount: 100424,
            taxAmount: 18076,
            totalAmount: 118500,
            province: 'Sindh',
        },
        {
            invoiceNumber: 'INV-2026-00242',
            fbrInvoiceNumber: 'FBR-SRB-2026-0012452',
            date: '2026-02-07',
            buyerName: 'Alpha Industries',
            buyerSTRN: '33-00-1111-222-33',
            taxableAmount: 78644,
            taxAmount: 14156,
            totalAmount: 92800,
            province: 'Punjab',
        },
        {
            invoiceNumber: 'INV-2026-00241',
            fbrInvoiceNumber: 'FBR-SRB-2026-0012451',
            date: '2026-02-07',
            buyerName: 'Sigma Trading',
            buyerSTRN: '32-00-4444-555-66',
            taxableAmount: 54322,
            taxAmount: 9778,
            totalAmount: 64100,
            province: 'Sindh',
        },
    ];

    const calculateTotals = () => {
        return annexCData.reduce(
            (acc, entry) => ({
                taxableAmount: acc.taxableAmount + entry.taxableAmount,
                taxAmount: acc.taxAmount + entry.taxAmount,
                totalAmount: acc.totalAmount + entry.totalAmount,
            }),
            { taxableAmount: 0, taxAmount: 0, totalAmount: 0 }
        );
    };

    const totals = calculateTotals();

    const handleExportExcel = () => {
        alert('Exporting Annex-C to Excel...');
    };

    const handleExportPDF = () => {
        alert('Exporting Annex-C to PDF...');
    };

    return (
        <div className="max-w-[1600px]">
            <div className="mb-6">
                <h1 className="text-xl lg:text-2xl text-slate-900 mb-1">Annex-C Report</h1>
                <p className="text-sm text-slate-600">Auto-generated from FBR-validated invoices only</p>
            </div>

            {/* Warning Banner */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-amber-900 mb-1">Read-Only Report</h3>
                        <p className="text-sm text-amber-800">
                            This Annex-C is auto-generated from FBR-validated invoices only. Manual editing is not allowed.
                            Provisional, draft, or rejected invoices are excluded from this report.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters and Export */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm mb-6">
                <div className="px-4 lg:px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="block text-xs text-slate-600 mb-1">Tax Period</label>
                            <input
                                type="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                            />
                        </div>
                        <div className="pt-5">
                            <button className="px-4 py-2 bg-[#1e3a5f] text-white text-sm rounded-sm hover:bg-[#2d5280]">
                                Generate Report
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-sm hover:bg-slate-50"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            <span className="hidden sm:inline">Export Excel</span>
                            <span className="sm:hidden">Excel</span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-sm hover:bg-slate-50"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export PDF</span>
                            <span className="sm:hidden">PDF</span>
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="px-4 lg:px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-200 rounded-sm p-4">
                            <p className="text-xs text-slate-600 mb-1">Total Invoices</p>
                            <p className="text-2xl text-slate-900">{annexCData.length}</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-sm p-4">
                            <p className="text-xs text-slate-600 mb-1">Total Taxable Amount</p>
                            <p className="text-2xl text-slate-900">
                                PKR {totals.taxableAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-sm p-4">
                            <p className="text-xs text-slate-600 mb-1">Total Tax Collected</p>
                            <p className="text-2xl text-green-700">
                                PKR {totals.taxAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Annex-C Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1200px]">
                        <thead className="bg-slate-50 border-b-2 border-slate-300">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs text-slate-700 font-medium">Invoice No.</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-700 font-medium">FBR Invoice No.</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-700 font-medium">Date</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-700 font-medium">Buyer Name</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-700 font-medium">Buyer STRN</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-700 font-medium">Province</th>
                                <th className="px-4 py-3 text-right text-xs text-slate-700 font-medium">Taxable Amount</th>
                                <th className="px-4 py-3 text-right text-xs text-slate-700 font-medium">Tax Amount</th>
                                <th className="px-4 py-3 text-right text-xs text-slate-700 font-medium">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {annexCData.map((entry, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 text-sm text-slate-900">{entry.invoiceNumber}</td>
                                    <td className="px-4 py-3 text-sm text-slate-700">{entry.fbrInvoiceNumber}</td>
                                    <td className="px-4 py-3 text-sm text-slate-700">
                                        {new Date(entry.date).toLocaleDateString('en-PK', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-900">{entry.buyerName}</td>
                                    <td className="px-4 py-3 text-sm text-slate-700 font-mono">{entry.buyerSTRN}</td>
                                    <td className="px-4 py-3 text-sm text-slate-700">{entry.province}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-right">
                                        {entry.taxableAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-right">
                                        {entry.taxAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-900 text-right">
                                        {entry.totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                            <tr>
                                <td colSpan={6} className="px-4 py-3 text-sm font-medium text-slate-900">
                                    TOTAL
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-slate-900 text-right">
                                    PKR {totals.taxableAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-green-700 text-right">
                                    PKR {totals.taxAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-slate-900 text-right">
                                    PKR {totals.totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Footer Note */}
                <div className="px-4 lg:px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-xs text-slate-600">
                        <strong>Note:</strong> This report includes only FBR-validated invoices for the selected period.
                        Invoices with status "Provisional", "Pending", "Draft", or "Rejected" are automatically excluded.
                        Report generated on {new Date().toLocaleString('en-PK')}.
                    </p>
                </div>
            </div>
        </div>
    );
}
