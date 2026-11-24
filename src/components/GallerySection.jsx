import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Camera, ExternalLink, X, ChevronLeft, ChevronRight, Sparkles, Maximize2, ArrowRight, Images, Loader2 } from 'lucide-react';
import records from '../data/records.json';

const MAX_GRID_CARDS = 11;
const FEATURED_ALL_IDS = [
  'def_4',
  'ind_1',
  'ral_1',
  'ral_5',
  'awd_1',
  'awd_4',
  'cor_1',
  'cos_1',
  'cul_1',
  'gar_1',
  'hik_1'
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const activeThumbRef = useRef(null);

  // Original magazine printed event photos
  const printedEventPhotos = records.event_photos.map((e) => ({
    id: e.id,
    src: `/${e.image}`,
    title: e.caption_as_printed,
    meta: e.date_or_location_as_printed || 'Magazine Event Archive',
    category: 'Magazine Highlights'
  }));

  // Newly sorted Class of 2025 photo archive across all 10 categories
  const sortedArchivePhotos = [
    // Internal Defence
    {
      id: 'def_1',
      src: '/images/archive/defence_01.jpg',
      title: 'Final-Year Project Internal Defence & Hardware Assessment',
      meta: 'Internal Defence • EEE Laboratory',
      category: 'Internal Defence'
    },
    {
      id: 'def_2',
      src: '/images/archive/defence_02.jpg',
      title: 'Microcontroller Keypad & Embedded Prototype Demonstration',
      meta: 'Internal Defence • Hardware Exhibition',
      category: 'Internal Defence'
    },
    {
      id: 'def_3',
      src: '/images/archive/defence_03.jpg',
      title: 'Departmental Examiners Evaluating Final-Year Prototypes',
      meta: 'Internal Defence • ATBU EEE',
      category: 'Internal Defence'
    },
    {
      id: 'def_4',
      src: '/images/archive/defence_04.jpg',
      title: 'Circuit Testing & Live System Demonstration',
      meta: 'Internal Defence • Class of 2025',
      category: 'Internal Defence'
    },

    // Induction Ceremony
    {
      id: 'ind_1',
      src: '/images/archive/induction_01.jpg',
      title: '43rd EEE Balewite Engineering Induction & Oath-Taking Ceremony',
      meta: 'Sir Ahmadu Bello Int’l Conference Centre, Bauchi',
      category: 'Induction & Sign-Out'
    },
    {
      id: 'ind_2',
      src: '/images/archive/induction_02.jpg',
      title: 'Graduating Engineers Taking the Professional Induction Oath',
      meta: 'Induction Ceremony • Class of 2025',
      category: 'Induction & Sign-Out'
    },
    {
      id: 'ind_3',
      src: '/images/archive/induction_03.jpg',
      title: 'Inducted Balewite Engineers in Suits & Hard Hats',
      meta: 'Induction Day • ATBU Bauchi',
      category: 'Induction & Sign-Out'
    },
    {
      id: 'ind_4',
      src: '/images/archive/induction_04.jpg',
      title: 'Convocation Gown, Custom Sash & Engineering Hard Hat Portrait',
      meta: 'Induction Ceremony • Class of 2025',
      category: 'Induction & Sign-Out'
    },
    {
      id: 'ind_5',
      src: '/images/archive/induction_05.jpg',
      title: 'Coursemates Celebrating After the Induction Ceremony',
      meta: 'Induction Ceremony • Bauchi',
      category: 'Induction & Sign-Out'
    },

    // Sign-Out & Mega Rally
    {
      id: 'ral_1',
      src: '/images/archive/rally_01.jpg',
      title: 'Grand Aerial View of the 43rd Balewite Mega Rally Procession',
      meta: 'Mega Rally • ATBU Campus',
      category: 'Mega Rally'
    },
    {
      id: 'ral_2',
      src: '/images/archive/rally_02.jpg',
      title: 'Coursemates in 43rd Dynamo Varsity Jackets During Sign-Out',
      meta: 'Sign-Out & Mega Rally • Class of 2025',
      category: 'Mega Rally'
    },
    {
      id: 'ral_3',
      src: '/images/archive/rally_03.jpg',
      title: 'Signed White Shirts & 43rd Edition Varsity Jackets',
      meta: 'Sign-Out Celebration • ATBU',
      category: 'Mega Rally'
    },
    {
      id: 'ral_4',
      src: '/images/archive/rally_04.jpg',
      title: 'Reflective Safety Vests, Hard Hats & Signed Shirts',
      meta: 'Sign-Out Day • Class of 2025',
      category: 'Induction & Sign-Out'
    },
    {
      id: 'ral_5',
      src: '/images/archive/rally_05.jpg',
      title: 'Sign-Out Salute at Prof. A. O. Adekola Lecture Theatre',
      meta: 'Yelwa Campus • ATBU Bauchi',
      category: 'Induction & Sign-Out'
    },

    // SUG & Dinner Award Night
    {
      id: 'awd_1',
      src: '/images/archive/awards_01.jpg',
      title: 'Abdulliadi Abdulbaki Receiving SUG Award of Merit (Highest CGPA)',
      meta: 'SUG Award Night • ATBU Bauchi',
      category: 'SUG & Dinner Awards'
    },
    {
      id: 'awd_2',
      src: '/images/archive/awards_02.jpg',
      title: 'Presentation of Most Active CWC Member Award to Olivia Oliver',
      meta: '43rd Balewites Dinner & Awards Night',
      category: 'SUG & Dinner Awards'
    },
    {
      id: 'awd_3',
      src: '/images/archive/awards_03.jpg',
      title: 'Presentation of CEO of the Year Award to Olabisi Faruk (Coded)',
      meta: '43rd Balewites Dinner & Awards Night',
      category: 'SUG & Dinner Awards'
    },
    {
      id: 'awd_4',
      src: '/images/archive/awards_04.jpg',
      title: 'Award Recipients & Coursemates on Stage at Dinner & Awards Night',
      meta: 'Sir Ahmadu Bello Int’l Conference Centre',
      category: 'SUG & Dinner Awards'
    },

    // Corporate Day
    {
      id: 'cor_1',
      src: '/images/archive/corporate_01.jpg',
      title: '43rd EEE Balewite Dynamos Group Portrait on Corporate Day',
      meta: 'Corporate Day • Final Year Week',
      category: 'Corporate & Costume Day'
    },
    {
      id: 'cor_2',
      src: '/images/archive/corporate_02.jpg',
      title: 'Classmates in Formal Executive Attire on the Lecture Theatre Steps',
      meta: 'Corporate Day • ATBU Bauchi',
      category: 'Corporate & Costume Day'
    },
    {
      id: 'cor_3',
      src: '/images/archive/corporate_03.jpg',
      title: 'Coursemates Looking Sharp on Corporate Day',
      meta: 'Corporate Day • Final Year Week',
      category: 'Corporate & Costume Day'
    },
    {
      id: 'cor_4',
      src: '/images/archive/corporate_04.jpg',
      title: 'Executive Suits & Blazers on Corporate Day',
      meta: 'Corporate Day • Class of 2025',
      category: 'Corporate & Costume Day'
    },

    // Costume / Custom Day
    {
      id: 'cos_1',
      src: '/images/archive/costume_01.jpg',
      title: 'Full Class Group Capture on Costume & Character Day',
      meta: 'Costume Day • Final Year Week',
      category: 'Corporate & Costume Day'
    },
    {
      id: 'cos_2',
      src: '/images/archive/costume_02.jpg',
      title: 'Creative Inmates & Officers Squad on Costume Day',
      meta: 'Costume Day • Class of 2025',
      category: 'Corporate & Costume Day'
    },
    {
      id: 'cos_3',
      src: '/images/archive/costume_03.jpg',
      title: 'Doctor, Inmate & Retro Suspender Outfits on Costume Day',
      meta: 'Costume Day • Final Year Week',
      category: 'Corporate & Costume Day'
    },
    {
      id: 'cos_4',
      src: '/images/archive/costume_04.jpg',
      title: 'Egyptian Pharaoh Royal Regalia on Costume Day',
      meta: 'Costume Day • ATBU Bauchi',
      category: 'Corporate & Costume Day'
    },

    // Cultural Day
    {
      id: 'cul_1',
      src: '/images/archive/cultural_01.jpg',
      title: 'Coursemates Showcasing Rich Nigerian Cultural Heritage',
      meta: 'Cultural Day • Final Year Week',
      category: 'Cultural Day'
    },
    {
      id: 'cul_2',
      src: '/images/archive/cultural_02.jpg',
      title: 'Traditional Agbada, Babban Riga & Royal Caps on Cultural Day',
      meta: 'Cultural Day • Class of 2025',
      category: 'Cultural Day'
    },
    {
      id: 'cul_3',
      src: '/images/archive/cultural_03.jpg',
      title: 'Celebrating Diversity and Unity on Cultural Day',
      meta: 'Cultural Day • ATBU Bauchi',
      category: 'Cultural Day'
    },
    {
      id: 'cul_4',
      src: '/images/archive/cultural_04.jpg',
      title: 'Traditional Coral Beads, Red Cap & Royal Attire',
      meta: 'Cultural Day • Final Year Week',
      category: 'Cultural Day'
    },

    // Bring Random Things & Garri Day + Hiking
    {
      id: 'gar_1',
      src: '/images/archive/garri_01.jpg',
      title: 'Mixing the Giant Bucket of Garri, Milk & Groundnuts',
      meta: 'Bring Random Things & Garri Day',
      category: 'Garri Day & Hiking'
    },
    {
      id: 'gar_2',
      src: '/images/archive/garri_02.jpg',
      title: 'Lining Up Cups of Chilled Garri for Coursemates',
      meta: 'Garri Day • Final Year Week',
      category: 'Garri Day & Hiking'
    },
    {
      id: 'gar_3',
      src: '/images/archive/garri_03.jpg',
      title: 'Bring Random Things Day — Live Chickens & Kettles in the Lecture Hall',
      meta: 'Bring Random Things & Garri Day',
      category: 'Garri Day & Hiking'
    },
    {
      id: 'gar_4',
      src: '/images/archive/garri_04.jpg',
      title: 'Laughter, Bread & Garri Feast in the Lecture Theatre',
      meta: 'Garri Day • Class of 2025',
      category: 'Garri Day & Hiking'
    },
    {
      id: 'hik_1',
      src: '/images/archive/hiking_01.jpg',
      title: '43rd EEE Balewite Dynamos on the Mega Hiking Expedition',
      meta: 'Mega Hiking • Final Year Week',
      category: 'Garri Day & Hiking'
    },
    {
      id: 'hik_2',
      src: '/images/archive/hiking_02.jpg',
      title: 'Reaching the Rock Summit During the Class Hike',
      meta: 'Mega Hiking • Bauchi',
      category: 'Garri Day & Hiking'
    },
    {
      id: 'hik_3',
      src: '/images/archive/hiking_03.jpg',
      title: 'Coursemates Enjoying the View at the Hilltop',
      meta: 'Mega Hiking • Class of 2025',
      category: 'Garri Day & Hiking'
    },

    // Studio Portraits & Dinner Gala
    {
      id: 'stu_1',
      src: '/images/archive/studio_01.jpg',
      title: '“The Graduate” Special Edition Studio Feature — Engr. Saliu Abdulgafar',
      meta: 'Studio Portrait Archive • Class of 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'stu_2',
      src: '/images/archive/studio_02.jpg',
      title: 'Studio Graduation Portrait with Custom ATBU EEE Sash & Hard Hat',
      meta: 'Studio Portrait Archive • Class of 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'stu_3',
      src: '/images/archive/studio_03.jpg',
      title: 'Executive Studio Portrait with Engineering Hard Hat',
      meta: 'Studio Portrait Archive • Class of 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd1',
      src: '/images/dinner/dinner_01.jpg',
      title: 'Grand Dinner Arrival & Red Carpet Reception',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd2',
      src: '/images/dinner/dinner_02.jpg',
      title: 'Classmates Celebrating & Toasting at the Dinner Gala',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd3',
      src: '/images/dinner/dinner_03.jpg',
      title: 'Department Award & Honor Ceremony at the Gala',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd4',
      src: '/images/dinner/dinner_04.jpg',
      title: 'Memorable Moments with Coursemates at the Dinner Hall',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd5',
      src: '/images/dinner/dinner_05.jpg',
      title: 'Dinner Gala Elegance & Glamour',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd6',
      src: '/images/dinner/dinner_06.jpg',
      title: 'Balewite Dynamos Class Reunion Salute',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd_fem_awd',
      src: '/images/dinner/females_in_engineering_award.jpg',
      title: 'Graduating Female Engineers with HOD Prof. A. L. Amoo Receiving Awards of Recognition',
      meta: '43rd EEE Balewite Dynamo Dinner & Award Night',
      category: 'SUG & Dinner Awards'
    },
    {
      id: 'd7',
      src: '/images/dinner/dinner_07.jpg',
      title: 'Keynote Address at the 43rd EEE Balewite Dynamo Dinner & Award Night',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd8',
      src: '/images/dinner/dinner_08.jpg',
      title: 'On-Stage Award Presentation & Class Honours Celebration',
      meta: '43rd EEE Balewite Dynamo Dinner & Award Night',
      category: 'SUG & Dinner Awards'
    },
    {
      id: 'd9',
      src: '/images/dinner/dinner_09.jpg',
      title: 'Honorees & Coursemates Celebrating on Stage at Award Night',
      meta: '43rd EEE Balewite Dynamo Dinner & Award Night',
      category: 'SUG & Dinner Awards'
    },
    {
      id: 'd10',
      src: '/images/dinner/dinner_10.jpg',
      title: 'Grand Class of 2025 & Faculty Group Portrait at the Dinner Gala',
      meta: '43rd EEE Balewite Dynamo Dinner & Award Night',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd11',
      src: '/images/dinner/dinner_11.jpg',
      title: 'Evening Elegance on the Dinner Gala Red Carpet',
      meta: 'Dynamos Graduation Dinner 2025',
      category: 'Studio & Dinner Gala'
    },
    {
      id: 'd12',
      src: '/images/dinner/dinner_12.jpg',
      title: 'Celebrating with Award of Recognition Certificates at Dinner Night',
      meta: '43rd EEE Balewite Dynamo Dinner & Award Night',
      category: 'SUG & Dinner Awards'
    }
  ];

  const allPhotos = useMemo(() => {
    const combined = [...sortedArchivePhotos, ...printedEventPhotos];
    const featuredSet = new Set(FEATURED_ALL_IDS);
    const featuredFirst = FEATURED_ALL_IDS
      .map((id) => combined.find((item) => item.id === id))
      .filter(Boolean);
    const remaining = combined.filter((item) => !featuredSet.has(item.id));
    return [...featuredFirst, ...remaining];
  }, []);

  const categories = [
    { id: 'ALL', label: `All Moments (${allPhotos.length})` },
    { id: 'Internal Defence', label: 'Internal Defence' },
    { id: 'Induction & Sign-Out', label: 'Induction & Sign-Out' },
    { id: 'SUG & Dinner Awards', label: 'SUG & Dinner Awards' },
    { id: 'Mega Rally', label: 'Mega Rally' },
    { id: 'Corporate & Costume Day', label: 'Corporate & Costume Day' },
    { id: 'Cultural Day', label: 'Cultural Day' },
    { id: 'Garri Day & Hiking', label: 'Garri Day & Hiking' },
    { id: 'Studio & Dinner Gala', label: 'Studio & Dinner Gala' },
  ];

  const currentGalleryList =
    selectedCategory === 'ALL'
      ? allPhotos
      : allPhotos.filter((item) => item.category === selectedCategory);

  const hasMorePhotos = currentGalleryList.length > MAX_GRID_CARDS;
  const visibleGridPhotos = hasMorePhotos
    ? currentGalleryList.slice(0, MAX_GRID_CARDS)
    : currentGalleryList;
  const remainingCount = Math.max(0, currentGalleryList.length - MAX_GRID_CARDS);

  const openLightboxAt = (index) => {
    setImageLoading(true);
    setLightboxIndex(index);
  };

  const goToPrev = () => {
    setImageLoading(true);
    setLightboxIndex((prev) => (prev - 1 + currentGalleryList.length) % currentGalleryList.length);
  };

  const goToNext = () => {
    setImageLoading(true);
    setLightboxIndex((prev) => (prev + 1) % currentGalleryList.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentGalleryList.length]);

  useEffect(() => {
    if (lightboxIndex !== null && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [lightboxIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  const activePhoto = lightboxIndex !== null ? currentGalleryList[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-white">
            <Camera className="w-3.5 h-3.5 text-copper-400" />
            Visual Archives • 265+ Curated Class Memories
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
            EVENTS & CELEBRATION <span className="copper-gradient-text">GALLERY</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans">
            Internal Defence, Induction, Sign-Out, SUG Award Night, Mega Rally, Hiking, Cultural Day, Garri Day, Costume Day, Corporate Day & Dinner Gala.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setLightboxIndex(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-cream-200 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Google Drive Album Callout Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white shadow-lg border border-copper-400/40 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-copper-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-copper-400" />
              Complete High-Resolution Photo Vault
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold">
              Access the Full 208+ Dinner & Event Photos Album on Google Drive
            </h3>
            <p className="text-xs text-stone-300 max-w-xl">
              Browse and download uncompressed portraits, group captures, and candid moments from the official graduation dinner and class archives.
            </p>
          </div>
          <a
            href="https://drive.google.com/drive/folders/1L45SnLR-wTtN_2EYNQ15MfDXP5_DCxIC"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-copper-500 hover:bg-copper-600 text-white font-semibold text-xs sm:text-sm shadow-copper hover:shadow-copper-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Open Full Drive Album</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Gallery Grid (11 Unique Featured Cards + 12th "See More" CTA Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGridPhotos.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightboxAt(idx)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full bg-stone-900 overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/images/cover/page_001_cover.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-950/85 text-copper-300 border border-copper-400/30 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {item.category}
                </div>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-copper-300 font-bold block">
                    {item.meta}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold tracking-wide mt-0.5 line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}

          {/* 12th Card: See More CTA matching Central Working Committee style */}
          {hasMorePhotos && (
            <button
              type="button"
              onClick={() => openLightboxAt(MAX_GRID_CARDS)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-copper-400/60 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 bg-emerald-950 text-left"
            >
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.18),transparent_60%)] pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-copper-500/20 border border-copper-400/40 flex items-center justify-center text-copper-300 mb-3 relative z-10">
                  <Images className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-serif font-black text-copper-300 relative z-10">
                  +{remainingCount}
                </div>
                <p className="text-sm sm:text-base font-serif font-bold text-white mt-1.5 relative z-10">
                  See More Event Moments
                </p>
                <p className="text-[11px] text-stone-300 mt-1 max-w-xs relative z-10">
                  Open the gallery viewer to browse all {currentGalleryList.length} photos on demand
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-copper-500 group-hover:bg-copper-600 text-white text-xs font-bold shadow-copper transition-all relative z-10">
                  <span>Browse Full Archive</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Exhibition Lightbox Viewer (Lazy-Loaded On Demand) */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-emerald-950/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full max-w-4xl bg-stone-900 rounded-2xl overflow-hidden border border-copper-400/40 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 sm:px-6 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-md bg-copper-500/20 text-copper-300 border border-copper-400/30 text-[10px] font-mono font-bold uppercase shrink-0">
                    {lightboxIndex + 1} / {currentGalleryList.length}
                  </span>
                  <span className="text-xs text-stone-400 font-sans truncate">
                    {activePhoto.meta}
                  </span>
                </div>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-copper-500 hover:text-white transition-colors shrink-0"
                  aria-label="Close gallery viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative w-full h-[54vh] sm:h-[62vh] bg-stone-950 flex items-center justify-center overflow-hidden select-none">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-950/70 z-10">
                    <Loader2 className="w-7 h-7 text-copper-400 animate-spin" />
                  </div>
                )}
                <img
                  key={activePhoto.id || lightboxIndex}
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  decoding="async"
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>

              <div className="p-4 sm:px-6 sm:py-4 bg-stone-900 border-t border-stone-800 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-lg font-serif font-bold text-white truncate">
                      {activePhoto.title}
                    </h4>
                    <p className="text-[11px] text-copper-300 font-sans">
                      Swipe, use arrow keys, or scroll strip below • Images load on demand
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={goToPrev}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-copper-500 text-white border border-stone-700 transition-colors"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white shadow-sm transition-colors"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Windowed Lazy Thumbnail Strip — only mounts <img> near active index to save bandwidth */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                  {currentGalleryList.map((thumb, tIdx) => {
                    const isActive = lightboxIndex === tIdx;
                    const isWithinWindow = Math.abs(tIdx - lightboxIndex) <= 5;
                    return (
                      <button
                        key={thumb.id || tIdx}
                        ref={isActive ? activeThumbRef : null}
                        onClick={() => openLightboxAt(tIdx)}
                        title={thumb.title}
                        className={`w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all flex items-center justify-center bg-stone-800 ${
                          isActive
                            ? 'border-copper-400 scale-105 opacity-100'
                            : 'border-transparent opacity-55 hover:opacity-90'
                        }`}
                      >
                        {isWithinWindow ? (
                          <img
                            src={thumb.src}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] font-mono font-bold text-stone-400">
                            {tIdx + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
