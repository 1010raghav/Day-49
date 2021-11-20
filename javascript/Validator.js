window.addEventListener('DOMContentLoaded', () => {
    validateName();
    salaryOutput();
    validateDate();
});


function salaryOutput(){
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
}

function validateName(){
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if (name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollJsData()).name = name.value;
            textError.textContent = "";
        }
        catch(e){
            console.error(e);
            textError.textContent = e;
        }
    }); 
}

function validateDate(){
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
  
    day.addEventListener('input', checkDate);
    month.addEventListener('input', checkDate);
    year.addEventListener('input', checkDate);
}

function checkDate() {
    const dateError = document.querySelector('.date-error');
    try {
      let date = day.value + " " + month.value + " " + year.value;
      (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
}

let isUpdate = false;

const save = () => {
    try{
        let employeePayrollData = createEmployeePayrollObject();
        createAndUpdateStorage(employeePayrollData);       
    }
    catch(e){
        return;
    }
}

const createEmployeePayrollObject = () => {
    let employeePayrollData = new EmployeePayrollJsData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }
    catch(e){
        setTextValue('.text-error', e);
        throw e;
    }
    
    employeePayrollData.profilePic = getSelectedValues('[name=profile').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#note');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems =[];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
} 

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

//UC-4
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    } else{
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

//UC-5
const resetform = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes','');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
      item.checked = false;
    });
}

const setTextValue = (id, value) => {
    let textError = document.querySelector(id);
    textError.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}