import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Hydroponic Setup Builder and Planner',
  description: 'Plan and build diy hydroponic nft system for your home',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer>
          <span>
            Build by{' '}
            <a href="https://www.dorplaut.com/" target="_blank">
              Dor Plaut
            </a>
          </span>
          <br />
          <a href="https://www.dorplaut.com/contact" target="_blank">
            Contact Me Now
          </a>
        </footer>
      </body>
    </html>
  );
}
