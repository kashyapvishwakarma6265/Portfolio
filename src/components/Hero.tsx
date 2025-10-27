import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const Hero = component$(() => {
  const isVisible = useSignal(false);

  // Animate on scroll into view
  useVisibleTask$(() => {
    const heroElement = document.querySelector('section.hero') as HTMLElement;
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroElement);
    return () => observer.disconnect();
  });

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-gradient {
            animation: gradient 15s ease infinite;
            background-size: 400% 400%;
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
          .animate-fade-in-left {
            animation: fadeInLeft 1s ease-out forwards;
          }
          .animate-fade-in-right {
            animation: fadeInRight 1s ease-out forwards;
          }
          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }
          .animate-shimmer {
            animation: shimmer 3s infinite linear;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.1),
              transparent
            );
            background-size: 200% 100%;
          }
          .animate-blob {
            animation: blob 7s infinite linear;
          }
          .text-shadow-glow {
            text-shadow: 0 0 20px rgba(20, 184, 166, 0.5);
          }
          .hover-lift {
            transition: all 0.3s ease;
          }
          .hover-lift:hover {
            transform: translateY(-5px);
          }
        `}
      </style>

      <section id='home' class={`hero relative w-full max-w-full mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden bg-black`}>
        {/* Animated background with multiple gradients */}
        <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-teal-900/30 animate-gradient"></div>
        
        {/* Animated background shapes */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-blob"></div>
          <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div class="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Content */}
        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto">
          
          {/* Text Content */}
          <div class={`flex-1 text-left mb-12 lg:mb-0 ${isVisible.value ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div class="mb-6">
              <span class="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 text-sm font-medium mb-4 hover-lift">
                <span class="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse-slow"></span>
                Available for new opportunities
              </span>
            </div>

            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight text-shadow-glow">
              Kashyap
              <span class="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Vishwakarma
              </span>
            </h1>
            
            <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-teal-400">
              Sr. Fullstack Developer
            </h2>
            
            <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>

            {/* Stats */}
            <div class="flex flex-wrap gap-6 mb-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-teal-400">5+</div>
                <div class="text-sm text-gray-400">Years Experience</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-teal-400">50+</div>
                <div class="text-sm text-gray-400">Projects</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-teal-400">100%</div>
                <div class="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div class="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                class="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-semibold rounded-full shadow-2xl hover:shadow-teal-500/30 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div class="absolute inset-0 animate-shimmer"></div>
                <span class="relative">View My Work</span>
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/contact"
                class="group inline-flex items-center justify-center px-8 py-4 border-2 border-teal-500/50 text-teal-400 font-semibold rounded-full hover:bg-teal-500/10 hover:border-teal-400 transform hover:scale-105 transition-all duration-300"
              >
                <span>Get In Touch</span>
                <svg class="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Profile Image */}
          <div class={`flex-1 flex justify-center lg:justify-end ${isVisible.value ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div class="relative">
              {/* Glowing orb behind image */}
              <div class="absolute inset-0 -z-10">
                <div class="w-80 h-80 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
              </div>

              {/* Decorative animated elements */}
              <div class="absolute -top-6 -right-6 w-6 h-6 border-2 border-teal-400 rounded-full animate-ping"></div>
              <div class="absolute -bottom-8 -left-8 w-12 h-12 border border-teal-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
              <div class="absolute top-1/2 -right-12 w-8 h-8 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>

              {/* Main image container */}
              <div class="relative group">
                {/* Outer ring */}
                <div class="absolute -inset-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-20 group-hover:opacity-40 blur transition-all duration-500 animate-pulse-slow"></div>
                
                {/* Image with enhanced styling */}
                <img
                  src="/img/kashyap.jpg"
                  alt="Kashyap Vishwakarma - Sr. Fullstack Developer"
                  class="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-2xl ring-4 ring-teal-500/30 ring-offset-4 ring-offset-black animate-float group-hover:animate-none group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Hover effect overlay */}
                <div class="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <span class="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    👋 Hello!
                  </span>
                </div>
              </div>

              {/* Floating tech badges */}
              <div class="absolute -bottom-4 -right-4 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-teal-500/30 animate-float" style={{ animationDelay: '1s' }}>
                <span class="text-sm text-teal-300 font-medium">React • Node.js</span>
              </div>
              <div class="absolute -top-4 -left-4 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-cyan-500/30 animate-float" style={{ animationDelay: '2s' }}>
                <span class="text-sm text-cyan-300 font-medium">TypeScript</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div class="flex flex-col items-center text-teal-400/60 hover:text-teal-400 transition-colors duration-300 cursor-pointer">
            <span class="text-sm mb-2">Scroll Down</span>
            <div class="w-6 h-10 border-2 border-teal-400/60 rounded-full flex justify-center">
              <div class="w-1 h-3 bg-teal-400/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Enhanced wavy bottom decorative element */}
        <div class="absolute bottom-0 left-0 right-0 h-32">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="fill-teal-500/30"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="fill-teal-500/20"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="fill-teal-500/10"></path>
          </svg>
        </div>
      </section>
    </>
  );
});