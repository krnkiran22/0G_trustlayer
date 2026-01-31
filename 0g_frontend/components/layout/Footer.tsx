import Link from 'next/link';
import Container from './Container';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

const footerLinks = {
  product: [
    { name: 'Analyze', href: '/analyze' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About', href: '/about' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API', href: '#' },
    { name: 'Support', href: '#' },
  ],
  company: [
    { name: 'About 0G', href: 'https://0g.ai' },
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Contact', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SafeGuard AI
              </span>
            </div>
            <p className="text-sm text-slate-600">
              DeFi risk analysis powered by 0G decentralized AI infrastructure.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-600">
              © 2026 SafeGuard AI. Powered by{' '}
              <a
                href="https://0g.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                0G Network
              </a>
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-slate-600 hover:text-blue-600">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
