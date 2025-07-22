import axios from "axios"
const API_KEY= import.meta.env.VITE_STRAPI_API_KEY
const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api/',
    headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }})
const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);
const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);
const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)
const UpdateResumeDetail2 = (id, data) => {
    return axiosClient.put(`/user-resumes/${id}`, {
      data: { // This is the required top-level 'data' wrapper
        // REMOVE THE 'userResumes' KEY HERE:
        experience: data.experience.map((exp) => ({
            ...(exp.id ? { id: exp.id } : {}), // Include 'id' for existing entries
            title: exp.title,
            companyName: exp.companyName,
            city: exp.city,
            state: exp.state,
            startDate: exp.startDate,
            endDate: exp.endDate,
            workSummary: exp.workSummary,
        })),
      },
    });
};

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+'?populate=*')

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

export default{
    CreateNewResume,GetUserResumes,
    UpdateResumeDetail,DeleteResumeById,GetResumeById,UpdateResumeDetail2
}

