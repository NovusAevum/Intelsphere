export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold gradient-text">
              🐹 HANIS WONDER PETS
            </div>
            <div className="hidden md:block text-sm text-gray-400">
              Advanced Intelligence Center
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="hover:text-[hsl(var(--cyber))] transition-colors"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('agents')}
              className="hover:text-[hsl(var(--cyber))] transition-colors"
            >
              AGENTS
            </button>
            <button 
              onClick={() => scrollToSection('capabilities')}
              className="hover:text-[hsl(var(--cyber))] transition-colors"
            >
              CAPABILITIES
            </button>
            <button 
              onClick={() => scrollToSection('resume')}
              className="hover:text-[hsl(var(--cyber))] transition-colors"
            >
              RESUME
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-[hsl(var(--cyber))] transition-colors"
            >
              CONTACT
            </button>
          </div>
          <button className="md:hidden text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
