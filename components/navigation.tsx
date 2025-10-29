"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

interface NavigationProps {
  currentPath?: string
  locale?: "en" | "ar"
}

export default function Navigation({ currentPath = "/", locale = "en" }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest(".navbar")) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  const isActive = (path: string) => currentPath === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Products<span>VS</span>
        </Link>

        <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/en" className={`nav-link ${isActive("/en") ? "active" : ""}`} onClick={closeMenu}>
            Comparisons
          </Link>
          <Link href="/ai-battle" className={`nav-link ${isActive("/ai-battle") ? "active" : ""}`} onClick={closeMenu}>
            AI Battle
          </Link>
          <Link href="/favorites" className={`nav-link ${isActive("/favorites") ? "active" : ""}`} onClick={closeMenu}>
            Favorites
          </Link>
          <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`} onClick={closeMenu}>
            About
          </Link>
          <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onClick={closeMenu}>
            Contact
          </Link>

          <div className="language-switcher">
            <Link href={locale === "en" ? "/ar" : "/en"} className="lang-btn" onClick={closeMenu}>
              {locale === "en" ? "العربية" : "English"}
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }

        .nav-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: var(--spacing-lg);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-size: var(--font-xl);
          font-weight: 600;
          color: var(--text);
          text-decoration: none;
          letter-spacing: -0.03em;
          border: none;
          transition: opacity var(--transition);
        }

        .nav-logo:hover {
          opacity: 0.7;
        }

        .nav-logo span {
          font-weight: 400;
        }

        .nav-links {
          display: flex;
          gap: var(--spacing-xl);
          align-items: center;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--font-sm);
          font-weight: 500;
          transition: color var(--transition);
          border: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--text);
        }

        .lang-btn {
          padding: var(--spacing-xs) var(--spacing-md);
          background: var(--text);
          color: var(--bg);
          border: 1px solid var(--text);
          font-weight: 500;
          font-size: var(--font-sm);
          cursor: pointer;
          transition: all var(--transition);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: inline-block;
        }

        .lang-btn:hover {
          background: var(--bg);
          color: var(--text);
        }

        .nav-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px;
          margin: -12px;
          position: relative;
          z-index: 1001;
        }

        .hamburger {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text);
          position: relative;
          transition: background 0.2s ease-out;
        }

        .hamburger::before,
        .hamburger::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background: var(--text);
          position: absolute;
          transition: transform 0.2s ease-out;
        }

        .hamburger::before {
          top: -8px;
        }

        .hamburger::after {
          bottom: -8px;
        }

        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg);
            border-bottom: 1px solid var(--border);
            flex-direction: column;
            align-items: stretch;
            padding: var(--spacing-lg);
            gap: 0;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .nav-links.active {
            display: flex;
          }

          .nav-link {
            padding: var(--spacing-md) 0;
            border-bottom: 1px solid var(--border);
            text-align: center;
          }

          .nav-link:last-child {
            border-bottom: none;
          }

          .language-switcher {
            margin-top: var(--spacing-md);
            text-align: center;
          }
        }
      `}</style>
    </nav>
  )
}
