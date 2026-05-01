import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, MapPin, Phone, Instagram } from "lucide-react";

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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/95 py-4 shadow-lg backdrop-blur-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-serif text-[#C9A84C] tracking-widest cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            STYLISM
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm tracking-widest uppercase text-white/90">
            <button onClick={() => scrollTo('collections')} className="hover:text-[#C9A84C] transition-colors">Collections</button>
            <button onClick={() => scrollTo('mens')} className="hover:text-[#C9A84C] transition-colors">Men's Clothing</button>
            <button onClick={() => scrollTo('accessories')} className="hover:text-[#C9A84C] transition-colors">Accessories</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#C9A84C] transition-colors">Contact</button>
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
            { img: anarkali, title: "Crimson Anarkali" },
            { img: sambalpuri, title: "Indigo Sambalpuri Ikat" },
            { img: goldTissue, title: "Golden Tissue Saree" },
            { img: heroBg, title: "Resort Collection" } // Reused as requested
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
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
            { img: linenSuit, title: "Linen Architecture" },
            { img: wranglerJeans, title: "Wrangler Desert" },
            { img: ariatDenim, title: "Ariat Denim" },
            { img: heroBg, title: "Coastal Linens" } 
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
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
    </div>
  );
}