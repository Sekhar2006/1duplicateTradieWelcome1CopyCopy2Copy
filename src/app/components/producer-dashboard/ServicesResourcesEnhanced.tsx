import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tractor,
  Users,
  Droplet,
  Plane,
  Package,
  Home,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  DollarSign,
  Plus,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  ExternalLink,
  Map,
  Info,
  Wrench,
  Truck,
  Bot,
  MessageSquare,
  ThumbsUp,
  Flag,
  Zap,
  Sun,
  Sprout,
  ShoppingCart,
  Factory,
  Warehouse,
  FlaskConical,
  Banknote,
  FileText,
  Store,
  Network,
  CircleDot,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { grokAI } from "./GrokAIService";
import { toast } from "sonner@2.0.3";

const { colors, typography, spacing, radius, shadows } = designTokens;

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  location: string;
  district: string;
  state: string;
  distance: number;
  rating: number;
  reviews: number;
  verified: boolean;
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  pricing: {
    type: "hourly" | "daily" | "fixed" | "negotiable" | "per_unit";
    amount: number;
    unit: string;
  };
  availability: "available" | "busy" | "booked";
  availableDates?: string[];
  services: string[];
  description: string;
  experience: number;
  certifications?: string[];
  images?: string[];
  responseTime: string;
  completionRate: number;
  grokScore: number;
  lastActive: Date;
  providerType: "rental" | "seller" | "service" | "consultant";
}

interface ServiceRequest {
  serviceType: string;
  subcategory: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  budget: string;
  urgency: "low" | "medium" | "high";
  quantity?: string;
}

