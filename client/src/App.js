import './App.css';
import { useState} from "react";
import Axios from 'axios';

function App() {
  const [empId, setEmpId] = useState(0);
  const [firstName, setfirstName] = useState("");
  const [surName, setsurName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(0);
  const [gender, setGender] = useState("");

  
const createEmp =() =>{
  console.log(empId);
Axios.post('http://localhost:3000/employees', {
  empId : empId,
 firstName: firstName,
 surName:surName, 
 email:email,
 dob: dob,
 gender: gender
})
.then(()=>{
  console.log("success");
});
};

const readEmp =() =>{
  Axios.get('http://localhost:3000/employees/'+empId).then((res)=>{
  console.log(res);
},
(error) => {
console.log(error);
})
}
const updateEmp = () =>{
   Axios.put(('http://localhost:3000/employees/'+empId),{
    firstName,surName,email,dob,gender }).then((res)=>{
  console.log(res);
},
(error) => {
console.log(error);
})

}
const deleteEmp =() =>{
  Axios.delete('http://localhost:3000/employees/'+empId).then((res)=>{
  console.log(res);
},
(error) => {
console.log(error);
})
}  
  return (
    <div className="App">
      <div className="App-header">
        
        <h1>Employee Management </h1> <hr />
        <button onClick={createEmp} >Create</button>
        <button onClick={readEmp} >Read</button>
        <button onClick={updateEmp} >Update</button>
        <button onClick={deleteEmp} >Delete</button> <hr />
       <br /> <hr />
       </div>
       <div className='information'>
       <table>
        <tbody>
      <tr>
      <td> 
        <label> Employee ID  : </label>
        </td>
      <td>
        <input type="text" onChange={(event)=>{
          setEmpId(event.target.value);
        }}/>
        </td>
        
      </tr>
      </tbody>
      <tbody>
      <tr>
      
      <td> 
        <label> First Name   : </label>
        </td>
      <td>
        <input type="text" onChange={(event)=>{
          setfirstName(event.target.value);
        }}/>
        </td>
        
      </tr>
      </tbody>
      <tbody>
      <tr>
      <td> 
        <label> Last Name  :</label>
        </td>
      <td>
        <input type="text" onChange={(event)=>{
          setsurName(event.target.value);
        }}/>
        </td>
      </tr>
      </tbody>
      <tbody><tr>
      <td> 
        <label> E-Mail  :</label>
        </td>
      <td>
        <input type="text" onChange={(event)=>{
          setEmail(event.target.value);
        }}/>
        </td>
      </tr>
      </tbody>
      <tbody><tr>
      <td> 
        <label> DOB  :</label>
        </td>
      <td>
        <input type="date" onChange={(event)=>{
          setDob(event.target.value);
        }}/>
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
      <td> 
        <label> Gender  :</label>
        </td>
      <td>
        <input style={{fontSize:20}} type="radio" onChange={(event)=>{
          setGender(event.target.value);
        }}/>
        <label> Male </label>
        <input type="radio" value="Female" onChange={(event)=>{
          setGender(event.target.value);
        }}/>
        <label> Female</label>
        </td>
      </tr>
      </tbody>
            </table>
      </div>
    </div>
  );
}

export default App;
