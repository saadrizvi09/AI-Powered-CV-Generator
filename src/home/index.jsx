import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, Lightbulb, Download } from 'lucide-react'; // Icons for features

function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col'>
      {/* Header component */}
      <Header />

      {/* Hero Section */}
      <section className='flex-1 flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight animate-fade-in-up'>
            Craft Your Perfect CV with <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700'>AI Power</span>
          </h1>
          <p className='mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto animate-fade-in-up delay-200'>
            Generate compelling summaries for your resume and experience sections tailored to any job description, effortlessly.
          </p>
          <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400'>
            <Link to='/dashboard'>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105'>
                Start Building Your CV
              </Button>
            </Link>
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white shadow-inner'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12'>Key Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {/* Feature 1: AI Summary Generation */}
            <div className='bg-gray-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-105'>
              <Sparkles className='h-12 w-12 text-blue-500 mb-4' />
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>AI-Powered Summaries</h3>
              <p className='text-gray-600'>Generate concise and impactful summaries for your entire resume or specific experience sections using advanced AI.</p>
            </div>

            {/* Feature 2: Job Description Matching */}
            <div className='bg-gray-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-105'>
              <Lightbulb className='h-12 w-12 text-purple-500 mb-4' />
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Tailored Content</h3>
              <p className='text-gray-600'>Input job descriptions to get AI-generated content that aligns perfectly with what recruiters are looking for.</p>
            </div>

            {/* Feature 3: Easy Download */}
            <div className='bg-gray-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-105'>
              <Download className='h-12 w-12 text-green-500 mb-4' />
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>Instant Downloads</h3>
              <p className='text-gray-600'>Download your perfectly crafted resume in professional, print-ready formats.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-6'>Ready to Land Your Dream Job?</h2>
          <p className='text-lg mb-8'>
            Stop struggling with resume writing. Let our AI give you the edge you need.
          </p>
          <Link to='/dashboard'>
            <Button className='bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105'>
              Create Your Free CV Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Optional: Footer */}
      <footer className='py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600 bg-gray-100'>
      </footer>

      {/* Tailwind CSS keyframes for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export default Home;
