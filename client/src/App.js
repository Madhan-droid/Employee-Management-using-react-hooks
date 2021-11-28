import './App.css';
import { useState} from "react";
import validator from 'validator';
import Axios from 'axios';

function App() {
  const [empId, setEmpId] = useState('');
  const [firstName, setfirstName] = useState("");
  const [surName, setsurName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState("");
  const [buttonState , setButtonState] = useState('Create');
  const [status , setStatus] = useState('Create new Employee');
  const [hideEmpId , setHideEmpId] = useState(true);

  const readUpdateDeleteEmp = (mode) => {
    clearFields();
    switch(mode){
      case 'Read':
        setStatus( 'Read Existing Employee');
        setButtonState("Read");
        break;
       case 'Update' :
         setStatus("Update Existing Employee");
         setButtonState("Update");
         break;
       case 'Delete':
         setStatus( "Delete Existing Employee");
         setButtonState("Delete");
         break;  
       default:
         setStatus('Create New Employee');
         setButtonState("Create");
         setHideEmpId(true);
    } 
  }

const clearFields = () =>{
  setEmpId('');
  setfirstName("");
  setsurName("");
  setEmail("");
  setDob('');
  setGender("");
  setHideEmpId(false);
}
  
const createEmp =() =>{
Axios.post('http://localhost:3000/employees', {
 empId : empId,
 firstName: firstName,
 surName:surName, 
 email:email,
 dob: dob,
 gender: gender
})
.then(()=>{
  alert(`Employee ${firstName+' '+surName} created successfully`);
});
};

const readEmp =() =>{
  Axios.get('http://localhost:3000/employees/'+empId).then((res)=>{
  console.log(res);
  setfirstName(res.data.firstName);
  setsurName(res.data.surName);
  setEmail(res.data.email);
  setDob(res.data.dob);
  setGender(res.data.gender);
},
(error) => {
console.log(error);
})
}
const updateDelEmployee = () =>{
  switch(buttonState){
    case 'Update' :
      Axios.put(('http://localhost:3000/employees/'+empId),{
           firstName,surName,email,dob,gender }).then((res)=>{
             console.log(res);
             },
            (error) => {
            console.log(error);
           })
          break;
  case 'Delete' :
      Axios.delete('http://localhost:3000/employees/'+empId).then((res)=>{
        console.log(res);
         },
         (error) => {
             console.log(error);
          })
         break;
  default:
      createEmp();
}}

const wrapperFunction = ( ) => {
  if ( buttonState !== 'Delete') {
       if(validator.isEmail(email))
          {
             updateDelEmployee();
           } 
        else {
             alert("Incorrect email");
           }}
else{
  updateDelEmployee();
}};


const showButtonUp = hideEmpId ?{display :'none'} :{display:'block' ,float:'right'};
const showButtonDown = buttonState==='Read' ? {display:'none' }: {display:'block' ,float:'right'};
  return (
    <div className="App">
      <div className="App-header">
        
        <h1>Employee Management </h1> <hr />
        <button onClick={readUpdateDeleteEmp.bind(this,'Create')} >Create</button>
        <button onClick={readUpdateDeleteEmp.bind(this,'Read')} >Read</button>
        <button onClick={readUpdateDeleteEmp.bind(this,'Update')} >Update</button>
        <button onClick={readUpdateDeleteEmp.bind(this,'Delete')} >Delete</button> <hr />
       <br /> 
       <div className='Status-Updater'>
       <p>{status}</p>   
       <hr />
       </div>
       </div>
       <div className='information'>
              
       <table>
        <tbody>
      <tr>
      <td> 
        <label> Employee ID  : </label>
        </td>
      <td>
        <input type="text" value={empId} onChange={(event)=>{
          setEmpId(event.target.value);
        }}/>
        </td>
        
      </tr>
      </tbody>
      <tbody>
      <tr>
             <td></td>
             <td style={showButtonUp}><input type='button' value='Read'  onClick={readEmp} /></td>
           </tr>  
        </tbody>
      <tbody>
      <tr>
      
      <td> 
        <label> First Name   : </label>
        </td>
      <td>
        <input type="text" value={firstName} onChange={(event)=>{
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
        <input type="text" value={surName} onChange={(event)=>{
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
        <input type="text" value={email} onChange={(event)=>{
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
        <input type="date" value={dob} onChange={(event)=>{
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
        <input style={{fontSize:20}} type="radio" value='Male' onChange={(event)=>{
          setGender(event.target.value);
        }}/>
        <label> Male </label>
        <input type="radio" value="Female"  onChange={(event)=>{
          setGender(event.target.value); 
        }}/>
        <label> Female</label>
        </td>
      </tr>
      </tbody>
      <tbody>
        <tr>
          <td></td>
          <td>
          <input type='button'  style={showButtonDown} value={buttonState  } onClick={ wrapperFunction } />
          </td>
        </tr>
      </tbody>
     </table>
      </div>
    </div>
  );
}

export default App;
