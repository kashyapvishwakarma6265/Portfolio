import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export const Contact = component$(() => {
  const isVisible = useSignal(false);
  const formState = useSignal({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const isSubmitting = useSignal(false);
  const isSubmitted = useSignal(false);

  useVisibleTask$(() => {
    const contactElement = document.querySelector('section.contact') as HTMLElement;
    if (!contactElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(contactElement);
    return () => observer.disconnect();
  });

  // Fixed: Wrapped in $() to make it a QRL
  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    isSubmitting.value = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    isSubmitting.value = false;
    isSubmitted.value = true;

    // Reset form after success
    setTimeout(() => {
      formState.value = { name: '', email: '', subject: '', message: '' };
      isSubmitted.value = false;
    }, 5000);
  });

  const contactMethods = [
    {
      icon: 'Email',
      title: 'Email',
      value: 'hello@kashyap.dev',
      href: 'mailto:hello@kashyap.dev',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Phone',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: 'Location',
      title: 'Location',
      value: 'San Francisco, CA',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'LinkedIn',
      title: 'LinkedIn',
      value: 'linkedin.com/in/kashyap',
      href: 'https://linkedin.com/in/kashyap',
      color: 'from-blue-600 to-blue-700'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'Code',
      href: 'https://github.com/kashyap',
      color: 'hover:text-gray-400'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      href: 'https://twitter.com/kashyap',
      color: 'hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: 'LinkedIn',
      href: 'https://linkedin.com/in/kashyap',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Dribbble',
      icon: 'Design',
      href: 'https://dribbble.com/kashyap',
      color: 'hover:text-pink-500'
    }
  ];

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
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
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
          .animate-bounce-in {
            animation: bounceIn 0.6s ease-out forwards;
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
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
          .form-input:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        `}
      </style>

      <section id='contact' class="contact relative w-full max-w-[1500px] mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm">
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
              Get In Touch
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's <span class="gradient-text">Work Together</span>
            </h2>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div class={`space-y-8 ${isVisible.value ? 'animate-fade-in-left' : 'opacity-0'}`}>
              {/* Contact Methods */}
              <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div class="space-y-4">
                  {contactMethods.map((method, index) => (
                    <a
                      key={method.title}
                      href={method.href}
                      class={`flex items-center p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 hover-lift group transition-all duration-300 ${isVisible.value ? 'animate-fade-in-left' : 'opacity-0'}`}
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      <div class={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span class="text-xl">{method.icon}</span>
                      </div>
                      <div class="flex-1">
                        <h4 class="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {method.title}
                        </h4>
                        <p class="text-gray-400 text-sm">{method.value}</p>
                      </div>
                      <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 class="text-2xl font-bold text-white mb-6">Follow Me</h3>
                <div class="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      class={`flex items-center px-4 py-3 rounded-xl bg-gray-800/20 border border-gray-700/30 hover-lift group transition-all duration-300 ${social.color} ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`}
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <span class="text-lg mr-2">{social.icon}</span>
                      <span class="text-white font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div class="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
                <div class="flex items-center mb-4">
                  <div class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <h3 class="text-xl font-bold text-white">Currently Available</h3>
                </div>
                <p class="text-gray-300 mb-4">
                  I'm currently accepting new projects and would love to hear about your ideas.
                </p>
                <div class="flex items-center text-sm text-gray-400">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Response time: Usually within 24 hours
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div class={`${isVisible.value ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 class="text-2xl font-bold text-white mb-6">Send Message</h3>

                {/* Success Message */}
                {isSubmitted.value && (
                  <div class="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl animate-bounce-in">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-green-400 font-semibold">Message sent successfully!</span>
                    </div>
                    <p class="text-green-300 text-sm mt-1">I'll get back to you as soon as possible.</p>
                  </div>
                )}

                <form onSubmit$={handleSubmit} class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.value.name}
                        onInput$={(e) => formState.value = { ...formState.value, name: (e.target as HTMLInputElement).value }}
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 form-input focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.value.email}
                        onInput$={(e: InputEvent) => {
                          const target = e.target as HTMLInputElement;
                          formState.value = { ...formState.value, email: target.value };
                        }}
                        class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 form-input focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formState.value.subject}
                      onInput$={(e) => formState.value = { ...formState.value, subject: (e.target as HTMLInputElement).value }}
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 form-input focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formState.value.message}
                      onInput$={(e) => formState.value = { ...formState.value, message: (e.target as HTMLTextAreaElement).value }}
                      class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 form-input focus:outline-none focus:border-blue-500/50 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting.value}
                    class={`w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/30 transform transition-all duration-300 flex items-center justify-center ${isSubmitting.value ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                      }`}
                  >
                    {isSubmitting.value ? (
                      <>
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                {/* Privacy Note */}
                <p class="text-gray-400 text-sm mt-4 text-center">
                  Your information is secure and will never be shared with third parties.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div class={`mt-16 text-center ${isVisible.value ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <div class="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 class="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
              <p class="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's schedule a call to discuss your requirements and explore how we can work together to achieve your goals.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/projects"
                  class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 group"
                >
                  <span>View My Work</span>
                  <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="https://calendly.com/kashyap"
                  class="inline-flex items-center px-8 py-4 border-2 border-blue-500/50 text-blue-400 font-semibold rounded-full hover:bg-blue-500/10 hover:border-blue-400 transform hover:scale-105 transition-all duration-300 group"
                >
                  <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Contact;