import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search, Info, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { countries } from "./CountryLanguageData";
import { indianStates } from "./IndiaLocationData";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface KYCBasicDetailsProps {
  onNext: (data: {
    fullName: string;
    country: string;
    state?: string;
    district?: string;
    placeVillage?: string;
    pinCode?: string;
    region?: string;
    postalCode?: string;
    alternateMobile?: string;
    useVirtualNumber: boolean;
    // New Personal & Producer Identification fields
    dateOfBirth: string;
    gender: string;
    producerIdType: string;
    producerIdDescription?: string;
  }) => void;
  onBack: () => void;
  userRole?: string; // Added to conditionally show section title
}

export function KYCBasicDetails({ onNext, onBack, userRole }: KYCBasicDetailsProps) {
  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [placeVillage, setPlaceVillage] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [alternateMobile, setAlternateMobile] = useState("");
  const [useVirtualNumber, setUseVirtualNumber] = useState(false);
  
  // New Personal & Producer Identification fields
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [producerIdType, setProducerIdType] = useState("");
  const [producerIdDescription, setProducerIdDescription] = useState("");
  
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");

  const isIndia = selectedCountry === "India";
  
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredStates = indianStates.filter(state =>
    state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const selectedStateObj = indianStates.find(s => s.name === selectedState);
  const filteredDistricts = selectedStateObj
    ? selectedStateObj.districts.filter(district =>
        district.name.toLowerCase().includes(districtSearch.toLowerCase())
      )
    : [];

  // Get Producer ID types based on country and state
  const getProducerIdTypes = () => {
    if (!selectedCountry) return [];
    
    if (selectedCountry === "India" && selectedState) {
      const stateTypes: Record<string, string[]> = {
        "Andhra Pradesh": ["Pattadar Passbook", "Farmer ID Card", "Lease Certificate", "Others"],
        "Maharashtra": ["7/12 Extract", "Farmer ID", "Others"],
        "Karnataka": ["RTC Extract", "Farmer ID", "Others"],
        "Tamil Nadu": ["Patta Certificate", "Farmer ID", "Others"],
        "Telangana": ["Pahani Certificate", "Farmer ID", "Others"],
        "Kerala": ["Land Deed", "Farmer ID", "Others"],
        "Gujarat": ["7/12 Utara", "Farmer ID", "Others"],
        "Rajasthan": ["Jamabandi", "Farmer ID", "Others"],
        "Punjab": ["Fard", "Farmer ID", "Others"],
        "Haryana": ["Khatuni", "Farmer ID", "Others"],
      };
      return stateTypes[selectedState] || ["Farmer ID", "Land Certificate", "Others"];
    } else if (selectedCountry === "United States") {
      return ["FSA Registration", "Land Deed", "Farm Certificate", "Others"];
    } else if (selectedCountry === "Brazil") {
      return ["CAF Declaration", "Rural Land Certificate", "Farm Registration", "Others"];
    } else if (selectedCountry === "Kenya") {
      return ["Agricultural Land Certificate", "Farm Registration", "Others"];
    } else if (selectedCountry === "Nigeria") {
      return ["Farm Registration Certificate", "Land Title", "Others"];
    } else if (selectedCountry === "South Africa") {
      return ["Land Title Deed", "Farm Certificate", "Others"];
    } else if (selectedCountry === "Australia") {
      return ["Land Title", "Farm Business Registration", "Others"];
    } else {
      return ["Government-issued Producer ID", "Lease Proof", "Land Certificate", "Others"];
    }
  };

  const producerIdTypes = getProducerIdTypes();

  const handleSubmit = () => {
    if (!fullName || !selectedCountry) return;
    
    // Validate required Personal fields (for everyone)
    if (!dateOfBirth || !gender) return;
    
    // Validate Producer Identification fields (only for producers)
    if (userRole === "producer") {
      if (!producerIdType) return;
      // Validate "Others" description if "Others" is selected
      if (producerIdType === "Others" && !producerIdDescription.trim()) return;
    }
    
    if (isIndia && (!selectedState || !selectedDistrict || !placeVillage || !pinCode)) {
      return;
    }
    
    if (!isIndia && (!region || !postalCode)) {
      return;
    }

    onNext({
      fullName,
      country: selectedCountry,
      ...(isIndia && {
        state: selectedState,
        district: selectedDistrict,
        placeVillage,
        pinCode,
      }),
      ...(!isIndia && {
        region,
        postalCode,
      }),
      alternateMobile,
      useVirtualNumber,
      // New Personal & Producer Identification fields
      dateOfBirth,
      gender,
      producerIdType: userRole === "producer" ? producerIdType : "",
      producerIdDescription: userRole === "producer" ? producerIdDescription : "",
    });
  };

  const isFormValid = () => {
    // Basic required fields
    if (!fullName || !selectedCountry) return false;
    
    // Personal Identification required fields (for everyone)
    if (!dateOfBirth || !gender) return false;
    
    // Producer Identification required fields (only for producers)
    if (userRole === "producer") {
      if (!producerIdType) return false;
      // Validate "Others" description if "Others" is selected
      if (producerIdType === "Others" && !producerIdDescription.trim()) return false;
    }
    
    // Location-specific validation
    if (isIndia) {
      return !!(selectedState && selectedDistrict && placeVillage && pinCode);
    } else {
      return !!(region && postalCode);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Full Name */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label
          className="text-[#003E6D]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          Full Name *
        </Label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </motion.div>

      {/* Country */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label
          className="text-[#003E6D]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          🌍 Country *
        </Label>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <div className="sticky top-0 bg-white p-2 border-b z-10">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003E6D]/40" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-[#003E6D]/20 rounded-lg text-sm focus:outline-none focus:border-[#FFD700]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>
            <ScrollArea className="h-[250px]">
              {filteredCountries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </motion.div>

      {/* India-specific fields */}
      {isIndia && (
        <>
          {/* State */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              State *
            </Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <div className="sticky top-0 bg-white p-2 border-b z-10">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003E6D]/40" />
                    <input
                      type="text"
                      placeholder="Search states..."
                      value={stateSearch}
                      onChange={(e) => setStateSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-[#003E6D]/20 rounded-lg text-sm focus:outline-none focus:border-[#FFD700]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>
                <ScrollArea className="h-[250px]">
                  {filteredStates.map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </motion.div>

          {/* District */}
          {selectedState && (
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                className="text-[#003E6D]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                District *
              </Label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                  <SelectValue placeholder="Select your district" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="sticky top-0 bg-white p-2 border-b z-10">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003E6D]/40" />
                      <input
                        type="text"
                        placeholder="Search districts..."
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-[#003E6D]/20 rounded-lg text-sm focus:outline-none focus:border-[#FFD700]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[250px]">
                    {filteredDistricts.map((district) => (
                      <SelectItem key={district.name} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Place/Village */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Place / Village *
            </Label>
            <Input
              value={placeVillage}
              onChange={(e) => setPlaceVillage(e.target.value)}
              placeholder="Enter your place or village name"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </motion.div>

          {/* PIN Code */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              PIN Code *
            </Label>
            <Input
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit PIN code"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
              maxLength={6}
            />
          </motion.div>
        </>
      )}

      {/* Non-India fields */}
      {selectedCountry && !isIndia && (
        <>
          {/* Region */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Region *
            </Label>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter your region/state/province"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </motion.div>

          {/* Postal Code */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Postal Code *
            </Label>
            <Input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter your postal code"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </motion.div>
        </>
      )}

      {/* Alternate Mobile */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label
          className="text-[#003E6D]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          Alternate Mobile Number (Optional)
        </Label>
        <Input
          value={alternateMobile}
          onChange={(e) => setAlternateMobile(e.target.value.replace(/\\D/g, "").slice(0, 10))}
          placeholder="Enter alternate mobile number"
          className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
          style={{ fontFamily: "Inter, sans-serif" }}
          maxLength={10}
        />
      </motion.div>

      {/* Section Divider */}
      <motion.div variants={itemVariants} className="py-4">
        <Separator className="bg-[#003E6D]/10" />
      </motion.div>

      {/* Personal & Producer Identification Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-[#003E6D]/5 to-[#FFD700]/5 border-[#003E6D]/20 p-6">
          <div className="space-y-6">
            {/* Section Header */}
            <div>
              <h3
                className="text-[#003E6D] mb-2"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.25rem" }}
              >
                🪪 {userRole === "producer" ? "Personal & Producer Identification" : "Personal Identification"}
              </h3>
              <p
                className="text-[#003E6D]/60 text-sm"
                style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
              >
                {userRole === "producer"
                  ? "Please provide your personal details and producer identification documents."
                  : "Please provide your personal identification details."}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label
                className="text-[#003E6D]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                📅 Date of Birth *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003E6D]/40 pointer-events-none" />
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl pl-11"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label
                className="text-[#003E6D]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Gender *
              </Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 border-2 border-[#003E6D]/20 rounded-xl p-3 hover:border-[#FFD700] transition-colors cursor-pointer">
                    <RadioGroupItem value="male" id="male" className="border-[#003E6D]/30" />
                    <Label htmlFor="male" className="cursor-pointer flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-[#003E6D]/20 rounded-xl p-3 hover:border-[#FFD700] transition-colors cursor-pointer">
                    <RadioGroupItem value="female" id="female" className="border-[#003E6D]/30" />
                    <Label htmlFor="female" className="cursor-pointer flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-[#003E6D]/20 rounded-xl p-3 hover:border-[#FFD700] transition-colors cursor-pointer">
                    <RadioGroupItem value="other" id="other" className="border-[#003E6D]/30" />
                    <Label htmlFor="other" className="cursor-pointer flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      Other
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-[#003E6D]/20 rounded-xl p-3 hover:border-[#FFD700] transition-colors cursor-pointer">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" className="border-[#003E6D]/30" />
                    <Label htmlFor="prefer-not-to-say" className="cursor-pointer flex-1 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      Prefer not to say
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Producer Identification Type */}
            {userRole === "producer" && producerIdTypes.length > 0 && (
              <div className="space-y-2">
                <Label
                  className="text-[#003E6D]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  📄 Producer Identification Type *
                </Label>
                <p
                  className="text-[#003E6D]/60 text-xs mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {isIndia && selectedState 
                    ? `Document types for ${selectedState}, India`
                    : `Document types for ${selectedCountry}`}
                </p>
                <Select value={producerIdType} onValueChange={setProducerIdType}>
                  <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                    <SelectValue placeholder="Select producer identification type" />
                  </SelectTrigger>
                  <SelectContent>
                    {producerIdTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Others Description Field */}
            {userRole === "producer" && producerIdType === "Others" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label
                  className="text-[#003E6D]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  📝 Describe your identification document *
                </Label>
                <Textarea
                  value={producerIdDescription}
                  onChange={(e) => setProducerIdDescription(e.target.value)}
                  placeholder="Please describe the type of producer identification document you have..."
                  className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] min-h-[100px] rounded-xl resize-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </motion.div>
            )}

            {/* Info Note */}
            <Card className="bg-[#FFD700]/10 border-[#FFD700]/30 p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-[#003E6D]/70 flex-shrink-0 mt-0.5" />
                <p
                  className="text-[#003E6D]/70 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                >
                  <strong>Note:</strong> Identification types differ by country and region. Select the most accurate option or choose 'Others' if your document type is not listed.
                </p>
              </div>
            </Card>
          </div>
        </Card>
      </motion.div>

      {/* Section Divider */}
      <motion.div variants={itemVariants} className="py-4">
        <Separator className="bg-[#003E6D]/10" />
      </motion.div>

      {/* Virtual Number Option */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-[#FFD700]/5 to-[#003E6D]/5 border-[#FFD700]/20 p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="virtualNumber"
              checked={useVirtualNumber}
              onCheckedChange={(checked) => setUseVirtualNumber(checked as boolean)}
              className="mt-1 border-[#003E6D]/30"
            />
            <div className="flex-1">
              <label
                htmlFor="virtualNumber"
                className="text-[#003E6D] cursor-pointer"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Use Virtual Number (hide my real number)
              </label>
              <div className="flex items-start gap-2 mt-2">
                <Info className="w-4 h-4 text-[#003E6D]/60 flex-shrink-0 mt-0.5" />
                <p
                  className="text-[#003E6D]/70 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                >
                  You'll receive a secure in-app virtual number to avoid unwanted contact. Your
                  original number remains private unless you choose to make it visible.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl py-6 transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
        >
          Continue to ID Verification
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}