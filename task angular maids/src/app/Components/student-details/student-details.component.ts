import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../Services/students.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [HttpClientModule],
  providers:[StudentsService],
  templateUrl: './student-details.component.html',
  styleUrl:`./student-details.component.css`
})
export class StudentDetailsComponent implements OnInit {
  ID:any;
  Student:any;
  constructor(myActivated:ActivatedRoute, private StdServ:StudentsService){
    this.ID = myActivated.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.StdServ.getStudentByID(this.ID).subscribe({
      next:(response:any)=>{
        this.Student = response.data;
      },
      error:(err)=>{console.log(err)}
    });
  }
}
