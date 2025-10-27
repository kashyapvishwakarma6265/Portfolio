// src/routes/index.tsx
import { component$ } from "@builder.io/qwik";
import { Navbar } from "~/components/Navbar";
import { Hero } from "~/components//Hero";
import About from "~/components/About";
import Skills from "~/components/Skills";
import Contact from "~/components/Contact";

export default component$(() => {
  return (
    <>
      <Navbar />

      {/* Home Section */}
      <section id="home" class="">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <About />
      </section>

     {/* Skills Section */}
      <section id="skills" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Skills />
      </section>
      
       <section id="skills" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Contact />
      </section>
    </>
  );
});