import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="mb-4 flex items-center">
              <Heart className="mr-2 text-primary-400" />
              <span className="text-xl font-bold">Complete Health AI</span>
            </div>
            <p className="text-gray-400">
              Your AI-powered health and wellness companion for a better, healthier life.
            </p>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Features</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="#tracking" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Health Tracking
                  </Link>
                </li>
                <li>
                  <Link 
                    to="#insights" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    AI Insights
                  </Link>
                </li>
                <li>
                  <Link 
                    to="#voice" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Voice Commands
                  </Link>
                </li>
                <li>
                  <Link 
                    to="#video" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Video Summaries
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/help" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-gray-400 transition-colors hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="mailto:support@completehealthai.com"
                  className="flex items-center hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  support@completehealthtracker.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15551234567"
                  className="flex items-center hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  +1 (214) 940-6749
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                123 Health Street, San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Complete Health AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;