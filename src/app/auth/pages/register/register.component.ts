import { AuthService } from './../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserRegistro } from '../../interfaces/user-register';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  //injects
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);


  //variables

  public myForm = this.fb.group({
    name: ['Anner Escobar', [Validators.required]],
    email: ['anner123escobar@outlook.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(8)]],
    password2: ['12345678', [Validators.required, Validators.minLength(8)]],
  });


  verifyPassword(): boolean {
    const { password, password2 } = this.myForm.value;
    const passwordsMatch = password === password2;
    return passwordsMatch;
  }

  register() {

    if (this.verifyPassword()) {

      const  { name, email, password } = this.myForm.value;
      const body = {name, email, password};

      this.authService.register(body)
        .subscribe({
          next: ()=> {
            this.toastr.success('Registro exitoso','Success')
            this.router.navigateByUrl('auth/login');
          },
          error: (message) =>{
            this.toastr.error(message, 'Error')
          }
        })
    }
  }
//verf. data
//estructuracion datos --interfaz(servicio)
//luego consumir el servicio

}
