import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StudentsService } from '../../Services/students.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,HttpClientModule],
  providers:[StudentsService],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit{
  searchedID: any;
  state: any;
  statesearchedID: any;

  constructor(private stdService: StudentsService ,private router:Router) {}
  
  async ngOnInit(): Promise<void> {
    try {
      const data = await this.stdService.getAllStudents();
      this.state = data;
      this.statesearchedID = data;
    } catch (error) {
      console.error(error);
    }
  }

  getsearch(ev: any) {
    this.searchedID = ev.target.value; //letters written in search bar
    this.statesearchedID = this.state.filter((el: any) => el.id === +this.searchedID);
 
    if (this.statesearchedID.length === 1) {
      this.router.navigate([`/search/${this.statesearchedID[0].id}`]); // Navigate to '/search' route
    }else if(this.statesearchedID.length ==0){
      this.router.navigate(['/notfound']);
    }else {}
  }

 


}