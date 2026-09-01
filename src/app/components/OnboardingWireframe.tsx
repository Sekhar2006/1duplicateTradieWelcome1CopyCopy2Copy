import { ArrowRight, ArrowDown } from "lucide-react";

export function OnboardingWireframe() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TRADIE App - Complete Onboarding Flow
          </h1>
          <p className="text-gray-600">Low Fidelity Wireframe (Grayscale)</p>
        </div>

        {/* Flow Container */}
        <div className="space-y-8">
          
          {/* ROW 1: SPLASH → WELCOME */}
          <div className="flex items-start gap-8 justify-center">
            
            {/* SPLASH SCREEN */}
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-8 w-80 h-[600px] flex flex-col items-center justify-center">
                <div className="text-center space-y-6">
                  {/* Logo Placeholder */}
                  <div className="w-32 h-32 border-4 border-gray-400 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-gray-500 text-sm">APP LOGO</span>
                  </div>
                  
                  {/* App Name */}
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-300 rounded w-48 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                  </div>
                  
                  {/* Loading */}
                  <div className="mt-12">
                    <div className="h-2 bg-gray-300 rounded-full w-64 mx-auto">
                      <div className="h-2 bg-gray-600 rounded-full w-32"></div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">Loading...</p>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">1. SPLASH</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center pt-64">
              <ArrowRight className="w-8 h-8 text-gray-600" />
            </div>

            {/* WELCOME SCREEN */}
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-80 h-[600px] overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4">
                  <div className="h-6 bg-gray-400 rounded w-40"></div>
                </div>

                {/* Description Block */}
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>

                {/* Country Dropdown */}
                <div className="mb-4">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="border-2 border-gray-400 rounded h-12 flex items-center px-3">
                    <span className="text-gray-500 text-sm">🌍 Select Country ▼</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-20 mt-2"></div>
                </div>

                {/* Language Dropdown */}
                <div className="mb-4">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="border-2 border-gray-400 rounded h-12 flex items-center px-3">
                    <span className="text-gray-500 text-sm">🗣️ Select Language ▼</span>
                  </div>
                </div>

                {/* Country Code Display */}
                <div className="mb-6 p-3 bg-gray-100 border border-gray-300 rounded">
                  <span className="text-gray-500 text-xs">✓ Country Code: +91 (Auto)</span>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex items-center justify-center">
                    <span className="text-white font-bold">SIGN UP</span>
                  </div>
                  <div className="border-2 border-gray-600 rounded-lg h-12 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">LOGIN</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">2. WELCOME</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </div>

          {/* ROW 2: SIGN-UP → OTP → BONUS */}
          <div className="flex items-start gap-8 justify-center">
            
            {/* SIGN-UP SCREEN */}
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-80 h-[600px] overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4">
                  <div className="h-6 bg-gray-400 rounded w-32"></div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  {/* Full Name */}
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                    <div className="border-2 border-gray-400 rounded h-12 px-3 flex items-center">
                      <span className="text-gray-400 text-sm">Enter full name</span>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="flex gap-2">
                      <div className="border-2 border-gray-400 rounded h-12 w-16 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">+91</span>
                      </div>
                      <div className="border-2 border-gray-400 rounded h-12 flex-1 px-3 flex items-center">
                        <span className="text-gray-400 text-sm">Mobile number</span>
                      </div>
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="border-2 border-gray-400 rounded h-12 px-3 flex items-center">
                      <span className="text-gray-400 text-sm">Email (optional)</span>
                    </div>
                  </div>
                </div>

                {/* Get OTP Button */}
                <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex items-center justify-center mb-6">
                  <span className="text-white font-bold">GET OTP</span>
                </div>

                {/* OTP Input Section */}
                <div className="border-2 border-gray-600 rounded-lg p-4 bg-gray-50">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                  <div className="flex gap-2 justify-center mb-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="w-10 h-12 border-2 border-gray-400 rounded flex items-center justify-center">
                        <span className="text-gray-400">-</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-2 border-gray-600 rounded h-10 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-bold">VERIFY OTP</span>
                  </div>
                </div>

                {/* Success State */}
                <div className="mt-4 p-3 bg-gray-100 border-2 border-gray-400 rounded">
                  <span className="text-gray-600 text-xs">✓ Success State</span>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">3. SIGN-UP</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center pt-64">
              <ArrowRight className="w-8 h-8 text-gray-600" />
            </div>

            {/* WELCOME BONUS SCREEN */}
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-80 h-[600px] relative overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4">
                  <div className="h-6 bg-gray-400 rounded w-40"></div>
                </div>

                {/* Slide Indicator */}
                <div className="flex gap-2 justify-center mb-6">
                  <div className="w-8 h-2 bg-gray-800 rounded"></div>
                  <div className="w-8 h-2 bg-gray-300 rounded"></div>
                </div>

                {/* Slide 1: Commit Coins */}
                <div className="border-2 border-gray-400 rounded-lg p-6 mb-4 bg-gray-50">
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div className="h-6 bg-gray-400 rounded w-48 mx-auto mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
                  </div>
                </div>

                {/* Slide 2 Preview */}
                <div className="border-2 border-gray-300 rounded-lg p-4 mb-6 bg-white">
                  <div className="text-center">
                    <div className="h-5 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
                    <div className="flex gap-2 justify-center">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>

                {/* Go to Dashboard Button */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex items-center justify-center">
                    <span className="text-white font-bold">GO TO DASHBOARD →</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">4. WELCOME BONUS</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </div>

          {/* ROW 3: KYC BASIC DETAILS */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-[700px] h-[600px] overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4 flex items-center justify-between">
                  <div className="h-6 bg-gray-400 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-20 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3"></div>
                    </div>

                    {/* Address */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-20 px-3"></div>
                    </div>

                    {/* ID Type Dropdown */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-28 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3 flex items-center">
                        <span className="text-gray-400 text-xs">Aadhar / PAN / DL ▼</span>
                      </div>
                    </div>

                    {/* ID Number */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3"></div>
                    </div>

                    {/* Alternate Mobile */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3"></div>
                    </div>

                    {/* Virtual No Toggle */}
                    <div className="flex items-center justify-between border-2 border-gray-400 rounded p-3">
                      <span className="text-gray-500 text-xs">Virtual No</span>
                      <div className="w-12 h-6 border-2 border-gray-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Face Capture */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-28 mb-2"></div>
                      <div className="border-4 border-gray-400 rounded-lg h-48 flex items-center justify-center bg-gray-100">
                        <span className="text-gray-500 text-sm">FACE CAPTURE</span>
                      </div>
                      <div className="border-2 border-gray-600 rounded h-10 mt-2 flex items-center justify-center">
                        <span className="text-gray-600 text-xs font-bold">CAPTURE</span>
                      </div>
                    </div>

                    {/* Upload ID Documents */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="border-2 border-dashed border-gray-400 rounded-lg h-24 flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400 text-xs">📄 Upload ID</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <div className="border-2 border-gray-600 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">← BACK</span>
                  </div>
                  <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-white font-bold">NEXT →</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">5. KYC BASIC DETAILS</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </div>

          {/* ROW 4: PRODUCER IDENTITY CONFIRMATION */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-[700px] h-[600px] overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4">
                  <div className="h-6 bg-gray-400 rounded w-64 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-96"></div>
                </div>

                {/* Alert Banner */}
                <div className="border-l-4 border-gray-600 bg-gray-100 p-3 mb-6">
                  <div className="h-3 bg-gray-400 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Left: Dropdowns */}
                  <div className="space-y-4">
                    {/* Country Dropdown */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-3 bg-gray-300 rounded w-28"></div>
                        <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-xs text-gray-400">i</span>
                        </div>
                      </div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3 flex items-center">
                        <span className="text-gray-400 text-xs">🌍 Select Country ▼</span>
                      </div>
                      <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                        <span className="text-gray-500 text-xs">✓ Selected: India</span>
                      </div>
                    </div>

                    {/* Region Dropdown */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3 flex items-center">
                        <span className="text-gray-400 text-xs">📍 Select State/Region ▼</span>
                      </div>
                      <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                        <span className="text-gray-500 text-xs">✓ Andhra Pradesh</span>
                      </div>
                    </div>

                    {/* Document Type */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-40 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-10 px-3 flex items-center">
                        <span className="text-gray-400 text-xs">📄 Document Type ▼</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <div>• Pattadar Passbook (AP)</div>
                        <div>• 7/12 Extract (Maharashtra)</div>
                        <div>• FSA Registration (USA)</div>
                        <div>• Others</div>
                      </div>
                    </div>

                    {/* Others Text Box */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-40 mb-2"></div>
                      <div className="border-2 border-gray-400 rounded h-20 px-3 py-2">
                        <span className="text-gray-400 text-xs">Describe document type...</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Upload */}
                  <div className="space-y-4">
                    {/* Upload Label */}
                    <div>
                      <div className="h-3 bg-gray-300 rounded w-48 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 mb-3"></div>
                    </div>

                    {/* Upload Area */}
                    <div className="border-4 border-dashed border-gray-400 rounded-lg h-48 flex flex-col items-center justify-center bg-gray-50">
                      <div className="w-16 h-16 border-4 border-gray-400 rounded-full mb-3 flex items-center justify-center">
                        <span className="text-2xl">📤</span>
                      </div>
                      <div className="h-4 bg-gray-400 rounded w-40 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>

                    {/* Preview Box */}
                    <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-100">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 border-2 border-gray-400 rounded bg-white"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-400 rounded w-32 mb-2"></div>
                          <div className="h-2 bg-gray-300 rounded w-20 mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <div className="border-2 border-gray-600 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">← BACK</span>
                  </div>
                  <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-white font-bold">NEXT →</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">6. PRODUCER IDENTITY CONFIRMATION</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </div>

          {/* ROW 5: CHOOSE TRADING ROLE */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-[700px] h-[600px] overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4">
                  <div className="h-6 bg-gray-400 rounded w-48"></div>
                </div>

                {/* Info Note */}
                <div className="border-l-4 border-gray-600 bg-gray-100 p-3 mb-6">
                  <div className="h-3 bg-gray-400 rounded w-64"></div>
                </div>

                {/* Multi-select Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Producer */}
                  <div className="border-2 border-gray-400 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-800 bg-gray-800 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-20"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Commission Agent */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-24"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Trader */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Buyer */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Verifier */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Bank */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-12"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Logistics */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-20"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Storage */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>

                  {/* Insurance */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-20"></div>
                    </div>
                    <div className="w-12 h-12 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <div className="border-2 border-gray-600 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">← BACK</span>
                  </div>
                  <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-white font-bold">NEXT →</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">7. CHOOSE TRADING ROLE</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </div>

          {/* ROW 6: SUBSCRIPTION / UPGRADE */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg p-6 w-[700px] h-[600px] overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-300 pb-3 mb-4">
                  <div className="h-6 bg-gray-400 rounded w-56"></div>
                </div>

                {/* Info Message */}
                <div className="border-l-4 border-gray-600 bg-gray-100 p-3 mb-6">
                  <div className="h-3 bg-gray-400 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>

                {/* Subscription Tiers */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Basic */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="h-5 bg-gray-400 rounded w-16 mb-3"></div>
                    <div className="h-8 bg-gray-300 rounded w-20 mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="border-2 border-gray-600 rounded h-8 flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-bold">SELECT</span>
                    </div>
                  </div>

                  {/* Plus */}
                  <div className="border-4 border-gray-800 rounded-lg p-4 bg-gray-50">
                    <div className="h-5 bg-gray-400 rounded w-16 mb-3"></div>
                    <div className="h-8 bg-gray-400 rounded w-24 mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    <div className="border-2 border-gray-800 bg-gray-800 rounded h-8 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">SELECTED</span>
                    </div>
                  </div>

                  {/* Platinum */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="h-5 bg-gray-400 rounded w-20 mb-3"></div>
                    <div className="h-8 bg-gray-300 rounded w-24 mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="border-2 border-gray-600 rounded h-8 flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-bold">SELECT</span>
                    </div>
                  </div>
                </div>

                {/* Producer Rank Placeholder */}
                <div className="border-2 border-gray-400 rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="h-4 bg-gray-400 rounded w-32 mb-3"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border-2 border-gray-400 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <div className="border-2 border-gray-600 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">← BACK</span>
                  </div>
                  <div className="border-4 border-gray-800 bg-gray-800 rounded-lg h-12 flex-1 flex items-center justify-center">
                    <span className="text-white font-bold">GO TO DASHBOARD →</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">8. SUBSCRIPTION / UPGRADE</p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowDown className="w-8 h-8 text-gray-600" />
          </div>

          {/* ROW 7: DASHBOARD */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="bg-white border-4 border-gray-800 rounded-lg w-[900px] h-[600px] overflow-hidden flex">
                {/* Sidebar */}
                <div className="w-64 border-r-4 border-gray-300 bg-gray-100 p-4">
                  {/* Logo */}
                  <div className="h-8 bg-gray-400 rounded w-32 mb-6"></div>
                  
                  {/* Menu Items */}
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className={`h-10 rounded px-3 flex items-center gap-2 ${i === 1 ? 'bg-gray-800' : 'border border-gray-300'}`}>
                        <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                        <div className={`h-3 rounded w-24 ${i === 1 ? 'bg-white' : 'bg-gray-300'}`}></div>
                      </div>
                    ))}
                  </div>

                  {/* Back Button */}
                  <div className="absolute bottom-4 left-4 right-64">
                    <div className="border-2 border-gray-600 rounded-lg h-10 flex items-center justify-center gap-2">
                      <span className="text-gray-600 text-xs font-bold">← BACK</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-300">
                    <div className="h-5 bg-gray-400 rounded w-48"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 border-2 border-gray-400 rounded-full"></div>
                      <div className="w-8 h-8 border-2 border-gray-400 rounded-full"></div>
                      <div className="w-10 h-10 border-2 border-gray-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* AI Insights Cards */}
                  <div className="mb-6">
                    <div className="h-5 bg-gray-400 rounded w-32 mb-3"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-gray-400 rounded-lg p-4 bg-gray-50 h-32">
                        <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="border-2 border-gray-400 rounded-lg p-4 bg-gray-50 h-32">
                        <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  {/* Commit Coin Wallet */}
                  <div className="mb-6">
                    <div className="h-5 bg-gray-400 rounded w-40 mb-3"></div>
                    <div className="border-4 border-gray-800 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-6 bg-gray-400 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="w-16 h-16 border-4 border-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <div className="h-5 bg-gray-400 rounded w-32 mb-3"></div>
                    <div className="grid grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border-2 border-gray-400 rounded-lg p-3 text-center">
                          <div className="w-10 h-10 border-2 border-gray-400 rounded mx-auto mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-16 mx-auto"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 font-bold text-gray-700">9. DASHBOARD</p>
            </div>
          </div>

          {/* End Note */}
          <div className="text-center mt-12 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-white text-xl font-bold mb-2">
              Complete Onboarding Flow
            </h2>
            <p className="text-gray-300 text-sm">
              All screens connected with navigation arrows showing the user journey from Splash to Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
