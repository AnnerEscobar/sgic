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
    name: ['Anner Ronaldo Escobar Cruz', [Validators.required]],
    email:['annercruz@hotmail.es', [Validators.required, Validators.email]],
    password:['123456789', [Validators.required, Validators.minLength(8)]],
    password2:['123456789', [Validators.required, Validators.minLength(8)]],
  });


  sendRegistration(){
    const {name, email, password} = this.myForm.value;
    console.log({name, email, password});

    this.router.navigateByUrl('/login')
  }

}
