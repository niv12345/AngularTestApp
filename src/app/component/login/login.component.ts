import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService:ApiService) {
     }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
        username :['',Validators.required],
        password :['',Validators.required],
        remPassword :[false, Validators.requiredTrue]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
   
    this.apiService.login(this.f.username.value, this.f.password.value)  
    .pipe(first())     
        .subscribe(
            data => {             
             
                this.router.navigate(['/']);
                
            },
            error => {
                this.error = error;
                this.loading = false;
                
            });
          
}

}
