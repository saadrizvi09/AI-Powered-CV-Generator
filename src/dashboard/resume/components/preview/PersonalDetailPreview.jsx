import { Phone } from 'lucide-react'
import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='font-bold text-2xl '
        style={{
            color:resumeInfo?.themeColor
        }}
        >
            {resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
       
       

        <div className='flex gap-3 mt-2'>
            <h2 className='font-normal text-xs'
             >{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs'
             >{resumeInfo?.email}</h2>

        </div>
        <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor
        }}
        />
    </div>
  )
}

export default PersonalDetailPreview