import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, MapPin, Phone, Instagram, ShieldCheck } from "lucide-react";

interface GuideItem {
  title: string;
  category: string;
  image?: string;
  fabric: string;
  sizes: { label: string; measurement: string }[];
  sizeLabel: string;
  care: string[];
  note?: string;
  whatsappText: string;
}

// Import images
import heroBg from "@assets/GIFT3f8WUAA5yd8_1777654380164.jpg";
import anarkali from "@assets/e5fd97f34b76a937620e35fdec8ee93b_1777654380096.jpg";
import sambalpuri from "@assets/gemini-2.5-flash-image-preview_(nano-banana)_a_Make_it_4k_or_1_1777654380149.png";
import goldTissue from "@assets/9f68b516ac1d61c639fd548db330782e_1777654380239.jpg";
import perfume from "@assets/gemini-2.5-flash-image-preview_(nano-banana)_a_A_realistic_pro_1777654380134.png";
import linenSuit from "@assets/573cae664f4dac7fe3f8fb5c856d971c_1777654380120.jpg";
import wranglerJeans from "@assets/Wrangler_FW20_TEXAS_campaign-contentpage_CAMPAIGN_Texas_1777654380178.jpg";
import ariatDenim from "@assets/eeefac5004f774496434593bdb8e28d6_1777654380224.jpg";
import clothingRack from "@assets/pexels-fotios-photos-37002320_1777654380193.jpg";
import beachPicnic from "@assets/pexels-leeloothefirst-8908603_1777654380209.jpg";

