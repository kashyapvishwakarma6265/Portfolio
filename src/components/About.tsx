import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

const About = component$(() => {
  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    const aboutElement = document.querySelector('section.about') as HTMLElement;
    if (!aboutElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(aboutElement);
    return () => observer.disconnect();
  });

  const skills = [
    { name: 'React/Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Node.js/Express', level: 88, category: 'Backend' },
    { name: 'Python/Django', level: 85, category: 'Backend' },
    { name: 'PostgreSQL', level: 82, category: 'Database' },
    { name: 'AWS/DevOps', level: 78, category: 'Infrastructure' },
    { name: 'UI/UX Design', level: 75, category: 'Design' },
    { name: 'Mobile Development', level: 70, category: 'Mobile' },
  ];

  const experiences = [
    { years: '2022-Present', role: 'Senior Fullstack Developer', company: 'Tech Innovations Inc.' },
    { years: '2020-2022', role: 'Fullstack Developer', company: 'Digital Solutions Ltd.' },
    { years: '2018-2020', role: 'Frontend Developer', company: 'Web Creators Agency' },
  ];

  return (
    <>
      <style>
        {`
          @keyframes drawLine {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
          @keyframes fillBar {
            from {
              width: 0;
            }
            to {
              width: var(--target-width);
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
          .animate-draw-line {
            animation: drawLine 1s ease-out forwards;
          }
          .animate-fill-bar {
            animation: fillBar 1.5s ease-out forwards;
            animation-delay: 0.5s;
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
          .skill-bar {
            --target-width: 0%;
          }
          .hover-lift {
            transition: all 0.3s ease;
          }
          .hover-lift:hover {
            transform: translateY(-5px);
          }
          .gradient-text {
            background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      <section id='about' class="about relative w-full max-w-full mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm">
        {/* Background Elements */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div class={`text-center mb-16 ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div class="inline-flex items-center px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 text-sm font-medium mb-6">
              <span class="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
              About Me
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Crafting <span class="gradient-text">Digital Excellence</span>
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full animate-draw-line"></div>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Story & Image */}
            <div class={`space-y-8 ${isVisible.value ? 'animate-fade-in-left' : 'opacity-0'}`}>
              {/* Main Story */}
              <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover-lift">
                <h3 class="text-2xl font-bold text-white mb-4">My Journey</h3>
                <p class="text-gray-300 leading-relaxed mb-4">
                  With over <span class="text-teal-400 font-semibold">5 years</span> of experience in full-stack development, 
                  I've dedicated my career to creating digital solutions that not only meet business objectives 
                  but also deliver exceptional user experiences.
                </p>
                <p class="text-gray-300 leading-relaxed mb-4">
                  My passion lies in bridging the gap between design and technology, ensuring that every 
                  pixel and line of code serves a purpose. I believe in writing clean, maintainable code 
                  that stands the test of time.
                </p>
                <p class="text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community.
                </p>
              </div>

              {/* Experience Timeline */}
              <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover-lift">
                <h3 class="text-2xl font-bold text-white mb-6">Experience</h3>
                <div class="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} class="flex group">
                      <div class="flex-shrink-0 w-3 h-3 bg-teal-400 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                      <div class="ml-4 flex-1">
                        <div class="flex justify-between items-start mb-1">
                          <h4 class="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                            {exp.role}
                          </h4>
                          <span class="text-sm text-teal-400 bg-teal-400/10 px-2 py-1 rounded-full">
                            {exp.years}
                          </span>
                        </div>
                        <p class="text-gray-400">{exp.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Skills & Stats */}
            <div class={`space-y-8 ${isVisible.value ? 'animate-fade-in-right' : 'opacity-0'}`}>
              {/* Skills Grid */}
              <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover-lift">
                <h3 class="text-2xl font-bold text-white mb-6">Technical Skills</h3>
                <div class="grid gap-4">
                  {skills.map((skill) => (
                    <div key={skill.name} class="group">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-gray-300 font-medium group-hover:text-teal-300 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span class="text-teal-400 text-sm font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          class="skill-bar h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-300 group-hover:from-teal-300 group-hover:to-cyan-300"
                          style={{ 
                            '--target-width': `${skill.level}%`,
                            width: isVisible.value ? `${skill.level}%` : '0%'
                          }}
                        ></div>
                      </div>
                      <span class="text-xs text-gray-500 mt-1 block">{skill.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl p-6 text-center border border-teal-500/20 hover-lift group">
                  <div class="text-3xl font-bold text-teal-400 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div class="text-gray-300 text-sm">Projects Completed</div>
                </div>
                <div class="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 text-center border border-cyan-500/20 hover-lift group">
                  <div class="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
                  <div class="text-gray-300 text-sm">Happy Clients</div>
                </div>
                <div class="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 text-center border border-blue-500/20 hover-lift group">
                  <div class="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                  <div class="text-gray-300 text-sm">Years Experience</div>
                </div>
                <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 text-center border border-purple-500/20 hover-lift group">
                  <div class="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                  <div class="text-gray-300 text-sm">Technologies</div>
                </div>
              </div>

              {/* CTA Button */}
              <div class="text-center">
                <Link
                  href="/contact"
                  class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-semibold rounded-full shadow-2xl hover:shadow-teal-500/30 transform hover:scale-105 transition-all duration-300 group"
                >
                  <span>Let's Work Together</span>
                  <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div class={`mt-16 text-center ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div class="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 class="text-2xl font-bold text-white mb-4">Development Philosophy</h3>
              <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                "I believe in creating solutions that are not just functional, but also 
                <span class="text-teal-400"> scalable, maintainable, and delightful to use</span>. 
                Every project is an opportunity to push boundaries and create something extraordinary."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

// This is the key fix:
export default About;