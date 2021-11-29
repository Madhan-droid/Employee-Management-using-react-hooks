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
  const [create , setCreate] = useState(false);
  const [read , setRead] = useState(false);
  const [update , setUpdate] = useState(false);
  const [deletee , setDltee] = useState(false);

  const readUpdateDeleteEmp = (mode) => {
    clearFields();
    switch(mode){
      case 'Read':
        setStatus( 'Read Existing Employee');
        setButtonState("Read");
        setRead(true);
        break;

       case 'Update' :
         setStatus("Update Existing Employee");
         setButtonState("Update");
         setUpdate(true);
         break;

       case 'Delete':
         setStatus( "Delete Existing Employee");
         setButtonState("Delete");
         setDltee(true);
         break;
           
       default:
         setStatus('Create New Employee');
         setButtonState("Create");
         setHideEmpId(true);
         setCreate(true);
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
  setCreate(false);
  setRead(false);
  setUpdate(false);
  setDltee(false);
}
  
const createEmp =() =>{
Axios.post('http://localhost:3000/employees', {
 empId : empId,
 firstName: firstName,
 surName:surName, 
 email:email,
 dob: dob,
 gender: gender
}).then((res)=>{
  console.log(res);
  alert(`Employee ${firstName+' '+surName} created successfully`);
},(error) => {
  alert("Employee Id does not exist");
  console.log(error);
})
};

const readEmp =() =>{
  Axios.get('http://localhost:3000/employees/'+empId).then((res)=>{
  console.log(res);
  setfirstName(res.data.firstName);
  setsurName(res.data.surName);
  setEmail(res.data.email);
  setDob(res.data.dob);
  setGender(res.data.gender);
},(error) => {
console.log(error);
})
}
const updateDelEmployee = () =>{
  switch(buttonState){
    case 'Update' :
      Axios.put(('http://localhost:3000/employees/'+empId),{
           firstName,surName,email,dob,gender }).then((res)=>{
             console.log(res);
             alert('Employee updated successfully');
             },
            (error) => {
            console.log(error);
           })
          break;

  case 'Delete' :
      Axios.delete('http://localhost:3000/employees/'+empId).then((res)=>{
        console.log(res);
        alert('Employee deleted successfully');
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
const createButtonActive = create ? "CreateButton" : " ";
const readButtonActive = read ? "ReadButton" : " ";
const updateButtonActive = update ? "UpdateButton" : " ";
const deleteButtonActive = deletee ? "DeleteButton" : " ";
      
return (
    <div className="App">
      <div className="App-header">
        <h1>Employee Management </h1> 
        <h3>Open Book Assignment by Madhan Kumar T</h3>
        <button className={createButtonActive} onClick={readUpdateDeleteEmp.bind(this,'Create')} >Create</button>
        <button className={readButtonActive} onClick={readUpdateDeleteEmp.bind(this,'Read')} >Read</button>
        <button className={updateButtonActive} onClick={readUpdateDeleteEmp.bind(this,'Update')} >Update</button>
        <button className={deleteButtonActive} onClick={readUpdateDeleteEmp.bind(this,'Delete')} >Delete</button> <hr />
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
            <label for='myEmpId'>Employee ID  :</label>
         </td>
         <td>
        <input type="text" value={empId} id='myEmpId' onChange={(event)=>{
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
        </table><hr />
        <table>
      <tbody>
      <tr>
      <td> 
        <label for='myFirstName'> First Name   : </label>
        </td>
      <td>
        <input type="text" value={firstName} id='myFirstName' onChange={(event)=>{
          setfirstName(event.target.value);
        }}/>
        </td>  
      </tr>
      </tbody>

      <tbody>
      <tr>
      <td> 
        <label for='myLastName'> Last Name  :</label>
        </td>
      <td>
        <input type="text" value={surName} id='myLastName' onChange={(event)=>{
          setsurName(event.target.value);
        }}/>
        </td>
      </tr>
      </tbody>

      <tbody><tr>
      <td> 
        <label for='myEmail'> E-Mail  :</label>
        </td>
      <td>
        <input type="email" value={email} id='myEmail' onChange={(event)=>{
          setEmail(event.target.value);
        }} required/>
        </td>
      </tr>
      </tbody>

      <tbody><tr>
      <td> 
        <label for='myDob'> DOB  :</label>
        </td>
      <td>
        <input type="date" value={dob} id='myDob' onChange={(event)=>{
          setDob(event.target.value);
        }}/>
        </td>
      </tr>
      </tbody>
      
      <tbody>
      <tr>
      <td> 
        <label for='myGender'> Gender  :</label>
        </td>
      <td>
        <input style={{fontSize:20}} type="radio" value='Male' id='myGender' checked={gender==='Male'} onChange={(event)=>{
          setGender(event.target.value);
        }}/>
        <label> Male </label>
        <input type="radio" value="Female" id='myGender' checked={gender==='Female'} onChange={(event)=>{
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
