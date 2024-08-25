import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private  fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  public myForm: FormGroup = this.fb.group({
    email:['anner123escobar@outlook.com', [Validators.required, Validators.email]],
    password:['12345678', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    const {email, password} = this.myForm.value;
    this.authService.login(email, password)
    .subscribe({
      next: ()=> this.router.navigateByUrl('/dashboard'),
      error: (message) =>{
        this.toastr.error(message, 'Error')
      }
    })
  }

}
