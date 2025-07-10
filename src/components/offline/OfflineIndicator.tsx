import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { WifiOff, Wifi, Database, Smartphone } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useOfflineStatus();

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          {isOnline ? (
            <Wifi className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 mr-2 text-red-500" />
          )}
          Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
          
          {wasOffline && isOnline && (
            <div className="text-xs text-green-600">
              ✓ Back online - data will sync
            </div>
          )}
          
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Database className="h-3 w-3 mr-1" />
            IndexedDB Storage Active
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Smartphone className="h-3 w-3 mr-1" />
            Mobile App Ready
          </div>
        </div>
      </CardContent>
    </Card>
  );
};