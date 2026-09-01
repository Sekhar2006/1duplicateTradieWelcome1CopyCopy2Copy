import React from 'react';
import { Warehouse, MapPin, Shield, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const StorageManagementDashboard: React.FC = () => {
  const mockFacilities = [
    { id: 1, name: 'Agri-Cool Cold Storage', type: 'Cold Storage', location: 'Ludhiana', capacity: 1000, used: 550, status: 'Active', compliance: 'Compliant' },
    { id: 2, name: 'Punjab Warehouse', type: 'Warehouse', location: 'Jalandhar', capacity: 2000, used: 890, status: 'Active', compliance: 'Compliant' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Total Facilities</h3>
          <p className="text-3xl font-bold">12</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Space Utilization</h3>
          <p className="text-3xl font-bold">68%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Active Rentals</h3>
          <p className="text-3xl font-bold">8</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">My Storage Facilities</h3>
        <div className="space-y-4">
          {mockFacilities.map((facility) => (
            <div key={facility.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{facility.name}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {facility.location}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {facility.compliance}
                </Badge>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Space Used</span>
                  <span className="font-semibold">{facility.used} / {facility.capacity} qtl</span>
                </div>
                <Progress value={(facility.used / facility.capacity) * 100} className="h-2" />
              </div>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StorageManagementDashboard;
