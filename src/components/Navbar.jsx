import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Navigation bar component
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Whether mobile menu is open
    const [hasScrolled, setHasScrolled] = useState(false); // Whether page has been scrolled
    const [currentSection, setCurrentSection] = useState("Home"); // Currently active section

    // Navigation items and their section links
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    // Detect scroll to update navbar background and active section
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 20);

            const sections = navItems.map(item => {
                const sectionElement = document.querySelector(item.href);
                if (sectionElement) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: sectionElement.offsetTop - 550,
                        height: sectionElement.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const scrollPosition = window.scrollY;

            const current = sections.find(section =>
                scrollPosition >= section.offset &&
                scrollPosition < section.offset + section.height
            );

            if (current) {
                setCurrentSection(current.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    }, [isMenuOpen]);

    // Scroll smoothly to the section and close mobile menu
    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                isMenuOpen
                    ? "bg-[#030014]"
                    : hasScrolled
                        ? "bg-[#030014]/50 backdrop-blur-xl"
                        : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
                        >
                            SP
                        </a>
                    </div>

                    {/* Desktop navigation links */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            currentSection === item.href.substring(1)
                                                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                                : "text-[#e2d3fd] group-hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] origin-left transition-transform duration-300 ${
                                            currentSection === item.href.substring(1)
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button (hamburger or close icon) */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isMenuOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu links */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className="px-4 py-6 space-y-4">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                                currentSection === item.href.substring(1)
                                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                    : "text-[#e2d3fd] hover:text-white"
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transform: isMenuOpen ? "translateX(0)" : "translateX(50px)",
                                opacity: isMenuOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
