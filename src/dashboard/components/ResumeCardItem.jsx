import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {

  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume Deleted!');
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      console.error("Error deleting resume:", error); // Added error logging
      toast.error('Failed to delete resume!'); // Added error toast
      setLoading(false);
    })
  }

  return (
    // Outer container for the resume card
    // Added 'group' for hover effects on child elements
    // Added shadow and transition for a modern, interactive feel
    <div className='group relative rounded-xl shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden'>
      {/* Link for the clickable resume preview area */}
      <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
        {/* Top section of the card with gradient background and icon */}
        <div
          className='relative p-14 h-72 rounded-t-xl overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-100 to-blue-100 border-t-4'
          style={{
            borderColor: resume?.themeColor || '#a855f7' // Use a default theme color if none is provided
          }}
        >
          {/* Subtle overlay effect on hover for the gradient area */}
          <div className='absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          {/* Container for the resume icon/image */}
          <div className='relative flex items-center justify-center h-[180px]'>
            <img 
              src="/cv.png" 
              width={90} 
              height={90} 
              alt="Resume Icon" 
              className='opacity-80 group-hover:opacity-100 transition-opacity duration-300' // Slightly larger icon, subtle hover opacity
            />
          </div>
        </div>
      </Link>
      {/* Bottom section of the card with resume title and actions dropdown */}
      <div
        className='p-4 flex items-center justify-between text-white rounded-b-xl shadow-lg' // Increased padding, aligned items vertically, consistent rounded bottom
        style={{
          background: resume?.themeColor || '#a855f7' // Use the same default theme color
        }}>
        {/* Resume Title */}
        <h2 className='text-base font-semibold truncate'>{resume.title}</h2> {/* Larger font, bolder, truncate for long titles */}

        {/* Dropdown Menu for actions */}
        <DropdownMenu>
          <DropdownMenuTrigger
            // Added padding, hover effect, and focus styles for better UX
            className='p-1 -mr-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-200'
          >
            <MoreVertical className='h-5 w-5 cursor-pointer' /> {/* Slightly larger icon */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className='z-50'> {/* Ensure dropdown is above other content */}
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Dropdown Menu Items */}
            <DropdownMenuItem onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>Download</DropdownMenuItem>
            {/* Delete option with red highlighting for emphasis */}
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className='text-red-600 focus:bg-red-50 focus:text-red-600'>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Alert Dialog for Delete Confirmation */}
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume
                and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}
                disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin mr-2' /> : 'Delete'} {/* Added margin-right to spinner */}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  )
}

export default ResumeCardItem