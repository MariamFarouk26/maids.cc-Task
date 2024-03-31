
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {


 TotalPage:any;
 pages:any[]=[];
 pageRequests:any[]=[];

 private API_URL = "https://reqres.in/api/users";
 

 constructor(private http:HttpClient) { }

 getStudents(page: number){
   return this.http.get(`${this.API_URL}?page=${page}`).pipe(
     map((response: any) => {
         this.TotalPage = response.total_pages;
       return response.data;
     })
   );
 }


async getAllStudents() {
    const response: any = await this.http.get(`${this.API_URL}?page=1`).toPromise();
    this.TotalPage = response.total_pages;
    const requests = [];
    for (let index = 1; index <= this.TotalPage; index++) {
      requests.push(this.getStudents(index).toPromise());
    }
    const data = await forkJoin(requests).toPromise();
    const allStudents = data?.reduce((acc: any[], current: any) => acc.concat(current), []);
    return allStudents;
  
}

  getStudentByID(id:any){
    return this.http.get(`${this.API_URL}/${id}`);
  }

}
