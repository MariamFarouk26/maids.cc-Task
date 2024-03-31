import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../Services/students.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HttpClientModule],
  providers:[StudentsService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  ID:any;
  Student:any;
  
  constructor( private myActivated:ActivatedRoute, private StdServ:StudentsService){}

  ngOnInit(): void {
    this.myActivated.params.subscribe(params => {
      this.ID = params['id'];
      
    this.StdServ.getStudentByID(this.ID).subscribe({
      next:(response:any)=>{
        this.Student = response.data;
      },
      error:(err)=>{console.log(err)}
    });
    });
  }
}

