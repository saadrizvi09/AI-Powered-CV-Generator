import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger, // IMPORTANT: Import DialogTrigger
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate = () => {
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        };

        GlobalApi.CreateNewResume(data).then(resp => {
            if (resp) {
                setLoading(false);
                toast.success('New CV created successfully!');
                setOpenDialog(false); // Close dialog on success
                setResumeTitle(''); // Clear title after successful creation
                navigation('/dashboard/resume/' + resp.data.data.documentId + '/edit');
            }
        }, (error) => {
            setLoading(false);
            console.error("Error creating new resume:", error);
            toast.error('Failed to create CV. Please try again.');
        });
    };

    return (
        // Wrap the clickable div with DialogTrigger.
        // `asChild` prop ensures that DialogTrigger passes its props to its child (your div)
        // instead of rendering its own button.
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <div className='
                    p-6 flex flex-col items-center justify-center
                    border-2 border-dashed border-gray-300 rounded-xl
                    h-[320px]
                    bg-gradient-to-br from-gray-50 to-gray-100
                    hover:scale-105 transition-all hover:shadow-lg cursor-pointer
                    text-gray-500 hover:text-gray-700'
                    // Removed onClick={() => setOpenDialog(true)} as DialogTrigger now handles opening
                >
                    <PlusSquare className='h-16 w-16 mb-4' />
                    <h2 className='text-xl font-semibold'>Add New CV</h2>
                </div>
            </DialogTrigger>

            {/* DialogContent: Added className="[&>button]:hidden" to hide the default close button 'x' */}
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>Create a New CV</DialogTitle>
                    <DialogDescription>
                        <p className='mb-2'>Add a title for your CV.</p>
                        <Input
                            className='my-2'
                            placeholder='e.g., Full Stack Developer CV'
                            onChange={(e) => setResumeTitle(e.target.value)}
                            value={resumeTitle}
                            disabled={loading}
                        />
                    </DialogDescription>
                </DialogHeader>

                {/* Action buttons for the dialog */}
                <div className='grid grid-cols-2 gap-3 mt-4'>
                    <Button
                        onClick={onCreate}
                        disabled={!resumeTitle.trim() || loading}
                        className='w-full'
                    >
                        {loading ? <Loader2 className='animate-spin mr-2' /> : 'Create'}
                    </Button>
                    <Button
                        onClick={() => {
                            // This line correctly sets the dialog's state to closed
                            setOpenDialog(false);
                            setResumeTitle(''); // Clear title on cancel
                        }}
                        variant='outline'
                        className='w-full'
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddResume;