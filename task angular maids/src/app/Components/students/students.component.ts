import { Component, OnInit ,ViewChild} from '@angular/core';
import { StudentsService } from '../../Services/students.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [HttpClientModule,RouterModule,MatPaginatorModule,CommonModule, NgxPaginationModule],
  providers:[StudentsService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  constructor(private stdServ:StudentsService){}

  Students:any = [];
  totalpages:any;
  paginationNumbers:any;

async ngOnInit(): Promise<void> {
      try {
       await this.stdServ.getAllStudents();
        this.totalpages = this.stdServ.TotalPage;
        this.paginationNumbers = Array.from({ length: this.totalpages }, (_, i) => i + 1);
      } catch (error) {
        console.error(error);
      }
    
    this.onPageClick(1);
  }

  onPageClick(pageNumber:any){
    this.stdServ.getStudents(pageNumber).subscribe({
      next:(data)=>{
        this.Students = data;
      },
      error:(err)=>{console.log(err)}
    })
  }
 
}
