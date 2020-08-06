import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../modal/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));   
    this.currentUser = this.currentUserSubject.asObservable();    
  }

  getPostList():Observable<any>{
    return this.http.get("/posts");
  }
  getPostDetails(id):Observable<any>{
    return this.http.get("/posts/"+id);
  }
  addPostData(body):Observable<any>{
    return this.http.post("/posts",body);
  }
  editPostData(postData):Observable<any>{
    return this.http.put("/posts/"+postData.id,postData);
  }
  deletePost(id):Observable<any>{   
    return this.http.delete("/posts/"+id);
  }
  login(username,password):Observable<any>{
  return this.http.post<any>(`http://localhost:4000/users/authenticate`, { username, password })
            .pipe(map(user => {            
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
  }
  register(user: User) {  
 
    return this.http.post(`http://localhost:4000/users/register`, user);
}
isLoggedIn(): boolean {
  if(localStorage.getItem("currentUser"))
  return true;
  else
  return false;
}
}
