import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export const Navbar = component$(() => {
  const isMenuOpen = useSignal(false);
  const isScrolled = useSignal(false);
  const location = useLocation();

  // Scroll handler (runs in browser only)
  useVisibleTask$(({ cleanup }) => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    cleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  // Close mobile menu when route changes
  useVisibleTask$(({ track }) => {
    track(() => location.url.pathname + location.url.hash);
    isMenuOpen.value = false;
  });

  // Hash-based navigation links
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    // { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  // QRL-serializable smooth scroll function
  const scrollTo = $((e: Event, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isMenuOpen.value = false;
  });

  const getLinkClass = (href: string) => {
    const isActive = location.url.hash === href;
    return `relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? 'text-teal-400' : 'text-gray-300 hover:text-white'
    }`;
  };

  const getMobileLinkClass = (href: string) => {
    const isActive = location.url.hash === href;
    return `block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${
      isActive ? 'bg-teal-500/10 text-teal-300' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;
  };

  return (
    <header
      class={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-50 transition-all duration-300`}
    >
      <nav
        class={`rounded-full border transition-all duration-300 ${
          isScrolled.value
            ? 'border-gray-700/50 bg-gray-900/70 backdrop-blur-lg shadow-2xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <a
              href="#home"
              onClick$={(e) => scrollTo(e, '#home')}
              class="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors duration-300"
            >
              KV
            </a>

            {/* Desktop Menu */}
            <div class="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick$={(e) => scrollTo(e, link.href)}
                  class={getLinkClass(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div class="hidden md:block">
              <a
                href="#contact"
                onClick$={(e) => scrollTo(e, '#contact')}
                class="px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-500 transition-all duration-300 shadow-lg"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div class="md:hidden">
              <button
                class="inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                onClick$={() => (isMenuOpen.value = !isMenuOpen.value)}
                aria-expanded={isMenuOpen.value}
              >
                <span class="sr-only">Open main menu</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d={isMenuOpen.value ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          class={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen.value ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div class="px-2 pt-2 pb-4 space-y-1 bg-gray-900/90 backdrop-blur-md rounded-b-2xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick$={(e) => scrollTo(e, link.href)}
                class={getMobileLinkClass(link.href)}
              >
                {link.label}
              </a>
            ))}
            <div class="px-2 pt-4">
              <a
                href="#contact"
                onClick$={(e) => scrollTo(e, '#contact')}
                class="block w-full text-center px-4 py-3 text-base font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-500 transition-colors duration-300"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});