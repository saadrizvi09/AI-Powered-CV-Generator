import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className=' font-bold text-sm mb-2'
      style={{
        color:resumeInfo?.themeColor
    }}
    >PROJECTS</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    {resumeInfo?.project.map((project,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
                
            >{project.ProjectName}</h2>
           
            <p className='text-xs my-2'>
                {project?.description}
            </p>
        </div>
    ))}

    </div>
  )
}

export default EducationalPreview