"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Products VS</h4>
          <p>Professional comparison website providing detailed analysis in both English and Arabic languages.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href="/en">English Comparisons</Link>
            </li>
            <li>
              <Link href="/ar">المقارنات بالعربية</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@productsvs.com</p>
          <p>&copy; 2025 Products VS. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: var(--spacing-3xl) 0 var(--spacing-xl);
          margin-top: var(--spacing-3xl);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-2xl);
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }

        .footer-section h4 {
          font-size: var(--font-sm);
          margin-bottom: var(--spacing-md);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
        }

        .footer-section p,
        .footer-section a {
          color: var(--text-secondary);
          font-size: var(--font-sm);
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: var(--spacing-xs);
        }

        .footer-section a {
          border: none;
          transition: color var(--transition);
        }

        .footer-section a:hover {
          color: var(--text);
        }

        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
