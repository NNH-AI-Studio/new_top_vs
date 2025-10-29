import './globals.css';

export const metadata = {
  title: 'Products VS - AI-Powered Comparison Platform',
  description: 'Compare products and services with AI-powered analysis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
