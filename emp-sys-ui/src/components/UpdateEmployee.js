import React,{useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployee = () => {

  const {id} = useParams();

 const navigate = useNavigate();

  const [employee,setEmployee] = useState({
    id:id,
    firstName:"",
    lastName:"",
    emailId:""
});

const handleChange =(e)=>{

    const value =e.target.value;
    setEmployee({...employee,[e.target.name]: value});

};

useEffect(() => {
const fetchData = async ()=>{
    try {
        
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
        
    } catch (error) {
        console.log(error);
    }
};
  fetchData();
}, []);


    const upadateEmployee = (e)=>{
        e.preventDefault();
        EmployeeService.upadateEmployee(employee,id)
        .then((response)=>{
            navigate("/employeeList");
        }).catch((error)=>{
            console.log(error);
        })
    };

  return (
    <div className='flrx max-w-2xl mx-auto shadow border-0'>
        <div className='px-8 py-8'>
            <div className='font-thin text-2xl tracking-wider'>
                <h1>Edit Employee</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                <input type="text" name='firstName' value={employee.firstName} onChange={(e)=>handleChange(e)} className='h-10 w-96 border px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                <input type="text" name='lastName' value={employee.lastName} onChange={(e)=>handleChange(e)} className='h-10 w-96 border px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='block text-gray-600 text-sm font-normal'>Email</label>
                <input type="email" name='emailId'  value={employee.emailId} onChange={(e)=>handleChange(e)} className='h-10 w-96 border px-2 py-2'></input>
            </div>
            <div className='items-center justify-center h-14 w-full my-4 space-x-2 pt-2'>
                <button onClick={upadateEmployee} className='rounded text-white font-semibold bg-green-400 hover:bg-green-800 px-1 py-1'>Update</button>
                <button onClick={()=>navigate("/employeeList")}  className='rounded text-white font-semibold bg-red-400 hover:bg-red-800 px-1 py-1'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateEmployee;