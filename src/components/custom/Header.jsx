import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react'; // Import icons for hamburger menu

function Header() {
  const { isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  return (
    <nav className='bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo Section */}
          <div className='flex-shrink-0'>
            <Link to='/' className='flex items-center'>
              <img
                src='/logo.svg'
                alt='AI Resume Builder Logo'
                width={120}
                height={40}
                className='cursor-pointer transition-transform duration-200 hover:scale-105'
              />
            </Link>
          </div>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <div className='hidden md:flex items-center space-x-4'>
            {isSignedIn ? (
              <>
                <Link to='/' className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'>
                  Home
                </Link>
                <Link to='/dashboard' className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'>
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <Link to='/auth/sign-in'>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition-colors duration-200 text-base'>
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (visible on mobile, hidden on desktop) */}
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
            >
              <span className='sr-only'>Open main menu</span>
              {isMobileMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {isSignedIn ? (
              <>
                <Link
                  to='/'
                  className='text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  Home
                </Link>
                <Link
                  to='/dashboard'
                  className='text-gray-700 hover:bg-gray-100 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  Dashboard
                </Link>
                {/* UserButton in mobile menu for signed-in users */}
                <div className='block px-3 py-2'>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <Link
                to='/auth/sign-in'
                className='block w-full text-left' // Ensures button takes full width
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                <Button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition-colors duration-200 text-base w-full'>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
