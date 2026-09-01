import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Upload, Camera, TrendingUp, DollarSign, Gauge, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CommodityListingScreenProps {
  onListForSale: (listing: any) => void;
  onBack: () => void;
  lotData?: {
    id: string;
    quality: string;
    quantity: number;
    commodity: string;
  };
}

export const CommodityListingScreen: React.FC<CommodityListingScreenProps> = ({
  onListForSale,
  onBack,
  lotData = {
    id: 'LOT-001',
    quality: 'A',
    quantity: 1000,
    commodity: 'Wheat',
  },
}) => {
  const [location, setLocation] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [listing, setListing] = useState({
    commodityType: lotData.commodity,
    quantity: lotData.quantity,
    qualityGrade: lotData.quality,
    expectedPrice: '',
    description: '',
    location: '',
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [aiAssessment, setAiAssessment] = useState({
    size: 'Medium to Large grains',
    color: 'Golden yellow - Premium quality',
    quality: 'Grade A confirmed',
    recommendation: 'Suggested price: ₹2,800-3,000/quintal',
  });

  useEffect(() => {
    // Simulate getting location from GPS
    if (!location) {
      setLocation('Ludhiana, Punjab, India');
      setListing({ ...listing, location: 'Ludhiana, Punjab, India' });
    }
  }, []);

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    // Simulate GPS location fetch
    setTimeout(() => {
      const mockLocation = 'Ludhiana, Punjab, India (30.9010°N, 75.8573°E)';
      setLocation(mockLocation);
      setListing({ ...listing, location: mockLocation });
      setIsGettingLocation(false);
      toast.success('Location updated from GPS');
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages]);
      toast.success(`${files.length} image(s) uploaded`);
    }
  };

  const handleSubmit = () => {
    if (!listing.expectedPrice || !listing.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const listingData = {
      ...listing,
      lotId: lotData.id,
      images: uploadedImages,
      aiAssessment,
      listedAt: new Date().toISOString(),
    };

    onListForSale(listingData);
    toast.success('Commodity listed for sale successfully!');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>List Commodity for Sale</h1>
          <p className="text-gray-600">Create your listing with details and images</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Basic Details</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="commodity">Commodity Type *</Label>
                  <Select
                    value={listing.commodityType}
                    onValueChange={(v) => setListing({ ...listing, commodityType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Maize">Maize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity (kg) *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={listing.quantity}
                      onChange={(e) => setListing({ ...listing, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quality">Quality Grade *</Label>
                    <Select
                      value={listing.qualityGrade}
                      onValueChange={(v) => setListing({ ...listing, qualityGrade: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Grade A</SelectItem>
                        <SelectItem value="B">Grade B</SelectItem>
                        <SelectItem value="C">Grade C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Expected Price (₹/quintal) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={listing.expectedPrice}
                    onChange={(e) => setListing({ ...listing, expectedPrice: e.target.value })}
                    placeholder="Enter expected price"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={listing.description}
                    onChange={(e) => setListing({ ...listing, description: e.target.value })}
                    placeholder="Describe your commodity, harvest date, storage conditions, etc."
                    rows={4}
                  />
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Location</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={listing.location}
                      onChange={(e) => setListing({ ...listing, location: e.target.value })}
                      placeholder="Auto-filled from GPS"
                    />
                    <Button
                      onClick={handleGetLocation}
                      disabled={isGettingLocation}
                      variant="outline"
                    >
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Location auto-filled from device GPS, editable
                  </p>
                </div>
              </div>
            </Card>

            {/* Images/Videos Upload */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Images & Videos</h3>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 mb-1">Upload Images or Videos</p>
                    <p className="text-sm text-gray-400">Click to browse or drag and drop</p>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </Card>
          </div>

          {/* AI Assessment Sidebar */}
          <div className="space-y-6">
            {/* Lot Info */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Lot Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Lot ID</p>
                  <p className="font-mono text-sm" style={{ color: '#003E6D' }}>{lotData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quality</p>
                  <Badge className="bg-green-500 text-white">Grade {lotData.quality}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p style={{ color: '#003E6D' }}>{lotData.quantity} kg</p>
                </div>
              </div>
            </Card>

            {/* AI Assessment */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg border-2" style={{ borderColor: '#FFD700' }}>
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="w-5 h-5" style={{ color: '#FFD700' }} />
                <h3 style={{ color: '#003E6D' }}>AI Assessment</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500 mb-1">Size Analysis</p>
                  <p className="text-sm" style={{ color: '#003E6D' }}>{aiAssessment.size}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500 mb-1">Color Analysis</p>
                  <p className="text-sm" style={{ color: '#003E6D' }}>{aiAssessment.color}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500 mb-1">Quality Confirmation</p>
                  <p className="text-sm" style={{ color: '#003E6D' }}>{aiAssessment.quality}</p>
                </div>

                <div className="rounded-lg p-3" style={{ backgroundColor: '#FFD70020' }}>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 mt-0.5" style={{ color: '#FFD700' }} />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Recommendation</p>
                      <p className="text-sm" style={{ color: '#003E6D' }}>{aiAssessment.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full text-white"
              style={{ backgroundColor: '#FFD700' }}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              List for Sale
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
