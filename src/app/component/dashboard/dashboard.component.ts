import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/Model/employee';
import { EmployeesService } from 'src/app/Services/employee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    empDetail !: FormGroup;
    empObj : Employee = new Employee();
    empList : Employee[] = [];

  constructor(private FormBuilder : FormBuilder, private empService : EmployeesService) { }
  
  ngOnInit(): void {

    this.getAllEmployee();

    this.empDetail = this. FormBuilder.group({
      id: [''],
      name : [''],
      departement : [''],
      email : [''],
      phone : ['']
    });

  }

  addEmploye(){
    console.log(this.empDetail);
    
  }

  addEmployee(){
    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.department = this.empDetail.value.title;
    this.empObj.phone = this.empDetail.value.phone;

    this.empService.addEmployee(this.empObj).subscribe(res=> {
      console.log(res);
      this.getAllEmployee();
    }, err=> {
      console.log(err);
    });
   
  }

getAllEmployee(){
  this.empService.getAllEmployee().subscribe( res=> {
    this.empList = res;
  }, err=>{
    console.log('error while feching data.')
    

  });  
}

 editEmployee(emp : Employee ) {
  this.empDetail.controls['id'].setValue(emp.id);
  this.empDetail.controls['name'].setValue(emp.name);
  this.empDetail.controls['email'].setValue(emp.email);
  this.empDetail.controls['department'].setValue(emp.department);
  this.empDetail.controls['phone'].setValue(emp.phone);
} 

updateEmployee() {
  this.empObj.id = this.empDetail.value.id;
  this.empObj.name = this.empDetail.value.name;
  this.empObj.email = this.empDetail.value.email;
  this.empObj.department = this.empDetail.value.title;
  this.empObj.phone = this.empDetail.value.phone;
  this.empService.updateEmployee(this.empObj).subscribe(res=>{
    console.log(res);
    this.getAllEmployee();    
  },err=>{
    console.log(err);
    
  })
}
}

