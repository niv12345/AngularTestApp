import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
class UserToken{}
export class Permissions {
  canGoToRoute(user: UserToken): boolean {
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router:Router,            
             private permissions:Permissions,
             private apiService:ApiService) { }

  canActivate(route:ActivatedRoute, 
             state:RouterStateSnapshot,
             router: ActivatedRouteSnapshot
            ){
   const currentUser = this.apiService.currentUser;  
   if(this.apiService.isLoggedIn()){
    return this.permissions.canGoToRoute(currentUser);
   }
   this.router.navigate(['/login'],{ queryParams: { returnUrl: state.url}});
   return false;
 
  }
}
