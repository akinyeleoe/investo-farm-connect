
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Oluwaseun Adebayo',
    role: 'Short-term Investor',
    testimonial: 'I started with the short-term plan 6 months ago, and I\'ve been receiving my monthly returns consistently. The platform is transparent and easy to use.',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    stars: 5,
  },
  {
    id: 2,
    name: 'Chioma Okafor',
    role: 'Medium-term Investor',
    testimonial: 'Farmly.ng has been my best investment decision this year. The returns are impressive, and I love how I can track my investment growth from my dashboard.',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    stars: 5,
  },
  {
    id: 3,
    name: 'Emeka Nwachukwu',
    role: 'Long-term Investor',
    testimonial: 'I\'m investing for my retirement with the long-term plan. The concept of increasing returns after 3 years makes it perfect for pension planning.',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    stars: 4,
  },
  {
    id: 4,
    name: 'Aisha Mohammed',
    role: 'Short-term Investor',
    testimonial: 'The monthly payout system works flawlessly. I receive my interest right on schedule every month without any delays or complications.',
    avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
    stars: 5,
  },
  {
    id: 5,
    name: 'Tunde Bakare',
    role: 'Medium-term Investor',
    testimonial: 'I started with a small investment to test the waters, and I\'ve been so impressed that I\'ve now increased my investment amount significantly.',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    stars: 5,
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Calculate visible testimonials based on current slide
  const visibleTestimonials = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      // Show 3 testimonials on desktop
      const startIndex = currentSlide % testimonials.length;
      const items = [...testimonials, ...testimonials]; // Duplicate array for seamless scrolling
      return items.slice(startIndex, startIndex + 3);
    } else if (typeof window !== 'undefined' && window.innerWidth >= 640) {
      // Show 2 testimonials on tablet
      const startIndex = currentSlide % testimonials.length;
      const items = [...testimonials, ...testimonials]; // Duplicate array for seamless scrolling
      return items.slice(startIndex, startIndex + 2);
    } else {
      // Show 1 testimonial on mobile
      return [testimonials[currentSlide % testimonials.length]];
    }
  };

  const nextSlide = () => {
    setIsManualChange(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsManualChange(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = window.setInterval(() => {
        if (!isManualChange) {
          setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        } else {
          setIsManualChange(false);
        }
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isManualChange]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Investors Say</h2>
          <p className="text-muted-foreground text-lg">
            Don't take our word for it. Hear from our satisfied investors about their experience with Farmly.ng.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${-currentSlide * 100 / visibleTestimonials().length}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="glass-card rounded-2xl p-8 h-full flex flex-col hover-scale transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonial.stars ? "fill-farm-accent text-farm-accent" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <p className="text-foreground mb-6 italic flex-grow">"{testimonial.testimonial}"</p>
                    <div className="flex items-center mt-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4 border-2 border-farm-primary"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10 hover:bg-farm-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-farm-primary"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10 hover:bg-farm-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-farm-primary"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsManualChange(true);
                setCurrentSlide(index);
              }}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                index === currentSlide % testimonials.length 
                  ? 'bg-farm-primary scale-125 transition-transform' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
