import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const GENDER_DEFAULT='';
const EMPID_DEFAULT='';
const FIRSTNAME_DEFAULT='';
const SURNAME_DEFAULT='';
const EMAIL_DEFAULT = '';
const DOB_DEFAULT='';
const HIDE_EMPID_DEFAULT=true;
const STATUS_DEFAULT='Create New Employee';
const BUTTON_STATE_DEFAULT = 'Create';
const EMAIL_ERROR_DRFAULT='';
const CREATE_DEFAULT =false;
const READ_DEFAULT = false;
const UPDATE_DEFAULT =false;
const DELETE_DEFAULT = false;

ReactDOM.render(

  <React.StrictMode>
    <App gender={GENDER_DEFAULT}  empId={EMPID_DEFAULT}  firstName={FIRSTNAME_DEFAULT}  surName={SURNAME_DEFAULT} 
         email={EMAIL_DEFAULT} dob={DOB_DEFAULT}  hideEmpId={HIDE_EMPID_DEFAULT}  status={STATUS_DEFAULT} 
          buttonState={BUTTON_STATE_DEFAULT}  emailError={EMAIL_ERROR_DRFAULT}  create={CREATE_DEFAULT} read = {READ_DEFAULT}
          update={UPDATE_DEFAULT} deletee={DELETE_DEFAULT}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
