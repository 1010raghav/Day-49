let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList= getEmployeePayrollDataStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataStorage=()=>{
    return localStorage.getItem('EmployeePayrollList')?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
                    
    let innerHtml = `${headerHtml}`;
    //let empPayrollList = createEmployeePayrollJSON();
    for(const employeePayrollData of empPayrollList){
        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" alt="" src="${employeePayrollData._profilePic}" alt= ""></td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${getDeptHtml(employeePayrollData._department)}</td>
                <td>${employeePayrollData._salary}</td>
                <td>${stringifyDate(employeePayrollData._startDate)}</td>
                <td>
                    <img id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="delete1.png">
                    <img id="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="edit.png">
                </td>
            </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml
}


const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Raghavendra Wandre',
            _gender: 'Male',
            _department: [
                'Engineering'
            ],
            
            _salary: '500000',
            _startDate: '1 Oct 2020',
            _note: " ",
            _id: new Date().getTime(),
            _profilePic: 'profile2.jfif'
        },
        {
            _name: 'Pratham Khedwan',
            _gender: 'Male',
            _department: [
                'HR'
            ],
            
            _salary: '400000',
            _startDate: '1 Oct 2020',
            _note: " ",
            _id: new Date().getTime(),
            _profilePic: 'profile3.jfif'
        },
    ];
    return empPayrollListLocal;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}
const remove= (node)=> {
    let employeePayrollData=empPayrollList.find(empData => empData._id == node.id);
    if(!employeePayrollData)return;
    const index = empPayrollList
                    .map(empData=> empData._id)
                    .indexOf(employeePayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}

const update=(node)=>{
    let employeePayrollData=empPayrollList.find(empData => empData._id == node.id)
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}