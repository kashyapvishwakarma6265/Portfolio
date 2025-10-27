import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const Skills = component$(() => {
  const isVisible = useSignal(false);
  const activeCategory = useSignal('All');

  useVisibleTask$(() => {
    const skillsElement = document.querySelector('section.skills') as HTMLElement;
    if (!skillsElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(skillsElement);
    return () => observer.disconnect();
  });

  const skillCategories = [
    {
      name: 'Frontend',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      skills: [
        { name: 'React.js', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '▲' },
        { name: 'TypeScript', level: 92, icon: '📘' },
        { name: 'JavaScript (ES6+)', level: 94, icon: '🟨' },
        { name: 'HTML5/CSS3', level: 96, icon: '🌐' },
        { name: 'Tailwind CSS', level: 88, icon: '💨' },
        { name: 'Vue.js', level: 75, icon: '🟢' },
        { name: 'Angular', level: 70, icon: '🅰️' }
      ]
    },
    {
      name: 'Backend',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/30',
      bgColor: 'bg-green-500/10',
      skills: [
        { name: 'Node.js', level: 90, icon: '🟢' },
        { name: 'Express.js', level: 88, icon: '🚂' },
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'Django', level: 82, icon: '🎸' },
        { name: 'PHP', level: 78, icon: '🐘' },
        { name: 'Laravel', level: 75, icon: '🔶' },
        { name: 'RESTful APIs', level: 92, icon: '🔗' },
        { name: 'GraphQL', level: 80, icon: '📊' }
      ]
    },
    {
      name: 'Database',
      icon: '💾',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
      skills: [
        { name: 'PostgreSQL', level: 85, icon: '🐘' },
        { name: 'MongoDB', level: 82, icon: '🍃' },
        { name: 'MySQL', level: 80, icon: '🐬' },
        { name: 'Redis', level: 75, icon: '🔴' },
        { name: 'Firebase', level: 78, icon: '🔥' },
        { name: 'Supabase', level: 70, icon: '⚡' }
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: '🛠️',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-500/10',
      skills: [
        { name: 'Docker', level: 80, icon: '🐳' },
        { name: 'AWS', level: 75, icon: '☁️' },
        { name: 'Git', level: 92, icon: '📚' },
        { name: 'CI/CD', level: 78, icon: '🔄' },
        { name: 'Linux', level: 82, icon: '🐧' },
        { name: 'Nginx', level: 70, icon: '🎯' },
        { name: 'Webpack', level: 75, icon: '📦' },
        { name: 'Jest', level: 80, icon: '🧪' }
      ]
    },
    {
      name: 'Mobile',
      icon: '📱',
      color: 'from-indigo-500 to-purple-500',
      borderColor: 'border-indigo-500/30',
      bgColor: 'bg-indigo-500/10',
      skills: [
        { name: 'React Native', level: 78, icon: '⚛️' },
        { name: 'Flutter', level: 70, icon: '📱' },
        { name: 'iOS Development', level: 65, icon: '🍎' },
        { name: 'Android Development', level: 68, icon: '🤖' }
      ]
    },
    {
      name: 'Design',
      icon: '🎯',
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/30',
      bgColor: 'bg-pink-500/10',
      skills: [
        { name: 'Figma', level: 85, icon: '🎨' },
        { name: 'Adobe XD', level: 75, icon: '✏️' },
        { name: 'UI/UX Design', level: 80, icon: '✨' },
        { name: 'Prototyping', level: 78, icon: '📐' },
        { name: 'Wireframing', level: 82, icon: '📝' }
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);
  const filteredSkills = activeCategory.value === 'All' 
    ? allSkills 
    : skillCategories.find(cat => cat.name === activeCategory.value)?.skills || [];

  return (
    <>
      <style>
        {`
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
          @keyframes fillBar {
            from {
              width: 0;
            }
            to {
              width: var(--target-width);
            }
          }
          @keyframes bounceIn {
            from {
              opacity: 0;
              transform: scale(0.3);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
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
          .animate-fill-bar {
            animation: fillBar 1.5s ease-out forwards;
            animation-delay: 0.5s;
          }
          .animate-bounce-in {
            animation: bounceIn 0.6s ease-out forwards;
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
            background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      <section id='skills' class="skills relative w-full max-w-[1500px] mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm">
        {/* Background Elements */}
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div class={`text-center mb-16 ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div class="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Technical Skills
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              My <span class="gradient-text">Technical Arsenal</span>
            </h2>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A comprehensive showcase of technologies and tools I've mastered throughout my journey
            </p>
          </div>

          {/* Category Filter */}
          <div class={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <button
              onClick$={() => activeCategory.value = 'All'}
              class={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift ${
                activeCategory.value === 'All'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-blue-500/30'
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick$={() => activeCategory.value = category.name}
                class={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift ${
                  activeCategory.value === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-blue-500/25`
                    : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-blue-500/30'
                }`}
              >
                <span class="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div class={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.name} 
                class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover-lift group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Glow */}
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div class="relative z-10">
                  {/* Skill Header */}
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">{skill.icon}</span>
                      <h3 class="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {skill.name}
                      </h3>
                    </div>
                    <span class="text-blue-400 font-bold text-sm bg-blue-500/10 px-2 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
                    <div 
                      class="skill-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 group-hover:from-blue-400 group-hover:to-purple-400"
                      style={{ 
                        '--target-width': `${skill.level}%`,
                        width: isVisible.value ? `${skill.level}%` : '0%'
                      }}
                    ></div>
                  </div>

                  {/* Skill Level Indicator */}
                  <div class="flex justify-between text-xs text-gray-400">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

   {/* Skills Overview - Fully Responsive */}
<div 
  class={`mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ${
    isVisible.value ? 'animate-fade-in-up' : 'opacity-0'
  }`} 
  style={{ animationDelay: '0.6s' }}
>
  {skillCategories.map((category, index) => (
    <div
      key={category.name}
      class={`
        bg-gray-800/30 backdrop-blur-sm rounded-2xl p-5 sm:p-6 
        border ${category.borderColor} 
        hover-lift group cursor-pointer 
        transition-all duration-300 
        transform-gpu
      `}
      onClick$={() => (activeCategory.value = category.name)}
    >
      <div class="text-center">
        {/* Icon */}
        <div
          class={`
            inline-flex items-center justify-center 
            w-14 h-14 sm:w-16 sm:h-16 
            rounded-2xl ${category.bgColor} 
            mb-3 sm:mb-4 
            group-hover:scale-110 
            transition-transform duration-300
          `}
        >
          <span class="text-2xl sm:text-3xl">{category.icon}</span>
        </div>

        {/* Title */}
        <h3 class="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">
          {category.name}
        </h3>

        {/* Skill Count */}
        <p class="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
          {category.skills.length} {category.skills.length === 1 ? 'technology' : 'technologies'} mastered
        </p>

        {/* Skill Tags */}
        <div class="flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {category.skills.slice(0, 5).map((skill) => (
            <span
              key={skill.name}
              class="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300 whitespace-nowrap"
            >
              {skill.name}
            </span>
          ))}
          {category.skills.length > 5 && (
            <span class="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300">
              +{category.skills.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

          {/* Call to Action */}
          <div class={`text-center mt-16 ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div class="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 class="text-2xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
              <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
                With this diverse skill set, I'm equipped to tackle complex challenges and deliver exceptional digital solutions.
              </p>
              <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 group">
                <span>Start a Project</span>
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Skills;