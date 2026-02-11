// FBR HS Code Master Data with Tax Rates and Schedule References
export interface HSCodeData {
    code: string;
    description: string;
    taxRate: number;
    scheduleReference: string;
}

export const hsCodeMasterList: HSCodeData[] = [
    // Chapter 84 - Machinery
    { code: '8479.89.00', description: 'Industrial Machinery Parts', taxRate: 18, scheduleReference: 'SCH-III-8479' },
    { code: '8483.40.00', description: 'Gears and Gearing', taxRate: 18, scheduleReference: 'SCH-III-8483' },
    { code: '8481.80.00', description: 'Taps, Cocks, Valves', taxRate: 18, scheduleReference: 'SCH-III-8481' },

    // Chapter 85 - Electrical Equipment
    { code: '8541.40.00', description: 'Electronic Components', taxRate: 18, scheduleReference: 'SCH-III-8541' },
    { code: '8544.42.00', description: 'Electric Cables', taxRate: 18, scheduleReference: 'SCH-III-8544' },
    { code: '8536.50.00', description: 'Switches and Sockets', taxRate: 18, scheduleReference: 'SCH-III-8536' },

    // Chapter 39 - Plastics
    { code: '3920.10.00', description: 'Plastic Sheets', taxRate: 17, scheduleReference: 'SCH-III-3920' },
    { code: '3923.30.00', description: 'Plastic Containers', taxRate: 17, scheduleReference: 'SCH-III-3923' },

    // Chapter 73 - Iron and Steel
    { code: '7308.90.00', description: 'Steel Structures', taxRate: 18, scheduleReference: 'SCH-III-7308' },
    { code: '7326.90.00', description: 'Steel Articles', taxRate: 18, scheduleReference: 'SCH-III-7326' },

    // Chapter 48 - Paper Products
    { code: '4819.10.00', description: 'Cartons and Boxes', taxRate: 17, scheduleReference: 'SCH-III-4819' },
    { code: '4823.90.00', description: 'Paper Articles', taxRate: 17, scheduleReference: 'SCH-III-4823' },

    // Chapter 27 - Mineral Fuels
    { code: '2710.19.00', description: 'Petroleum Products', taxRate: 17, scheduleReference: 'SCH-III-2710' },

    // Chapter 10 - Cereals
    { code: '1006.30.00', description: 'Rice (Semi-milled)', taxRate: 0, scheduleReference: 'SCH-EXEMPT-1006' },
    { code: '1001.99.00', description: 'Wheat', taxRate: 0, scheduleReference: 'SCH-EXEMPT-1001' },

    // Chapter 04 - Dairy
    { code: '0402.21.00', description: 'Milk Powder', taxRate: 18, scheduleReference: 'SCH-III-0402' },

    // Chapter 63 - Textiles
    { code: '6302.60.00', description: 'Bed Linen', taxRate: 18, scheduleReference: 'SCH-III-6302' },
    { code: '6304.93.00', description: 'Curtains', taxRate: 18, scheduleReference: 'SCH-III-6304' },

    // Chapter 94 - Furniture
    { code: '9403.60.00', description: 'Wooden Furniture', taxRate: 18, scheduleReference: 'SCH-III-9403' },

    // Chapter 30 - Pharmaceutical
    { code: '3004.90.00', description: 'Medicines', taxRate: 0, scheduleReference: 'SCH-EXEMPT-3004' },
];

export function getHSCodeData(code: string): HSCodeData | undefined {
    return hsCodeMasterList.find(item => item.code === code);
}

export function searchHSCodes(query: string): HSCodeData[] {
    const lowerQuery = query.toLowerCase();
    return hsCodeMasterList.filter(
        item =>
            item.code.includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery)
    );
}
