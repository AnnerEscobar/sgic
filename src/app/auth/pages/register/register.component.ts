import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);



  public myForm = this.fb.group({
    name: ['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(8)]],
    password2:['', [Validators.required, Validators.minLength(8)]],
  });


  sendRegistration(){
    const {name, email, password} = this.myForm.value;
    console.log({name, email, password});

    this.router.navigateByUrl('/login')
  }

}
