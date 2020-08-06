import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;

  constructor(   
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService:ApiService) { 
     
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]},
      {
        validator: this.MustMatch('password', 'cpassword')
    
  });
  }
  get f() { return this.registerForm.controls; }
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  onSubmit() {
    this.submitted = true;

  

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.loading = true;
    this.apiService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {          
              if(data==null){
                this.loading = false;
             
                this.router.navigate(['/login']);
            }
            },
            error => {              
                this.loading = false;
            });
}

}