const GUIDE_DATA: Record<string, GuideItem> = {
  "crimson-anarkali": {
    title: "Crimson Anarkali", category: "Women's Ethnic",
    fabric: "Pure Georgette with Zari Embroidery",
    sizeLabel: "Bust Measurement",
    sizes: [{ label: "XS", measurement: "32\"" }, { label: "S", measurement: "34\"" }, { label: "M", measurement: "36\"" }, { label: "L", measurement: "38\"" }, { label: "XL", measurement: "40\"" }, { label: "XXL", measurement: "42\"" }],
    care: ["Dry clean recommended", "Hand wash cold with mild detergent", "Do not wring or tumble dry", "Lay flat to dry in shade", "Iron reverse side at medium heat"],
    note: "Custom sizing & stitching available in-store.",
    whatsappText: "Hello Stylism! I am interested in the Crimson Anarkali from your Women's Ethnic Collection.",
  },
  "indigo-sambalpuri": {
    title: "Indigo Sambalpuri Ikat", category: "Women's Ethnic",
    fabric: "Handloom Cotton Ikat — Hand-woven in Odisha",
    sizeLabel: "Bust Measurement",
    sizes: [{ label: "S", measurement: "34\"" }, { label: "M", measurement: "36\"" }, { label: "L", measurement: "38\"" }, { label: "XL", measurement: "40\"" }, { label: "Custom", measurement: "On Request" }],
    care: ["Hand wash separately in cold water", "Colours may bleed on first wash — wash alone", "Use mild detergent, no bleach", "Air dry in shade", "Iron reverse at low heat"],
    note: "Each piece is hand-woven — slight variations are a mark of authenticity.",
    whatsappText: "Hello Stylism! I am interested in the Indigo Sambalpuri Ikat set.",
  },
  "golden-tissue": {
    title: "Golden Tissue Saree", category: "Women's Ethnic",
    fabric: "Pure Tissue Silk with Zari Border",
    sizeLabel: "Standard",
    sizes: [{ label: "Saree Length", measurement: "5.5 metres" }, { label: "Blouse Piece", measurement: "0.8 metres" }],
    care: ["Dry clean only", "Store in muslin cloth, not plastic", "Avoid direct sunlight and moisture", "Do not iron directly — use a cloth barrier", "Re-fold every 3 months to prevent crease lines"],
    note: "Blouse stitching available at the store on request.",
    whatsappText: "Hello Stylism! I am interested in the Golden Tissue Saree.",
  },
  "resort-collection": {
    title: "Resort Collection", category: "Women's Ethnic",
    fabric: "Lightweight Linen-Cotton Blend",
    sizeLabel: "Bust Measurement",
    sizes: [{ label: "S", measurement: "34\"" }, { label: "M", measurement: "36\"" }, { label: "L", measurement: "38\"" }, { label: "XL", measurement: "40\"" }, { label: "XXL", measurement: "42\"" }],
    care: ["Machine wash cold — gentle cycle", "Tumble dry low or air dry", "Iron on medium heat", "Do not bleach"],
    note: "Available in multiple colourways. Ask in-store.",
    whatsappText: "Hello Stylism! I am interested in pieces from the Resort Collection.",
  },
  "linen-architecture": {
    title: "Linen Architecture", category: "Men's Clothing",
    fabric: "100% European Linen — Breathable & Structured",
    sizeLabel: "Chest Measurement",
    sizes: [{ label: "S", measurement: "36–38\"" }, { label: "M", measurement: "38–40\"" }, { label: "L", measurement: "40–42\"" }, { label: "XL", measurement: "42–44\"" }, { label: "XXL", measurement: "44–46\"" }],
    care: ["Hand wash or machine wash cold — gentle cycle", "Air dry — do not tumble dry", "Iron while slightly damp for crisp finish", "Natural linen creasing is part of the character"],
    note: "Tailoring and alterations available in-store.",
    whatsappText: "Hello Stylism! I am interested in the Linen Architecture suit from Men's Clothing.",
  },
  "wrangler-desert": {
    title: "Wrangler Desert", category: "Men's Clothing",
    fabric: "Premium Heavyweight Denim — 100% Cotton",
    sizeLabel: "Waist Measurement",
    sizes: [{ label: "28", measurement: "Waist 28\"" }, { label: "30", measurement: "Waist 30\"" }, { label: "32", measurement: "Waist 32\"" }, { label: "34", measurement: "Waist 34\"" }, { label: "36", measurement: "Waist 36\"" }, { label: "38", measurement: "Waist 38\"" }],
    care: ["Machine wash cold inside out", "Tumble dry low to preserve shape", "Iron inside out to avoid fading", "Less frequent washing extends colour life"],
    note: "Available in regular and slim fits. Try in-store.",
    whatsappText: "Hello Stylism! I am interested in the Wrangler Desert jeans.",
  },
  "ariat-denim": {
    title: "Ariat Denim", category: "Men's Clothing",
    fabric: "Premium Stretch Denim — Cotton-Elastane Blend",
    sizeLabel: "Waist Measurement",
    sizes: [{ label: "28", measurement: "Waist 28\"" }, { label: "30", measurement: "Waist 30\"" }, { label: "32", measurement: "Waist 32\"" }, { label: "34", measurement: "Waist 34\"" }, { label: "36", measurement: "Waist 36\"" }, { label: "38", measurement: "Waist 38\"" }, { label: "40", measurement: "Waist 40\"" }],
    care: ["Machine wash cold inside out", "Tumble dry low", "Do not bleach", "Stretch denim retains shape with proper care"],
    note: "Fits true to size with comfortable movement.",
    whatsappText: "Hello Stylism! I am interested in the Ariat Denim from Men's Clothing.",
  },
  "coastal-linens": {
    title: "Coastal Linens", category: "Men's Clothing",
    fabric: "Cotton-Linen Blend — Lightweight & Breathable",
    sizeLabel: "Chest Measurement",
    sizes: [{ label: "S", measurement: "36–38\"" }, { label: "M", measurement: "38–40\"" }, { label: "L", measurement: "40–42\"" }, { label: "XL", measurement: "42–44\"" }],
    care: ["Machine wash cold — gentle cycle", "Air dry or tumble dry low", "Light iron on medium heat", "Do not bleach"],
    note: "Perfect for Bhubaneswar's climate. Ask about colour options.",
    whatsappText: "Hello Stylism! I am interested in the Coastal Linens collection.",
  },
  "stylism-signature": {
    title: "STYLISM Signature", category: "Men's Accessories",
    fabric: "Eau de Parfum — 100ml",
    sizeLabel: "Fragrance Profile",
    sizes: [{ label: "Top Notes", measurement: "Bergamot & Sea Salt" }, { label: "Heart Notes", measurement: "Amber & Sandalwood" }, { label: "Base Notes", measurement: "Musk & Cedarwood" }],
    care: ["Store away from direct sunlight and heat", "Keep cap on when not in use", "Spray on pulse points — wrists, neck, chest", "Do not rub wrists together after applying", "Shelf life: 3 years from manufacture date"],
    note: "Available exclusively at Stylism, Khandagiri. Limited stock.",
    whatsappText: "Hello Stylism! I am interested in the STYLISM Signature Perfume.",
  },
  "atelier-collection": {
    title: "The Atelier Collection", category: "Men's Accessories",
    fabric: "Curated Multi-Fabric Wardrobe Essentials",
    sizeLabel: "Size",
    sizes: [{ label: "S / M", measurement: "Adjustable" }, { label: "L / XL", measurement: "Adjustable" }, { label: "One Size", measurement: "Fits Most" }],
    care: ["Care varies by individual item", "Check garment label before washing", "Store in a cool, dry place", "Use padded hangers for structured pieces"],
    note: "Visit the atelier for a full browse of our curated accessories.",
    whatsappText: "Hello Stylism! I am interested in the Atelier Collection accessories.",
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", note: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeAppointment = () => {
    setAppointmentOpen(false);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", phone: "", date: "", note: "" }); }, 500);
  };

  const [guideOpen, setGuideOpen] = useState(false);
  const [activeGuide, setActiveGuide] = useState<GuideItem | null>(null);

  const openGuide = (id: string) => {
    const guide = GUIDE_DATA[id];
    if (guide) { setActiveGuide(guide); setGuideOpen(true); }
  };
  const closeGuide = () => { setGuideOpen(false); setTimeout(() => setActiveGuide(null), 400); };

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Preloader timeout
    const timer = setTimeout(() => setLoading(false), 2500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen selection:bg-primary selection:text-white">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={beachPicnic} 
                alt="Loading" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-center"
            >
              <h1 className="text-4xl md:text-6xl font-serif text-[#C9A84C] tracking-widest">STYLISM</h1>
              <motion.div 
                className="h-[1px] bg-[#C9A84C] mt-6 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Arrivals Marquee Ticker */}
      <div className="fixed top-0 left-0 w-full z-50 h-8 bg-[#C9A84C] overflow-hidden flex items-center" data-testid="banner-marquee">
        <div className="animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center">
              {[
                "NEW ARRIVALS: Sambalpuri Handloom Collection",
                "Stylism Signature Perfume — Now Available",
                "Premium Menswear: Denims, Shirts & Jackets",
                "Women's Ethnic — Ikat Sarees & Kurta Sets",
                "Visit Us: Khandagiri Bari, Bhubaneswar",
                "No Online Delivery — Contact for Personalized Shopping",
                "Follow Us on Instagram: @.stylism.",
              ].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span className="text-black text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap px-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {item}
                  </span>
                  <span className="text-black/50 text-xs select-none">&#9670;</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 top-8 transition-all duration-500 ${scrolled ? 'bg-black/95 py-4 shadow-lg backdrop-blur-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-serif text-[#C9A84C] tracking-widest cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            STYLISM
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase text-white/90">
            <button onClick={() => scrollTo('collections')} className="hover:text-[#C9A84C] transition-colors">Collections</button>
            <button onClick={() => scrollTo('mens')} className="hover:text-[#C9A84C] transition-colors">Men's Clothing</button>
            <button onClick={() => scrollTo('accessories')} className="hover:text-[#C9A84C] transition-colors">Accessories</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#C9A84C] transition-colors">Contact</button>
          </div>

          <div className="hidden md:flex items-center">
            <button
              data-testid="button-book-appointment"
              onClick={() => setAppointmentOpen(true)}
              className="border border-[#C9A84C] text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase px-5 py-2 hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Book Appointment
            </button>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col space-y-4"
            >
              <button onClick={() => scrollTo('collections')} className="text-left text-white uppercase tracking-widest text-sm py-2">Collections</button>
              <button onClick={() => scrollTo('mens')} className="text-left text-white uppercase tracking-widest text-sm py-2">Men's Clothing</button>
              <button onClick={() => scrollTo('accessories')} className="text-left text-white uppercase tracking-widest text-sm py-2">Accessories</button>
              <button onClick={() => scrollTo('contact')} className="text-left text-white uppercase tracking-widest text-sm py-2">Contact</button>
              <button
                data-testid="button-book-appointment-mobile"
                onClick={() => { setMobileMenuOpen(false); setAppointmentOpen(true); }}
                className="text-left text-[#C9A84C] uppercase tracking-widest text-sm py-2 border-t border-white/10 pt-4"
              >
                Book Appointment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={heroBg} alt="Stylism Hero" className="w-full h-full object-cover" />
        </motion.div>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.5 }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif text-[#C9A84C] mb-6 tracking-wider drop-shadow-lg"
          >
            STYLISM
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-lg md:text-2xl text-white/90 font-light tracking-[0.2em] max-w-2xl"
          >
            Switch on your style statement
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-white/60 text-xs tracking-widest uppercase mb-4">Discover</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-[#C9A84C]/60"
            />
          </motion.div>
        </div>
      </section>

      {/* Collections Intro */}
      <section className="py-32 px-6 md:px-12 bg-background text-center flex flex-col items-center justify-center" id="collections">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-8">The Stylism Edit</h2>
          <div className="w-12 h-[1px] bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
            Bespoke fashion meets the soul of Odisha craftsmanship. 
            Every piece curated for the discerning eye. Unhurried, tactile, and quietly confident.
          </p>
        </motion.div>
      </section>

      {/* Women's Ethnic */}
      <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between border-b border-border pb-6"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground">Women's Ethnic</h2>
          <span className="text-primary tracking-widest uppercase text-sm font-semibold hidden md:block">Curated Collection</span>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { img: anarkali, title: "Crimson Anarkali", id: "crimson-anarkali" },
            { img: sambalpuri, title: "Indigo Sambalpuri Ikat", id: "indigo-sambalpuri" },
            { img: goldTissue, title: "Golden Tissue Saree", id: "golden-tissue" },
            { img: heroBg, title: "Resort Collection", id: "resort-collection" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
              onClick={() => openGuide(item.id)}
              data-testid={`card-product-${item.id}`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="text-white font-serif text-2xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <div className="overflow-hidden">
                  <span className="text-[#C9A84C] uppercase tracking-widest text-xs inline-block translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 border-b border-[#C9A84C] pb-1">Discover</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Men's Clothing */}
      <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto bg-gray-50/50" id="mens">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between border-b border-border pb-6"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground">Men's Clothing</h2>
          <span className="text-primary tracking-widest uppercase text-sm font-semibold hidden md:block">The Modern Gentleman</span>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {[
            { img: linenSuit, title: "Linen Architecture", id: "linen-architecture" },
            { img: wranglerJeans, title: "Wrangler Desert", id: "wrangler-desert" },
            { img: ariatDenim, title: "Ariat Denim", id: "ariat-denim" },
            { img: heroBg, title: "Coastal Linens", id: "coastal-linens" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
              onClick={() => openGuide(item.id)}
              data-testid={`card-product-${item.id}`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="text-white font-serif text-2xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <div className="overflow-hidden">
                  <span className="text-[#C9A84C] uppercase tracking-widest text-xs inline-block translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 border-b border-[#C9A84C] pb-1">Discover</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden"
        >
          <img src={linenSuit} alt="Premium Menswear" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
            <h3 className="text-white font-serif text-3xl md:text-5xl max-w-3xl leading-tight">
              Premium menswear. <br/>
              <span className="text-[#C9A84C] italic">Curated for the modern man.</span>
            </h3>
          </div>
        </motion.div>
      </section>

      {/* Men's Accessories */}
      <section className="py-32 px-4 md:px-8 max-w-[1600px] mx-auto" id="accessories">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Accessories</h2>
          <div className="w-12 h-[1px] bg-primary mx-auto" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[70vh] bg-[#1a1a1a] flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={() => openGuide("stylism-signature")}
            data-testid="card-product-stylism-signature"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent z-10 pointer-events-none" />
            <img src={perfume} alt="Stylism Signature Perfume" className="w-3/4 h-3/4 object-contain z-0 transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-12 left-12 z-20">
              <h3 className="text-4xl font-serif text-white mb-2">STYLISM <span className="text-[#C9A84C]">Signature</span></h3>
              <p className="text-white/60 tracking-widest uppercase text-sm">Eau de Parfum</p>
            </div>
          </motion.div>

          <div className="grid grid-rows-2 gap-8 h-[70vh]">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => openGuide("atelier-collection")}
              data-testid="card-product-atelier-collection"
            >
              <img src={clothingRack} alt="Curated Pieces" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-serif text-white tracking-wider">The Atelier Collection</h3>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-[#2a2a2a] relative overflow-hidden group cursor-pointer flex items-center justify-center"
              >
                <div className="text-center">
                  <h4 className="text-white font-serif text-xl mb-2">Leather Goods</h4>
                  <span className="text-[#C9A84C] text-xs uppercase tracking-widest">Coming Soon</span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-[#E8E6E1] relative overflow-hidden group cursor-pointer flex items-center justify-center"
              >
                <div className="text-center">
                  <h4 className="text-[#333] font-serif text-xl mb-2">Timepieces</h4>
                  <span className="text-primary text-xs uppercase tracking-widest">Discover In-Store</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white border-y border-border">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
              Rooted in Odisha, <br />
              <span className="text-primary italic">Defined by Style</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Stylism brings the finest handloom textiles and curated luxury fashion to Khandagiri, Bhubaneswar. We believe that true luxury lies in the details — the touch of the fabric, the precision of the cut, the elegance of the experience.
            </p>
            <div className="w-16 h-[1px] bg-primary" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden"
          >
            <img src={beachPicnic} alt="Stylism Lifestyle" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#0d0d0d] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>What Our Clients Say</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Voices of Stylism</h2>
            <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "I walked in looking for a saree for my daughter's wedding and left with the most exquisite Sambalpuri silk I have ever seen. The attention to every detail is unmatched.",
                name: "Priya Mohanty",
                location: "Bhubaneswar",
                item: "Women's Ethnic Collection",
              },
              {
                quote: "The linen suit I picked up here got me more compliments at my cousin's reception than anything I have ever worn. The quality speaks for itself the moment you touch the fabric.",
                name: "Arjun Pattnaik",
                location: "Cuttack",
                item: "Men's Clothing",
              },
              {
                quote: "Stylism Signature perfume is now my signature. Picked it up on a whim and I have never received so many questions about what I am wearing. Absolutely distinctive.",
                name: "Kavya Nanda",
                location: "Bhubaneswar",
                item: "Men's Accessories",
              },
              {
                quote: "The ikat kurta set I bought for Puja is still the piece I reach for every festive occasion. It feels like wearing Odisha's heritage — but elevated for modern life.",
                name: "Smita Das",
                location: "Khordha",
                item: "Women's Ethnic Collection",
              },
              {
                quote: "I booked an appointment and the personal styling session was incredible. They understood exactly what I needed without me having to explain myself twice. Rare these days.",
                name: "Rahul Sahoo",
                location: "Bhubaneswar",
                item: "Personal Styling",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-testid={`card-testimonial-${i}`}
                className={`border border-white/10 p-8 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-colors duration-500 group ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} viewBox="0 0 16 16" className="w-3 h-3 fill-[#C9A84C]">
                      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-white/60 text-sm leading-relaxed italic flex-1 group-hover:text-white/80 transition-colors duration-500"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-[#C9A84C]/40 my-6 group-hover:bg-[#C9A84C] transition-colors duration-500" />

                {/* Author */}
                <div>
                  <p className="text-white text-sm font-semibold tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>{t.name}</p>
                  <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mt-1" style={{ fontFamily: "Montserrat, sans-serif" }}>{t.location} &nbsp;·&nbsp; {t.item}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16"
          >
            <button
              data-testid="button-book-appointment-testimonials"
              onClick={() => setAppointmentOpen(true)}
              className="border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Begin Your Own Stylism Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section className="bg-[#111111] text-white pt-24" id="contact">
        <div className="container mx-auto px-6 md:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-12 text-[#C9A84C]">Experience Stylism</h2>
              
              <div className="space-y-8 text-white/80 font-light">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#C9A84C] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-serif text-xl mb-2">Our Atelier</h4>
                    <p>Khandagiri Bari, Khandagiri<br/>Bhubaneswar, Odisha 751030</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-[#C9A84C] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-serif text-xl mb-2">Contact</h4>
                    <p>+91 82607 32455</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Instagram className="text-[#C9A84C] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-serif text-xl mb-2">Social</h4>
                    <a href="https://www.instagram.com/.stylism.?igsh=dXloeTBvdTZpcHls" target="_blank" rel="noreferrer" className="hover:text-[#C9A84C] transition-colors">@.stylism.</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 border border-[#C9A84C]/30 bg-black/50">
                <h4 className="text-[#C9A84C] uppercase tracking-widest text-sm mb-2 font-semibold">Important Notice</h4>
                <p className="text-white/70">No online delivery — please contact us directly for personalized shopping and delivery arrangements.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[400px] lg:h-full min-h-[400px] grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 border border-white/10"
            >
              <iframe 
                src="https://www.google.com/maps?q=Khandagiri+Bari,+Khandagiri,+Bhubaneswar,+Odisha+751030&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
        
        <div className="border-t border-white/10 py-8 text-center bg-black">
          <p className="text-white/40 text-sm tracking-widest">&copy; 2025 STYLISM. ALL RIGHTS RESERVED.</p>
        </div>
      </section>

      {/* Book an Appointment Modal */}
      <AnimatePresence>
        {appointmentOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="modal-appointment"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeAppointment}
            />

            {/* Panel */}
            <motion.div
              className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-[#C9A84C]/30 p-10"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Close */}
              <button
                data-testid="button-close-modal"
                onClick={closeAppointment}
                className="absolute top-5 right-5 text-white/40 hover:text-[#C9A84C] transition-colors"
              >
                <X size={20} />
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <p className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>Personal Styling</p>
                    <h2 className="text-3xl font-serif text-white tracking-wide">Book an Appointment</h2>
                    <p className="text-white/40 text-xs mt-3 leading-relaxed tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Reserve a private styling session at our Khandagiri store. We will confirm via WhatsApp.
                    </p>
                  </div>

                  <form onSubmit={handleAppointmentSubmit} className="space-y-5" data-testid="form-appointment">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] text-white/50 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Full Name</label>
                      <input
                        data-testid="input-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        className="w-full bg-transparent border border-white/20 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors placeholder:text-white/20"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] text-white/50 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>WhatsApp Number</label>
                      <input
                        data-testid="input-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-transparent border border-white/20 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors placeholder:text-white/20"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-[10px] text-white/50 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Preferred Visit Date</label>
                      <input
                        data-testid="input-date"
                        name="date"
                        type="date"
                        required
                        value={form.date}
                        onChange={handleFormChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-transparent border border-white/20 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors [color-scheme:dark]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      />
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-[10px] text-white/50 tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>Note (Optional)</label>
                      <textarea
                        data-testid="input-note"
                        name="note"
                        rows={3}
                        value={form.note}
                        onChange={handleFormChange}
                        placeholder="What are you looking for? Ethnic wear, menswear, accessories..."
                        className="w-full bg-transparent border border-white/20 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors resize-none placeholder:text-white/20"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      />
                    </div>

                    <button
                      data-testid="button-submit-appointment"
                      type="submit"
                      className="w-full bg-[#C9A84C] text-black text-[10px] tracking-[0.25em] uppercase py-4 hover:bg-[#b8973f] transition-colors duration-300 font-semibold mt-2"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      Request Appointment
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  data-testid="appointment-success"
                >
                  <div className="w-14 h-14 border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#C9A84C] fill-none" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-serif text-white mb-3">Appointment Requested</h2>
                  <p className="text-white/40 text-xs leading-relaxed tracking-wide mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Thank you, <span className="text-[#C9A84C]">{form.name}</span>.
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed tracking-wide mb-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Our team will confirm your appointment on <span className="text-white/70">{form.phone}</span> via WhatsApp within 24 hours.
                  </p>
                  <button
                    data-testid="button-close-success"
                    onClick={closeAppointment}
                    className="border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size & Care Guide Drawer */}
      <AnimatePresence>
        {guideOpen && activeGuide && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-stretch justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeGuide}
            />

            {/* Panel */}
            <motion.div
              className="relative z-10 w-full max-w-md bg-[#0f0f0f] h-full overflow-y-auto flex flex-col shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/10">
                <div>
                  <span
                    className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase mb-1 block"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {activeGuide.category}
                  </span>
                  <h2
                    className="text-white font-serif text-xl leading-snug"
                  >
                    {activeGuide.title}
                  </h2>
                </div>
                <button
                  onClick={closeGuide}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors duration-200"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Fabric */}
              <div className="px-8 pt-7 pb-5 border-b border-white/10">
                <p
                  className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Fabric & Material
                </p>
                <p
                  className="text-white/80 text-sm leading-relaxed"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {activeGuide.fabric}
                </p>
              </div>

              {/* Size / Profile Guide */}
              <div className="px-8 pt-7 pb-5 border-b border-white/10">
                <p
                  className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {activeGuide.sizeLabel}
                </p>
                <div className="rounded overflow-hidden border border-white/10">
                  {activeGuide.sizes.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"}`}
                    >
                      <span
                        className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="text-white/70 text-xs"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {row.measurement}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  className="text-white/30 text-[10px] mt-3 italic"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Sizes may vary slightly. Try in-store for the perfect fit.
                </p>
              </div>

              {/* Care Instructions */}
              <div className="px-8 pt-7 pb-5 border-b border-white/10">
                <p
                  className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Care Instructions
                </p>
                <ul className="space-y-3">
                  {activeGuide.care.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/70 text-xs leading-relaxed"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      <div className="w-[1px] h-3 bg-[#C9A84C]/60 mt-[3px] shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note */}
              {activeGuide.note && (
                <div className="px-8 pt-6 pb-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={14} className="text-[#C9A84C] mt-[2px] shrink-0" />
                    <p
                      className="text-white/50 text-xs italic leading-relaxed"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {activeGuide.note}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto px-8 py-8 border-t border-white/10">
                <p
                  className="text-white/30 text-[10px] tracking-wider uppercase mb-4 text-center"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Interested in this piece?
                </p>
                <a
                  href={`https://wa.me/918260732455?text=${encodeURIComponent(activeGuide.whatsappText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#C9A84C] text-black text-[10px] tracking-[0.25em] uppercase py-4 hover:bg-[#b8973f] transition-colors duration-300 font-semibold"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.531 5.842L.057 23.944l6.265-1.642A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.854 0-3.597-.497-5.103-1.364l-.366-.214-3.719.974.994-3.621-.232-.375A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Contact on WhatsApp
                </a>
                <button
                  onClick={() => { closeGuide(); setAppointmentOpen(true); }}
                  className="w-full mt-3 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase py-3 hover:bg-[#C9A84C]/10 transition-colors duration-300"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Book a Styling Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/918260732455?text=Hello%20Stylism%2C%20I%20am%20interested%20in%20your%20collection!"
        target="_blank"
        rel="noreferrer"
        data-testid="button-whatsapp-chat"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 group"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Tooltip label */}
        <motion.span
          className="bg-black/90 text-white text-xs tracking-widest uppercase px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#C9A84C]/40"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Chat on WhatsApp
        </motion.span>

        {/* Pulsing ring */}
        <span className="relative flex h-16 w-16 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20" />
          <span className="relative flex h-16 w-16 rounded-full bg-[#25D366] items-center justify-center shadow-2xl shadow-[#25D366]/40">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.75.72 5.43 2.09 7.8L.5 31.5l7.88-2.06A15.43 15.43 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.2a13.6 13.6 0 01-6.93-1.9l-.5-.3-5.17 1.36 1.38-5.04-.33-.52A13.6 13.6 0 1116 28.7zm7.47-10.18c-.41-.2-2.43-1.2-2.81-1.34-.38-.14-.65-.2-.92.21-.27.41-1.05 1.34-1.29 1.61-.24.27-.47.3-.88.1a11.16 11.16 0 01-3.29-2.03 12.32 12.32 0 01-2.28-2.83c-.24-.41 0-.63.18-.84.17-.18.38-.47.57-.71.19-.24.25-.41.38-.68.13-.27.06-.51-.03-.71-.1-.2-.92-2.22-1.26-3.04-.33-.8-.67-.69-.92-.7h-.79c-.27 0-.71.1-1.08.51-.37.41-1.42 1.39-1.42 3.39s1.45 3.93 1.65 4.2c.2.27 2.86 4.37 6.93 6.12.97.42 1.72.67 2.31.86.97.31 1.85.27 2.55.16.78-.12 2.43-.99 2.77-1.95.34-.96.34-1.78.24-1.95-.1-.17-.37-.27-.78-.47z" />
            </svg>
          </span>
        </span>
      </motion.a>
    </div>
  );
}