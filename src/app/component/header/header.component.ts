import { Component, OnInit, AfterViewChecked, AfterContentChecked, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit ,AfterViewInit,AfterContentChecked{
  currentUser;
  isLogin: boolean;
  name;
  @ViewChild('myTemplateRef') myTemplate;
  constructor(private myApi: ApiService) { }

  ngOnInit(): void {
this.name = "NIV"
  }
  
  ngAfterContentInit(): void {
    this.isLogin = this.myApi.isLoggedIn();
    this.myApi.currentUser.subscribe(res => {
      if (res) {
        this.currentUser = res.name;
      }
    });
  }
  ngAfterContentChecked(): void {
    this.isLogin = this.myApi.isLoggedIn();
    this.myApi.currentUser.subscribe(res => {
      if (res) {
        this.currentUser = res.name;
      }
    });
  }
  ngAfterViewInit(): void {
       
    this.isLogin = this.myApi.isLoggedIn();
    this.myApi.currentUser.subscribe(res => {
      if (res) {
       
        this.myTemplate = res.name;
      }
    });
    
  }
}
