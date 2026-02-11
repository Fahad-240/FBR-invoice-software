import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Clock } from 'lucide-react';

export function OfflineStatusBar() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [lastSync, setLastSync] = useState<Date>(new Date());
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const getTimeSinceSync = () => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - lastSync.getTime()) / 1000 / 60); // minutes
        if (diff < 1) return 'Just now';
        if (diff < 60) return `${diff} mins ago`;
        const hours = Math.floor(diff / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    };

    return (
        <div
            className={`px-4 py-2 flex items-center justify-between text-sm ${isOnline
                    ? 'bg-green-50 border-b border-green-200 text-green-900'
                    : 'bg-amber-50 border-b border-amber-200 text-amber-900'
                }`}
        >
            <div className="flex items-center gap-2">
                {isOnline ? (
                    <>
                        <Wifi className="w-4 h-4 text-green-700" />
                        <span className="font-medium">Online</span>
                    </>
                ) : (
                    <>
                        <WifiOff className="w-4 h-4 text-amber-700" />
                        <span className="font-medium">OFFLINE</span>
                        <span className="text-xs ml-2">Invoices will be queued for FBR submission</span>
                    </>
                )}
            </div>

            {isOnline && (
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Last Sync: {getTimeSinceSync()}</span>
                    </div>
                    {pendingCount > 0 && (
                        <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-sm">
                            Pending: {pendingCount} invoice{pendingCount > 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
