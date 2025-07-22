import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../service/GlobalApi.js';
import { Download, Loader2 } from 'lucide-react';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, [resumeId]);

  const GetResumeInfo = () => {
    setLoading(true);
    GlobalApi.GetResumeById(resumeId)
      .then(resp => {
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      })
      .catch(error => {
        console.error("Error fetching resume info:", error);
        // Implement a toast or user-friendly error message here if needed
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
      {/* Main container for the entire page, with background and min-height */}
      <div className="bg-gray-50 min-h-screen">

        {/* This div will wrap all non-printable elements (Header and Download Button area) */}
        <div id="non-printable-content">
          <Header /> {/* Header is now inside this non-printable wrapper */}

          {/* Download Button Area: No background or shadow now, just the button centered. */}
          <div className='my-8 md:my-10 lg:my-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-center py-4'> {/* Added py-4 for vertical spacing around the button */}
              <Button
                onClick={HandleDownload}
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-lg'
              >
                <Download className='h-6 w-6' /> Download Your Resume
              </Button>
            </div>
          </div>
        </div> {/* End of #non-printable-content */}


        {/* Resume Preview Section: This is the main printable area. */}
        {/* Top margin is now 0 to bring it closer to the button above. */}
        <div className='mt-0 mb-10 md:mt-0 lg:mt-0 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div
            id="print-area"
            className="bg-white p-6 rounded-lg shadow-xl"
            style={{ width: '794px', minHeight: '1123px', margin: '0 auto' }} // A4 dimensions applied here
          >
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="ml-4 text-gray-600 text-lg">Loading Resume...</p>
              </div>
            ) : resumeInfo ? (
              <ResumePreview />
            ) : (
              <div className="flex justify-center items-center h-96 text-gray-500 text-lg">
                <p>Resume not found or failed to load.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Essential Print Styles and Animations (keep this in your main CSS or a global style block) */}
      <style jsx>{`
        /* Essential Print Styles */
        @media print {
          /* Hide the entire non-printable content wrapper */
          #non-printable-content {
            display: none !important;
          }
          /* Reset body styles for clean printing */
          body {
            background-color: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Ensure the print area fills the page and looks clean */
          #print-area {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important; /* Important for printing: let the printer fit to page */
            height: auto !important; /* Allow content to flow to new pages */
            min-height: unset !important; /* Override screen's min-height for print */
            box-sizing: border-box !important; /* Include padding/border in width */
          }
        }
      `}</style>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;