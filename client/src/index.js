import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const GENDER_DEFAULT='';
const EMPID_DEFAULT=0;
const FIRSTNAME_DEFAULT='';
const SURNAME_DEFAULT='';
const EMAIL_DEFAULT = '';
const DOB_DEFAULT='';
const HIDE_EMPID_DEFAULT=true;
const STATUS_DEFAULT='Create New Employee';
const BUTTON_STATE_DEFAULT = 'Create';
const EMAIL_ERROR_DRFAULT='';

ReactDOM.render(

  <React.StrictMode>
    <App gender={GENDER_DEFAULT}  empId={EMPID_DEFAULT}  firstName={FIRSTNAME_DEFAULT}  surName={SURNAME_DEFAULT} email={EMAIL_DEFAULT} dob={DOB_DEFAULT}  hideEmpId={HIDE_EMPID_DEFAULT}  status={STATUS_DEFAULT}  buttonState={BUTTON_STATE_DEFAULT}  emailError={EMAIL_ERROR_DRFAULT}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
