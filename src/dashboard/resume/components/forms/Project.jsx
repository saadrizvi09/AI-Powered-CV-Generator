import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { toast } from 'sonner'
  
import GlobalApi from '../../../../../service/GlobalApi';
function Project() {
    
const [loading,setLoading]=useState(false);
const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
const params=useParams();
const [projectList,setProjectList]=useState([
  {
    ProjectName:'',
   
    description:''
  }
])
useEffect(()=>{
  resumeInfo?.project&&setProjectList(resumeInfo?.project)
},[])
  const handleChange=(event,index)=>{
    const newEntries=projectList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setProjectList(newEntries);
  }

  const AddNewProject=()=>{
    setProjectList([...projectList,
      {
        ProjectName:'',
        description:''
      }
    ])
  }
  const RemoveProject=()=>{
    setProjectList(projectList=>projectList.slice(0,-1))

  }
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        
          project:projectList.map(({ id, ...rest }) => rest)
        
      }
    }


    console.log(projectList)
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
        console.log(resp);
        setLoading(false)
        toast('Details updated !')
      },(error)=>{
        setLoading(false);
        console.log(error)
        toast('Server Error, Please try again!')
      })

  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      project:projectList.map(({ id, ...rest }) => rest)

    })
  },[projectList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Project</h2>
    <p>Add Your project details</p>

    <div>
      {projectList.map((item,index)=>(
        <div>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>Project Name</label>
              <Input name="ProjectName" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.ProjectName}
              />
            </div>
            
            <div className='col-span-2 '>
              <label>Description</label>
              <Textarea name="description" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.description} />
            </div>

          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewProject} className="text-primary"> + Add More project</Button>
            <Button variant="outline" onClick={RemoveProject} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}


export default Project
