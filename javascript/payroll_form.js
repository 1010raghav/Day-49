let isUpdate = false;
let employeePayrollObj ={};


window.addEventListener('DOMContentLoaded', (event) =>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function() {
        if(name.value.lenght==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;;
            textError.textContent="";
        } catch (e){
            textError.textContent=e;
        }
    });

    const salary = document.querySelector('#salary');
    const output= document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function(){
        output.textContent=salary.value;
    });

    checkForUpdate();
    
});

const save= () => {
    try{
        let EmployeePayrollData= createEmployeePayroll();
        createAndUpdateStorage(EmployeePayrollData);
    }catch(e){
        return;
    }
}

const createEmployeePayroll= () => {
    let EmployeePayrollData = new EmployeePayrollData();
    try{
        EmployeePayrollData.name= getInputValueById('#name');
    }catch(e) {
        setTextValue('.text-error',e);
        throw e;
    }

    EmployeePayrollData.profilePic= getSelectedValues('[name=profile]').pop();
    EmployeePayrollData.gender= getSelectedValues('[name=gender]').pop();
    EmployeePayrollData.department= getSelectedValues('[name=department]');
    EmployeePayrollData.salary= getInputValues('#salary');
    EmployeePayrollData.note= getInputValues('#notes');

    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    EmployeePayrollData.date = Date.parse(date);
    alert(EmployeePayrollData.toString());
    return EmployeePayrollData;

}   

const getSelectedValues=(propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}


const getInputValueById=(id) =>{
    let value=document.querySelectorAll(id).value;
    return value;
}

const getInputElementValue= (id) =>{

    let value=document.getElementById(id).value;
    return value;
}

const checkForUpdate=() =>{
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate =employeePayrollJson ? true : false;
    employeePayrollObj= JSON.parse(employeePayrollJson);
    setForm();
}