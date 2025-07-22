import React, { useEffect, useState } from 'react';
import AddResume from './components/addResume.jsx';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi.js';
import ResumeCardItem from './components/ResumeCardItem.jsx';
import { Loader2Icon } from 'lucide-react'; // Import Loader2Icon for loading state

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  // Function to fetch resumes list for the particular user
  const GetResumesList = () => {
    setLoading(true); // Set loading to true before fetching data
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        console.log(res.data);
        setResumeList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
        // Optionally show an error message to the user
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      });
  };

  // Effect hook to call GetResumesList when user object is available
  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  return (
    // Main container with improved padding and max-width for alignment
    <div className='p-8 md:p-10 lg:p-12 max-w-7xl mx-auto'>
      {/* Dashboard Title and Description */}
      <h2 className='font-extrabold text-4xl md:text-5xl text-gray-900'>My CVs</h2>
      <p className='text-lg md:text-xl text-gray-600 mt-2 mb-10'>
        Generate and manage your professional CVs with AI assistance.
      </p>

      {/* Grid Layout for Resume Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {/* Always display the AddResume component */}
        <AddResume />

        {/* Loading State: Display skeletons while data is being fetched */}
        {loading ? (
          // Render skeleton cards
          Array(4).fill(0).map((_, index) => ( // Display 4 skeleton loaders
            <div key={index} className='bg-gray-200 rounded-xl shadow-md h-72 animate-pulse'>
              <div className='h-[calc(100%-60px)] rounded-t-xl bg-gray-300'></div> {/* Top section placeholder */}
              <div className='h-[60px] rounded-b-xl bg-gray-300 p-4 flex items-center justify-between'> {/* Bottom section placeholder */}
                <div className='h-4 w-3/4 bg-gray-400 rounded'></div>
                <div className='h-5 w-5 bg-gray-400 rounded-full'></div>
              </div>
            </div>
          ))
        ) : (
          // Data Loaded: Display actual resumes or an empty state message
          <>
            {resumeList.length > 0 ? (
              // Map through the resume list and render ResumeCardItem for each
              resumeList.map((resume, index) => (
                <ResumeCardItem
                  resume={resume}
                  key={index}
                  refreshData={GetResumesList} // Pass refreshData to allow child to re-fetch list
                />
              ))
            ) : (
              // Empty State: Message when no resumes are found
              <div className='col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500'>
                <Notebook className='h-16 w-16 mb-4 text-gray-400' />
                <p className='text-xl font-medium'>No CVs found!</p>
                <p className='mt-2 text-md'>Click 'Add New Resume' to create your first CV.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;