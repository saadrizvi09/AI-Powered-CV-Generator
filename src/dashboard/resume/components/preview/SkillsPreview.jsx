import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='font-bold text-sm mb-2'
      style={{
        color:resumeInfo?.themeColor
    }}
    >
      TECHNICAL SKILLS</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className='flex items-center justify-between'>
                <h2 className='text-xs'>◦{skill.name}</h2>
               
            </div>
        ))}
    </div>
    </div>
  )
}

export default SkillsPreview