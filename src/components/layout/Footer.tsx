import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-gradient-to-br from-primary to-primary-glow p-2">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg text-foreground">MindCare</span>
            </div>
            <p className="text-calm text-sm">
              Confidential, accessible mental health support for students. 
              We're here to help you thrive academically and personally.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/chat" className="text-calm hover:text-primary transition-colors">
                  AI First-Aid Chat
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-calm hover:text-primary transition-colors">
                  Book Counseling
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-calm hover:text-primary transition-colors">
                  Self-Help Resources
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-calm hover:text-primary transition-colors">
                  Peer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Learn More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-calm hover:text-primary transition-colors">
                  About Mental Health
                </a>
              </li>
              <li>
                <a href="#" className="text-calm hover:text-primary transition-colors">
                  Privacy & Confidentiality
                </a>
              </li>
              <li>
                <a href="#" className="text-calm hover:text-primary transition-colors">
                  Crisis Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-calm hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Emergency Help</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-destructive" />
                <span className="text-calm">Crisis: 102 (India)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-calm">support@mindcare.edu</span>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                If you're in immediate danger, please contact emergency services 
                or your local crisis helpline.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-calm">
              © 2024 MindCare. Open-source mental health support platform.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-calm hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-calm hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-calm hover:text-primary transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;