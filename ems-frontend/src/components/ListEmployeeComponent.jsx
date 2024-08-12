import React,{useEffect, useState} from 'react'
import { deleteEmployee, getEmployeeById, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
   const [employees,setEmployees] = useState([])
   const navigator = useNavigate();

   useEffect(()=>{
    getAllEmployee();
   },[])
   
   function getAllEmployee(){
    listEmployees().then((response)=>{
        setEmployees(response.data);
        console.log(employees, "employees");
      }).catch(error=>{
        console.error(error);
      })
   }
// const address = employees[0]? `${employees[0].houseNumber}, ${employees[0].street}, ${employees[0].city}, ${employees[0].state}, ${employees[0].country}`
//   : 'N/A';
//   console.log(address);
  
   
   function addNewEmployee(){
    navigator("/add-employee");
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployee();
        }).catch(error =>  {
            console.error(error)
        })

    }


    return (
    <div className='container'>

            <h2 className='text-center'>List Of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <div className='scroll' style={{overflow:"scroll", height:'550px'}}>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Employee Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.houseNumber}, {employee.street},{employee.city},{employee.state},{employee.country}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => navigator(`/edit-employee/${employee.id
                                         }`)}>Edit</button>
                                    <button className='btn btn-danger ms-2' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                   {/* <button className='btn btn-info' onClick={()=> displayEmployee(employee.id)}>View</button> */}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
    </div>
  )
}

export default ListEmployeeComponent