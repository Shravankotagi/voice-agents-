
import React from 'react';
import { Button } from '@/components/UI/Button';

const navItems = [
  { label: "Agents", id: "agents-section" },
  { label: "Industries", id: "industries-section" },
  { label: "Enterprise", id: "enterprise-section" },
  { label: "Case Studies", id: "cases-section" },
  { label: "Contact", id: "contact-section" }
];

export const Navbar = () => {

const scrollToSection = (id: string) => {
  console.log("Trying:", id);

  const element = document.getElementById(id);

  console.log("Found:", element);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">

      <div className="container flex items-center justify-between h-16">

        <div className="flex items-center gap-8">

          <span className="text-lg font-semibold tracking-tight">
            Enlights
            <span className="text-[var(--color-primary)]">.</span>
          </span>

          <div className="hidden md:flex items-center gap-6">

            {navItems.map((item)=>(
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="
                text-sm
                text-zinc-400
                hover:text-white
                transition-colors
                "
              >
                {item.label}
              </button>
            ))}

          </div>

        </div>

        <Button variant="primary">
          Book a Demo
        </Button>

      </div>

    </nav>
  );
};
