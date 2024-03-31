import { Routes } from '@angular/router';
import { StudentsComponent } from './Components/students/students.component';
import { StudentDetailsComponent } from './Components/student-details/student-details.component';
import { ErrorComponent } from './Components/error/error.component';
import { SearchComponent } from './Components/search/search.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
    {path:"",redirectTo:'students',pathMatch:"full"},
    {path:"students",component:StudentsComponent},
    {path:"students/:id",component:StudentDetailsComponent},
    {path:"search/:id",component:SearchComponent},
    {path:"notfound",component:NotFoundComponent},
    {path:"**",component:ErrorComponent}
  
];
