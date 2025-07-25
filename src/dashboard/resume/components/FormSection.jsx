import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid, View } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom';
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Project from './forms/Project';
import Skills from './forms/Skills';
const prompt='Job title: Full stack developer. Depending upon job title give me summary for my Job title: Full stack developer. Depending upon job title give me summary for my resume in 3-4 lines'
function FormSection() {
  const [enableNext,setEnableNext]=useState(false);
  const [activeFormIndex,setActiveFormIndex]=useState(1);
    const {resumeId}=useParams();

  return (
  <div>
    <div className='flex justify-between items-center'>
      <div className='flex gap-5'>
        <Link to={"/dashboard"}>
      <Button><Home/></Button>
      </Link>
     
      </div>
      <div className='flex gap-2'>
        {activeFormIndex>1
        &&<Button size="sm" 
        onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
        <Button disabled={!enableNext}
        className="flex gap-2" size="sm"
        onClick={()=>setActiveFormIndex(activeFormIndex+1) }
        > Next 
        <ArrowRight/> </Button>
      </div>
    </div>
          {activeFormIndex==1?  
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />:activeFormIndex==2?
        <Summary  enabledNext={(v)=>setEnableNext(v)}/>:activeFormIndex==3?
        <Experience enabledNext={(v)=>setEnableNext(v)}/> :activeFormIndex==4?
        <Project enabledNext={(v)=>setEnableNext(v)}/>: activeFormIndex==5?
        <Skills enabledNext={(v)=>setEnableNext(v)}/>:activeFormIndex==6?
      <Navigate to ={'/my-resume/'+resumeId+'/view'}/>:null}
      

   </div>
  )
}

export default FormSection
