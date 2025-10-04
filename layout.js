import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Search, LayoutDashboard, TrendingUp, PlusCircle, LogOut } from "lucide-react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    loadUser();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.href = createPageUrl("Home");
  };

  const isActive = (pageName) => {
    return location.pathname === createPageUrl(pageName);
  };

  const navItems = [
    { name: "Home", path: "Home", icon: Home },
    { name: "Browse", path: "Browse", icon: Search },
    { name: "Dashboard", path: "Dashboard", icon: LayoutDashboard },
    { name: "Impact", path: "Impact", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <style>{`
        :root {
          --primary: 156 163 175;
          --primary-foreground: 255 255 255;
          --secondary: 16 185 129;
          --accent: 251 146 60;
        }
        
        .brand-gradient {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        
        .nav-link-active {
          position: relative;
          color: #10b981;
        }
        
        .nav-link-active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 2px;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      } border-b border-gray-100`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
                  <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
                  <path d="m14 16-3 3 3 3"/>
                  <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
                  <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
                  <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                WasteXChange
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.path)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'nav-link-active'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link to={createPageUrl("ListWaste")} className="hidden sm:block">
                    <Button className="brand-gradient text-white hover:opacity-90 transition-opacity">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      List Waste
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white font-semibold">
                          {user.company_name ? user.company_name[0].toUpperCase() : user.email[0].toUpperCase()}
                        </div>
                        <span className="hidden sm:inline text-sm font-medium">
                          {user.company_name || user.email}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button onClick={() => User.loginWithRedirect(window.location.href)} className="brand-gradient text-white">
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={createPageUrl(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
                  isActive(item.path)
                    ? 'text-emerald-600'
                    : 'text-gray-500'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
                    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
                    <path d="m14 16-3 3 3 3"/>
                    <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
                    <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
                    <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">WasteXChange</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transform waste into valuable resources. Join the circular economy revolution and make a positive environmental impact.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to={createPageUrl("Browse")} className="hover:text-white transition-colors">Browse Materials</Link></li>
                <li><Link to={createPageUrl("Dashboard")} className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to={createPageUrl("Impact")} className="hover:text-white transition-colors">Impact Tracking</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 WasteXChange. Powered by the circular economy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}