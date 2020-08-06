import { Component, OnInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,AfterContentInit{
   currentUser;
   isLogin:boolean;
  constructor(private myApi :ApiService) { }

  ngOnInit(): void {
   
    
  }
  ngAfterContentInit(): void {
    this.isLogin = this.myApi.isLoggedIn();  
    this.myApi.currentUser.subscribe(res =>{
      if(res){
      this.currentUser = res.name;
      }
    });
 
    
  }



}