export function ServicesResourcesEnhanced() {
  const [activeCategory, setActiveCategory] = useState("equipment-rental");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [providerTypeFilter, setProviderTypeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
    serviceType: "",
    subcategory: "",
    description: "",
    location: "",
    startDate: "",
    budget: "",
    urgency: "medium",
  });

  // Enhanced service providers with all new categories
  const serviceProviders: ServiceProvider[] = [
    // Equipment & Machinery Rentals
    {
      id: "eq-001",
      name: "Kumar Earth Movers",
      category: "equipment-rental",
      subcategory: "JCB",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 12.5,
      rating: 4.8,
      reviews: 156,
      verified: true,
      contact: {
        phone: "+91 98765 43210",
        email: "kumar.earthmovers@gmail.com",
        whatsapp: "+91 98765 43210",
      },
      pricing: {
        type: "hourly",
        amount: 1200,
        unit: "per hour",
      },
      availability: "available",
      services: ["JCB 3DX", "Excavation", "Land Leveling", "Digging"],
      description: "Professional earth moving services with modern JCB equipment. 10+ years experience.",
      experience: 12,
      certifications: ["JCB Certified Operator"],
      responseTime: "< 2 hours",
      completionRate: 98,
      grokScore: 92,
      lastActive: new Date(),
      providerType: "rental",
    },
    {
      id: "eq-002",
      name: "Harvest Equipment Rentals",
      category: "equipment-rental",
      subcategory: "Harvester Machines",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 3.8,
      rating: 4.5,
      reviews: 145,
      verified: true,
      contact: {
        phone: "+91 96543 21098",
        email: "harvest.rentals@gmail.com",
      },
      pricing: {
        type: "daily",
        amount: 8500,
        unit: "per day",
      },
      availability: "available",
      services: ["Combine Harvester", "Wheat Thresher", "Rice Harvester", "Operator Included"],
      description: "Modern harvesting equipment with experienced operators. Well-maintained machinery.",
      experience: 10,
      responseTime: "< 2 hours",
      completionRate: 96,
      grokScore: 89,
      lastActive: new Date(),
      providerType: "rental",
    },
    {
      id: "eq-003",
      name: "SolarAgri Solutions",
      category: "equipment-rental",
      subcategory: "Solar Pumps",
      location: "Bengaluru, Karnataka",
      district: "Bengaluru Urban",
      state: "Karnataka",
      distance: 42.0,
      rating: 4.7,
      reviews: 89,
      verified: true,
      contact: {
        phone: "+91 98123 45678",
        email: "info@solaragri.com",
      },
      pricing: {
        type: "fixed",
        amount: 45000,
        unit: "installation",
      },
      availability: "available",
      services: ["Solar Water Pumps", "Solar Panels", "Installation", "Maintenance"],
      description: "Complete solar pumping solutions with 5-year warranty. Government subsidies available.",
      experience: 8,
      certifications: ["MNRE Certified", "ISO 9001"],
      responseTime: "< 4 hours",
      completionRate: 97,
      grokScore: 94,
      lastActive: new Date(),
      providerType: "rental",
    },
    {
      id: "eq-004",
      name: "AgriDrone Solutions",
      category: "equipment-rental",
      subcategory: "Crop Monitoring Drones",
      location: "Bengaluru, Karnataka",
      district: "Bengaluru Urban",
      state: "Karnataka",
      distance: 45.0,
      rating: 4.7,
      reviews: 67,
      verified: true,
      contact: {
        phone: "+91 98123 45678",
        email: "info@agridrone.com",
      },
      pricing: {
        type: "per_unit",
        amount: 3500,
        unit: "per acre",
      },
      availability: "available",
      services: ["Crop Health Monitoring", "Aerial Surveying", "Thermal Imaging", "Detailed Reports"],
      description: "Advanced drone services with AI-powered crop analysis. Same-day reports.",
      experience: 5,
      certifications: ["DGCA Certified", "Drone Pilot License"],
      responseTime: "< 3 hours",
      completionRate: 99,
      grokScore: 91,
      lastActive: new Date(),
      providerType: "service",
    },
    {
      id: "eq-005",
      name: "Cauvery Borewell Services",
      category: "equipment-rental",
      subcategory: "Borewell Drilling",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 5.2,
      rating: 4.9,
      reviews: 89,
      verified: true,
      contact: {
        phone: "+91 97654 32109",
        email: "cauvery.borewell@gmail.com",
        whatsapp: "+91 97654 32109",
      },
      pricing: {
        type: "per_unit",
        amount: 180,
        unit: "per foot",
      },
      availability: "busy",
      availableDates: ["2025-11-01", "2025-11-05"],
      services: ["Borewell Drilling", "Pump Installation", "Water Testing", "Maintenance"],
      description: "Expert borewell drilling with 95% success rate. Free water detection survey.",
      experience: 15,
      certifications: ["CGWA Registered", "ISO Certified"],
      responseTime: "< 1 hour",
      completionRate: 97,
      grokScore: 95,
      lastActive: new Date(),
      providerType: "service",
    },

    // Material & Input Sellers
    {
      id: "mat-001",
      name: "Karnataka Seed Corporation",
      category: "materials",
      subcategory: "Seeds - Hybrid",
      location: "Mysuru, Karnataka",
      district: "Mysuru",
      state: "Karnataka",
      distance: 15.0,
      rating: 4.6,
      reviews: 234,
      verified: true,
      contact: {
        phone: "+91 99876 54321",
        email: "ksc@example.com",
      },
      pricing: {
        type: "per_unit",
        amount: 450,
        unit: "per kg",
      },
      availability: "available",
      services: ["Hybrid Seeds", "Vegetable Seeds", "Grain Seeds", "Certified Quality"],
      description: "Government certified hybrid seeds with high yield guarantee. All major crops available.",
      experience: 25,
      certifications: ["Seed Certification", "Quality Assured"],
      responseTime: "< 6 hours",
      completionRate: 95,
      grokScore: 88,
      lastActive: new Date(),
      providerType: "seller",
    },
    {
      id: "mat-002",
      name: "Organic Fertilizers Karnataka",
      category: "materials",
      subcategory: "Fertilizers - Organic",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 8.5,
      rating: 4.8,
      reviews: 178,
      verified: true,
      contact: {
        phone: "+91 98765 11111",
        email: "organicfert@gmail.com",
      },
      pricing: {
        type: "per_unit",
        amount: 350,
        unit: "per 50kg bag",
      },
      availability: "available",
      services: ["Organic Compost", "Vermicompost", "Bio-fertilizers", "Soil Amendments"],
      description: "100% organic fertilizers. NPOP certified. Improves soil health naturally.",
      experience: 12,
      certifications: ["NPOP Certified", "Organic India"],
      responseTime: "< 4 hours",
      completionRate: 96,
      grokScore: 92,
      lastActive: new Date(),
      providerType: "seller",
    },
    {
      id: "mat-003",
      name: "Green Thumb Nursery",
      category: "materials",
      subcategory: "Nurseries",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 6.0,
      rating: 4.7,
      reviews: 156,
      verified: true,
      contact: {
        phone: "+91 97654 22222",
        email: "greenthumb@example.com",
      },
      pricing: {
        type: "negotiable",
        amount: 50,
        unit: "per plant",
      },
      availability: "available",
      services: ["Fruit Plants", "Vegetable Seedlings", "Ornamental Plants", "Expert Advice"],
      description: "Wide variety of healthy plants and seedlings. Expert guidance on plant care.",
      experience: 15,
      responseTime: "< 3 hours",
      completionRate: 94,
      grokScore: 87,
      lastActive: new Date(),
      providerType: "seller",
    },
    {
      id: "mat-004",
      name: "ShadeNet Pro Installers",
      category: "materials",
      subcategory: "Shade Net",
      location: "Mysuru, Karnataka",
      district: "Mysuru",
      state: "Karnataka",
      distance: 18.0,
      rating: 4.5,
      reviews: 92,
      verified: true,
      contact: {
        phone: "+91 96543 33333",
        email: "shadenetpro@gmail.com",
      },
      pricing: {
        type: "per_unit",
        amount: 120,
        unit: "per sq meter",
      },
      availability: "available",
      services: ["Shade Net Installation", "Green House Setup", "Poly Houses", "Maintenance"],
      description: "Professional shade net and greenhouse installation. Quality materials with warranty.",
      experience: 10,
      certifications: ["Quality Certified"],
      responseTime: "< 5 hours",
      completionRate: 93,
      grokScore: 86,
      lastActive: new Date(),
      providerType: "seller",
    },
    {
      id: "mat-005",
      name: "Eco Pest Control Solutions",
      category: "materials",
      subcategory: "Pest Control",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 10.0,
      rating: 4.6,
      reviews: 134,
      verified: true,
      contact: {
        phone: "+91 98123 44444",
        email: "ecopest@example.com",
      },
      pricing: {
        type: "per_unit",
        amount: 800,
        unit: "per acre",
      },
      availability: "available",
      services: ["Organic Pesticides", "Natural Repellents", "IPM Solutions", "Consultation"],
      description: "Eco-friendly pest control solutions. Safe for crops and environment.",
      experience: 8,
      certifications: ["Organic Certified"],
      responseTime: "< 2 hours",
      completionRate: 95,
      grokScore: 90,
      lastActive: new Date(),
      providerType: "seller",
    },

    // Labor & Workforce Services
    {
      id: "lab-001",
      name: "Karnataka Farm Labor Association",
      category: "labor",
      subcategory: "Unskilled Labor - Group",
      location: "Mysuru, Karnataka",
      district: "Mysuru",
      state: "Karnataka",
      distance: 8.3,
      rating: 4.6,
      reviews: 234,
      verified: true,
      contact: {
        phone: "+91 99876 54321",
        email: "kfla@example.com",
      },
      pricing: {
        type: "daily",
        amount: 400,
        unit: "per person/day",
      },
      availability: "available",
      services: ["Manual Labor", "Harvesting", "Planting", "Weeding"],
      description: "Reliable labor pool of 500+ workers. Available for seasonal work and general farm labor.",
      experience: 8,
      responseTime: "< 4 hours",
      completionRate: 95,
      grokScore: 88,
      lastActive: new Date(),
      providerType: "service",
    },
    {
      id: "lab-002",
      name: "Skilled Farm Technicians",
      category: "labor",
      subcategory: "Skilled Labor - Mechanics",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 7.0,
      rating: 4.7,
      reviews: 98,
      verified: true,
      contact: {
        phone: "+91 97654 55555",
        email: "skilledtech@example.com",
      },
      pricing: {
        type: "daily",
        amount: 800,
        unit: "per day",
      },
      availability: "available",
      services: ["Equipment Repair", "Electrical Work", "Plumbing", "Machine Maintenance"],
      description: "Certified technicians for farm equipment repair and maintenance. Quick response.",
      experience: 12,
      certifications: ["ITI Certified", "Trade License"],
      responseTime: "< 2 hours",
      completionRate: 97,
      grokScore: 91,
      lastActive: new Date(),
      providerType: "service",
    },
    {
      id: "lab-003",
      name: "Farm Worker Housing - Mandya",
      category: "labor",
      subcategory: "Worker Housing",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 6.5,
      rating: 4.4,
      reviews: 78,
      verified: true,
      contact: {
        phone: "+91 95432 10987",
        email: "farmhousing@example.com",
      },
      pricing: {
        type: "daily",
        amount: 150,
        unit: "per person/day",
      },
      availability: "available",
      services: ["Dormitory Housing", "Meals Available", "Transport to Farm", "Clean Facilities"],
      description: "Clean and safe temporary housing for seasonal workers. Capacity: 50 workers.",
      experience: 6,
      responseTime: "< 6 hours",
      completionRate: 94,
      grokScore: 86,
      lastActive: new Date(),
      providerType: "service",
    },

    // Additional Producer Support Services
    {
      id: "sup-001",
      name: "Karnataka Farm Transport Services",
      category: "support",
      subcategory: "Transport & Logistics",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 5.0,
      rating: 4.5,
      reviews: 167,
      verified: true,
      contact: {
        phone: "+91 98765 66666",
        email: "farmtransport@example.com",
      },
      pricing: {
        type: "per_unit",
        amount: 15,
        unit: "per km per ton",
      },
      availability: "available",
      services: ["Produce Transport", "Cold Chain", "Bulk Transport", "Same Day Delivery"],
      description: "Reliable farm produce transportation with cold chain facility. Timely delivery guaranteed.",
      experience: 15,
      responseTime: "< 3 hours",
      completionRate: 96,
      grokScore: 89,
      lastActive: new Date(),
      providerType: "service",
    },
    {
      id: "sup-002",
      name: "AgriPack Solutions",
      category: "support",
      subcategory: "Packaging & Storage",
      location: "Mysuru, Karnataka",
      district: "Mysuru",
      state: "Karnataka",
      distance: 12.0,
      rating: 4.6,
      reviews: 124,
      verified: true,
      contact: {
        phone: "+91 97654 77777",
        email: "agripack@example.com",
      },
      pricing: {
        type: "per_unit",
        amount: 25,
        unit: "per crate",
      },
      availability: "available",
      services: ["Packaging Materials", "Cold Storage", "Grading Services", "Labeling"],
      description: "Complete packaging and storage solutions. Quality materials for long shelf life.",
      experience: 10,
      responseTime: "< 4 hours",
      completionRate: 94,
      grokScore: 87,
      lastActive: new Date(),
      providerType: "service",
    },
    {
      id: "sup-003",
      name: "Soil Health Testing Lab",
      category: "support",
      subcategory: "Soil Testing",
      location: "Bengaluru, Karnataka",
      district: "Bengaluru Urban",
      state: "Karnataka",
      distance: 48.0,
      rating: 4.8,
      reviews: 203,
      verified: true,
      contact: {
        phone: "+91 98123 88888",
        email: "soillab@example.com",
      },
      pricing: {
        type: "per_unit",
        amount: 500,
        unit: "per sample",
      },
      availability: "available",
      services: ["Soil Testing", "Water Testing", "Fertilizer Recommendations", "Consultation"],
      description: "NABL accredited soil testing lab. Detailed reports with fertilizer recommendations.",
      experience: 20,
      certifications: ["NABL Accredited", "ISO Certified"],
      responseTime: "< 24 hours",
      completionRate: 98,
      grokScore: 93,
      lastActive: new Date(),
      providerType: "consultant",
    },
    {
      id: "sup-004",
      name: "Krishi Insurance Services",
      category: "support",
      subcategory: "Insurance Services",
      location: "Mandya, Karnataka",
      district: "Mandya",
      state: "Karnataka",
      distance: 4.0,
      rating: 4.7,
      reviews: 189,
      verified: true,
      contact: {
        phone: "+91 96543 99999",
        email: "krishiinsurance@example.com",
      },
      pricing: {
        type: "negotiable",
        amount: 0,
        unit: "varies by coverage",
      },
      availability: "available",
      services: ["Crop Insurance", "Equipment Insurance", "Claims Assistance", "Government Schemes"],
      description: "Comprehensive agricultural insurance solutions. Expert guidance on government schemes.",
      experience: 18,
      certifications: ["IRDAI Certified Agent"],
      responseTime: "< 2 hours",
      completionRate: 96,
      grokScore: 90,
      lastActive: new Date(),
      providerType: "consultant",
    },
  ];

  // Enhanced service categories with new structure
  const serviceCategories = [
    {
      id: "equipment-rental",
      name: "Equipment & Machinery Rentals",
      icon: Tractor,
      color: colors.accent.gold,
      subcategories: [
        {
          name: "Earth Moving Equipment",
          items: ["JCB", "Dozers", "Loaders", "Excavators", "Dumpers", "Bulldozers", "Tractors", "Others"],
        },
        {
          name: "Agricultural Equipment",
          items: ["Seeders", "Threshers", "Sprayers", "Fertilizer Spreaders", "Harvester Machines", "Others"],
        },
        {
          name: "Solar Equipment & Motors",
          items: ["Solar Panels", "Solar Pumps", "Motors", "Inverters", "Batteries", "Others"],
        },
        {
          name: "Drone Services",
          items: ["Crop Monitoring Drones", "Spraying Drones", "Surveying & Mapping", "Others"],
        },
        {
          name: "Borewell Services",
          items: ["Borewell Drilling", "Maintenance", "Pumps", "Others"],
        },
      ],
    },
    {
      id: "materials",
      name: "Material & Input Sellers",
      icon: ShoppingCart,
      color: "#27AE60",
      subcategories: [
        {
          name: "Seeds",
          items: ["Seeds - Hybrid", "Seeds - Organic", "Seeds - Local Varieties", "Others"],
        },
        {
          name: "Fertilizers",
          items: ["Fertilizers - Organic", "Fertilizers - Chemical", "Fertilizers - Bio", "Others"],
        },
        {
          name: "Nurseries",
          items: ["Nurseries", "Plants & Saplings", "Seedlings", "Others"],
        },
        {
          name: "Shade Net & Materials",
          items: ["Shade Net", "Greenhouse Materials", "Poly House", "Others"],
        },
        {
          name: "Pest Control",
          items: ["Pest Control", "Pesticides", "Natural Repellents", "Others"],
        },
        {
          name: "Solar Equipment",
          items: ["Solar Equipment Sellers", "Solar Panels", "Accessories", "Others"],
        },
        {
          name: "Components",
          items: ["Electrical Components", "Mechanical Parts", "Motors", "Spare Parts", "Others"],
        },
      ],
    },
    {
      id: "labor",
      name: "Labor & Workforce Services",
      icon: Users,
      color: "#2F80ED",
      subcategories: [
        {
          name: "Skilled Labor",
          items: ["Skilled Labor - Operators", "Skilled Labor - Mechanics", "Skilled Labor - Drivers", "Skilled Labor - Technicians", "Others"],
        },
        {
          name: "Unskilled Labor",
          items: ["Unskilled Labor - Individual", "Unskilled Labor - Group", "Unskilled Labor - Association", "Others"],
        },
        {
          name: "Labor Associations",
          items: ["Local Associations", "State-wide Groups", "International Workers", "Others"],
        },
        {
          name: "Worker Support",
          items: ["Worker Housing", "Worker Transport", "Meal Services", "Others"],
        },
      ],
    },
    {
      id: "support",
      name: "Additional Producer Support",
      icon: Network,
      color: "#9B59B6",
      subcategories: [
        {
          name: "Logistics",
          items: ["Transport & Logistics", "Cold Chain", "Bulk Transport", "Others"],
        },
        {
          name: "Packaging",
          items: ["Packaging & Storage", "Cold Storage", "Warehouse", "Others"],
        },
        {
          name: "Consulting",
          items: ["Soil Testing", "Agro Consulting", "Crop Planning", "Others"],
        },
        {
          name: "Financial Services",
          items: ["Insurance Services", "Loan Assistance", "Subsidy Help", "Others"],
        },
        {
          name: "Marketplace",
          items: ["Direct Buying", "Direct Selling", "Commodity Trading", "Others"],
        },
      ],
    },
  ];

  // Season alerts
  const seasonAlerts = [
    {
      id: "alert-1",
      type: "labor",
      severity: "high",
      message: "Labor scarcity expected during harvest season (Nov-Dec)",
      suggestion: "Book labor services 2 weeks in advance",
    },
    {
      id: "alert-2",
      type: "equipment",
      severity: "medium",
      message: "High demand for harvesters in next 2 weeks",
      suggestion: "Pre-book equipment to ensure availability",
    },
    {
      id: "alert-3",
      type: "materials",
      severity: "medium",
      message: "Fertilizer prices expected to rise next month",
      suggestion: "Stock up on fertilizers now at current prices",
    },
  ];

  // Get current category subcategories
  const getCurrentSubcategories = () => {
    const category = serviceCategories.find((c) => c.id === activeCategory);
    if (!category) return [];
    return category.subcategories.flatMap((sub) => sub.items);
  };

  // Filter providers
  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesCategory = provider.category === activeCategory;
    const matchesSubcategory = !activeSubcategory || provider.subcategory === activeSubcategory;
    const matchesSearch =
      !searchQuery ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesLocation =
      !locationFilter ||
      provider.state.toLowerCase().includes(locationFilter.toLowerCase()) ||
      provider.district.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDistrict =
      !districtFilter ||
      provider.district.toLowerCase().includes(districtFilter.toLowerCase());
    const matchesPrice =
      !priceRange ||
      (priceRange === "low" && provider.pricing.amount < 1000) ||
      (priceRange === "medium" &&
        provider.pricing.amount >= 1000 &&
        provider.pricing.amount < 5000) ||
      (priceRange === "high" && provider.pricing.amount >= 5000);
    const matchesAvailability =
      !availabilityFilter || provider.availability === availabilityFilter;
    const matchesRating =
      !ratingFilter ||
      (ratingFilter === "4+" && provider.rating >= 4) ||
      (ratingFilter === "4.5+" && provider.rating >= 4.5);
    const matchesProviderType =
      !providerTypeFilter || provider.providerType === providerTypeFilter;

    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesSearch &&
      matchesLocation &&
      matchesDistrict &&
      matchesPrice &&
      matchesAvailability &&
      matchesRating &&
      matchesProviderType
    );
  });

  const handleRequestService = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setServiceRequest({
      ...serviceRequest,
      serviceType: provider.category,
      subcategory: provider.subcategory,
    });
    setShowRequestDialog(true);
  };

  const handleSubmitRequest = async () => {
    const grokAnalysis = grokAI.analyzeTransaction({
      type: "service_request",
      amount: parseInt(serviceRequest.budget) || 0,
      source: selectedProvider?.name || "Unknown",
      date: new Date(),
      historicalData: [],
    });

    if (grokAnalysis.level === "high" || grokAnalysis.level === "critical") {
      toast.warning("Unusual Service Request", {
        description: grokAnalysis.reason,
      });
    }

    toast.success("Service Request Submitted!", {
      description: `Your request has been sent to ${selectedProvider?.name}. They will contact you soon.`,
    });

    setShowRequestDialog(false);
    setServiceRequest({
      serviceType: "",
      subcategory: "",
      description: "",
      location: "",
      startDate: "",
      budget: "",
      urgency: "medium",
    });
  };

  const handleAddProvider = () => {
    toast.success("Provider Submitted!", {
      description: "Your service provider submission is under review. You'll be notified once approved.",
    });
    setShowAddProviderDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <h2
                style={{
                  fontFamily: typography.fonts.heading,
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                }}
              >
                🛠️ Producer Services, Sellers & Resource Hub
              </h2>
              <DSBadge variant="success" size="sm">
                {serviceProviders.length} Providers
              </DSBadge>
            </div>
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.text.secondary,
                marginTop: spacing.xs,
              }}
            >
              Complete marketplace for equipment rentals, material sellers, labor services, and support
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <DSButton
              variant={showMapView ? "primary" : "outline"}
              size="sm"
              leftIcon={<Map size={16} />}
              onClick={() => setShowMapView(!showMapView)}
            >
              Map View
            </DSButton>
            <DSButton
              variant="outline"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowAddProviderDialog(true)}
            >
              Add Provider
            </DSButton>
          </div>
        </div>
      </motion.div>

      {/* Season Alerts */}
      {seasonAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DSCard variant="elevated" padding="md">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                style={{ color: colors.status.warning, marginTop: 2 }}
              />
              <div className="flex-1 space-y-3">
                <h3
                  style={{
                    fontFamily: typography.fonts.subheading,
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                  }}
                >
                  ⏰ Peak Season Alerts & Recommendations
                </h3>
                {seasonAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: colors.surface.secondary,
                      border: `1px solid ${colors.border.default}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.primary,
                        fontWeight: typography.weights.medium,
                      }}
                    >
                      {alert.message}
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                        marginTop: spacing.xs,
                      }}
                    >
                      💡 {alert.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </DSCard>
        </motion.div>
      )}

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DSCard variant="elevated" padding="md">
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: colors.text.muted }}
                  />
                  <Input
                    placeholder="Search services, sellers, providers, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <DSButton
                variant="outline"
                size="md"
                leftIcon={<Filter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
                {showFilters ? (
                  <ChevronDown size={16} className="ml-1" />
                ) : (
                  <ChevronRight size={16} className="ml-1" />
                )}
              </DSButton>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t"
                  style={{ borderColor: colors.border.light }}
                >
                  <div>
                    <Label>State</Label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All States" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All States</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>District</Label>
                    <Select value={districtFilter} onValueChange={setDistrictFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Districts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Districts</SelectItem>
                        <SelectItem value="Mandya">Mandya</SelectItem>
                        <SelectItem value="Mysuru">Mysuru</SelectItem>
                        <SelectItem value="Bengaluru Urban">Bengaluru Urban</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Price Range</Label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Prices</SelectItem>
                        <SelectItem value="low">Low (&lt; ₹1,000)</SelectItem>
                        <SelectItem value="medium">Medium (₹1,000 - ₹5,000)</SelectItem>
                        <SelectItem value="high">High (&gt; ₹5,000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Provider Type</Label>
                    <Select value={providerTypeFilter} onValueChange={setProviderTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="rental">Rentals</SelectItem>
                        <SelectItem value="seller">Sellers</SelectItem>
                        <SelectItem value="service">Services</SelectItem>
                        <SelectItem value="consultant">Consultants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Availability</Label>
                    <Select
                      value={availabilityFilter}
                      onValueChange={setAvailabilityFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DSCard>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <ScrollArea className="w-full">
            <TabsList className="w-full justify-start flex-nowrap overflow-x-auto">
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                const count = serviceProviders.filter(
                  (p) => p.category === category.id
                ).length;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="gap-2">
                    <Icon size={16} style={{ color: category.color }} />
                    {category.name}
                    <Badge variant="secondary" className="ml-1">
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </ScrollArea>

          {/* Tab Content */}
          {serviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4 mt-6">
              {/* Subcategory Accordion */}
              <DSCard variant="elevated" padding="md">
                <h3
                  style={{
                    fontFamily: typography.fonts.subheading,
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.md,
                  }}
                >
                  📂 Browse by Category
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.subcategories.map((subcat, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger>{subcat.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {subcat.items.map((item) => (
                            <DSButton
                              key={item}
                              variant={activeSubcategory === item ? "primary" : "outline"}
                              size="sm"
                              onClick={() => setActiveSubcategory(activeSubcategory === item ? "" : item)}
                            >
                              {item}
                            </DSButton>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DSCard>

              {/* Results */}
              {filteredProviders.length === 0 ? (
                <DSCard variant="elevated" padding="lg">
                  <div className="text-center py-12">
                    <Info size={48} style={{ color: colors.text.muted, margin: "0 auto" }} />
                    <h3
                      style={{
                        fontFamily: typography.fonts.subheading,
                        fontSize: typography.sizes.lg,
                        color: colors.text.primary,
                        marginTop: spacing.md,
                      }}
                    >
                      No providers found
                    </h3>
                    <p
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.secondary,
                        marginTop: spacing.xs,
                      }}
                    >
                      Try adjusting your filters or search query
                    </p>
                    <DSButton
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setSearchQuery("");
                        setLocationFilter("");
                        setDistrictFilter("");
                        setPriceRange("");
                        setAvailabilityFilter("");
                        setActiveSubcategory("");
                        setProviderTypeFilter("");
                      }}
                      style={{ marginTop: spacing.lg }}
                    >
                      Clear All Filters
                    </DSButton>
                  </div>
                </DSCard>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredProviders.map((provider, index) => (
                    <motion.div
                      key={provider.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DSCard variant="elevated" padding="lg" hover>
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3
                                  style={{
                                    fontFamily: typography.fonts.subheading,
                                    fontSize: typography.sizes.base,
                                    fontWeight: typography.weights.semibold,
                                    color: colors.text.primary,
                                  }}
                                >
                                  {provider.name}
                                </h3>
                                {provider.verified && (
                                  <DSBadge variant="success" size="sm">
                                    <CheckCircle2 size={12} className="mr-1" />
                                    Verified
                                  </DSBadge>
                                )}
                                {provider.grokScore >= 90 && (
                                  <DSBadge variant="blue" size="sm">
                                    <Shield size={12} className="mr-1" />
                                    Trusted
                                  </DSBadge>
                                )}
                                <DSBadge
                                  variant={
                                    provider.providerType === "rental"
                                      ? "info"
                                      : provider.providerType === "seller"
                                      ? "success"
                                      : "warning"
                                  }
                                  size="sm"
                                >
                                  {provider.providerType === "rental" && "Rental"}
                                  {provider.providerType === "seller" && "Seller"}
                                  {provider.providerType === "service" && "Service"}
                                  {provider.providerType === "consultant" && "Consultant"}
                                </DSBadge>
                              </div>
                              <p
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                  marginTop: spacing.xs,
                                }}
                              >
                                {provider.subcategory} • {provider.location}
                              </p>
                            </div>

                            <DSBadge
                              variant={
                                provider.availability === "available"
                                  ? "success"
                                  : "warning"
                              }
                              size="sm"
                            >
                              {provider.availability === "available" && "Available"}
                              {provider.availability === "busy" && "Busy"}
                              {provider.availability === "booked" && "Booked"}
                            </DSBadge>
                          </div>

                          {/* Rating and Stats */}
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-1">
                              <Star
                                size={16}
                                fill={colors.accent.gold}
                                style={{ color: colors.accent.gold }}
                              />
                              <span
                                style={{
                                  fontSize: typography.sizes.sm,
                                  fontWeight: typography.weights.semibold,
                                  color: colors.text.primary,
                                }}
                              >
                                {provider.rating}
                              </span>
                              <span
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.muted,
                                }}
                              >
                                ({provider.reviews})
                              </span>
                            </div>

                            <Separator orientation="vertical" className="h-4" />

                            <div className="flex items-center gap-1">
                              <MapPin size={14} style={{ color: colors.text.muted }} />
                              <span
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                }}
                              >
                                {provider.distance} km
                              </span>
                            </div>

                            <Separator orientation="vertical" className="h-4" />

                            <div className="flex items-center gap-1">
                              <Award size={14} style={{ color: colors.text.muted }} />
                              <span
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                }}
                              >
                                {provider.experience} years
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p
                            style={{
                              fontSize: typography.sizes.sm,
                              color: colors.text.secondary,
                              lineHeight: 1.5,
                            }}
                          >
                            {provider.description}
                          </p>

                          {/* Services Tags */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {provider.services.slice(0, 4).map((service) => (
                              <Badge
                                key={service}
                                variant="outline"
                                style={{
                                  fontSize: typography.sizes.xs,
                                  backgroundColor: colors.surface.secondary,
                                }}
                              >
                                {service}
                              </Badge>
                            ))}
                            {provider.services.length > 4 && (
                              <Badge variant="outline">
                                +{provider.services.length - 4} more
                              </Badge>
                            )}
                          </div>

                          {/* Pricing and Actions */}
                          <div
                            className="flex items-center justify-between gap-4 flex-wrap pt-2 border-t"
                            style={{ borderColor: colors.border.light }}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <DollarSign size={16} style={{ color: colors.accent.gold }} />
                                <span
                                  style={{
                                    fontSize: typography.sizes.lg,
                                    fontWeight: typography.weights.bold,
                                    color: colors.text.primary,
                                  }}
                                >
                                  ₹{provider.pricing.amount.toLocaleString()}
                                </span>
                              </div>
                              <p
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.muted,
                                }}
                              >
                                {provider.pricing.unit}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <DSButton
                                variant="outline"
                                size="sm"
                                leftIcon={<Phone size={14} />}
                                onClick={() => {
                                  toast.info("Contact Info", {
                                    description: `Phone: ${provider.contact.phone}`,
                                  });
                                }}
                              >
                                Contact
                              </DSButton>
                              <DSButton
                                variant="primary"
                                size="sm"
                                leftIcon={<MessageSquare size={14} />}
                                onClick={() => handleRequestService(provider)}
                              >
                                Request
                              </DSButton>
                            </div>
                          </div>

                          {/* Trust Score */}
                          {provider.grokScore > 0 && (
                            <div
                              className="flex items-center gap-2 p-2 rounded"
                              style={{
                                backgroundColor: colors.surface.secondary,
                                border: `1px solid ${colors.border.light}`,
                              }}
                            >
                              <Bot size={14} style={{ color: colors.blue.primary }} />
                              <span
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                }}
                              >
                                Grok Trust Score: {provider.grokScore}/100
                              </span>
                              {provider.grokScore >= 90 && (
                                <DSBadge variant="success" size="sm">
                                  Highly Trusted
                                </DSBadge>
                              )}
                            </div>
                          )}
                        </div>
                      </DSCard>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Request Service Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Service from {selectedProvider?.name}</DialogTitle>
            <DialogDescription>
              Fill in the details below to send a service request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Service Type</Label>
                <Input value={serviceRequest.serviceType} disabled />
              </div>
              <div>
                <Label>Subcategory</Label>
                <Input value={serviceRequest.subcategory} disabled />
              </div>
            </div>

            <div>
              <Label>Service Description</Label>
              <Textarea
                placeholder="Describe what service you need..."
                value={serviceRequest.description}
                onChange={(e) =>
                  setServiceRequest({ ...serviceRequest, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div>
              <Label>Your Location</Label>
              <Input
                placeholder="Enter your farm location"
                value={serviceRequest.location}
                onChange={(e) =>
                  setServiceRequest({ ...serviceRequest, location: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={serviceRequest.startDate}
                  onChange={(e) =>
                    setServiceRequest({ ...serviceRequest, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>End Date (Optional)</Label>
                <Input
                  type="date"
                  value={serviceRequest.endDate || ""}
                  onChange={(e) =>
                    setServiceRequest({ ...serviceRequest, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            {selectedProvider?.providerType === "seller" && (
              <div>
                <Label>Quantity Needed</Label>
                <Input
                  placeholder="Enter quantity (kg, bags, units, etc.)"
                  value={serviceRequest.quantity || ""}
                  onChange={(e) =>
                    setServiceRequest({ ...serviceRequest, quantity: e.target.value })
                  }
                />
              </div>
            )}

            <div>
              <Label>Budget</Label>
              <Input
                type="number"
                placeholder="Enter your budget in ₹"
                value={serviceRequest.budget}
                onChange={(e) =>
                  setServiceRequest({ ...serviceRequest, budget: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Urgency</Label>
              <RadioGroup
                value={serviceRequest.urgency}
                onValueChange={(value: any) =>
                  setServiceRequest({ ...serviceRequest, urgency: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low - Can wait 1-2 weeks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium - Need within 1 week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High - Urgent (1-3 days)</Label>
                </div>
              </RadioGroup>
            </div>

            <div
              className="p-3 rounded-lg"
              style={{
                backgroundColor: colors.surface.secondary,
                border: `1px solid ${colors.border.default}`,
              }}
            >
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                <strong>Provider Response Time:</strong> {selectedProvider?.responseTime}
              </p>
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                  marginTop: spacing.xs,
                }}
              >
                <strong>Estimated Cost:</strong> ₹
                {selectedProvider?.pricing.amount.toLocaleString()}{" "}
                {selectedProvider?.pricing.unit}
              </p>
            </div>
          </div>

          <DialogFooter>
            <DSButton
              variant="outline"
              onClick={() => setShowRequestDialog(false)}
            >
              Cancel
            </DSButton>
            <DSButton
              variant="primary"
              onClick={handleSubmitRequest}
              leftIcon={<MessageSquare size={16} />}
            >
              Send Request
            </DSButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Provider Dialog */}
      <Dialog open={showAddProviderDialog} onOpenChange={setShowAddProviderDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Service Provider / Seller</DialogTitle>
            <DialogDescription>
              Submit a new provider for review and approval
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Provider Name</Label>
              <Input placeholder="Enter business or individual name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Service Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Provider Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rental">Rental Service</SelectItem>
                    <SelectItem value="seller">Material Seller</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <Input placeholder="Village, District, State" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact Phone</Label>
                <Input placeholder="+91 98765 43210" type="tel" />
              </div>
              <div>
                <Label>Email (Optional)</Label>
                <Input placeholder="email@example.com" type="email" />
              </div>
            </div>

            <div>
              <Label>Services / Products Offered</Label>
              <Textarea
                placeholder="List the services or products (one per line)"
                rows={3}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Brief description of services and experience"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Experience (Years)</Label>
                <Input type="number" placeholder="10" />
              </div>
              <div>
                <Label>Pricing</Label>
                <Input placeholder="₹1200 per hour" />
              </div>
            </div>

            <div
              className="p-3 rounded-lg"
              style={{
                backgroundColor: colors.status.info + "20",
                border: `1px solid ${colors.status.info}`,
              }}
            >
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                ℹ️ All provider submissions are verified by our team before being listed.
                This typically takes 2-3 business days.
              </p>
            </div>
          </div>

          <DialogFooter>
            <DSButton
              variant="outline"
              onClick={() => setShowAddProviderDialog(false)}
            >
              Cancel
            </DSButton>
            <DSButton
              variant="primary"
              onClick={handleAddProvider}
              leftIcon={<Plus size={16} />}
            >
              Submit for Review
            </DSButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
