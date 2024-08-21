import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private  fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    email:['anner123escobar@gmail.com', [Validators.required, Validators.email]],
    password:['12345678', [Validators.required, Validators.minLength(6)]]
  });


  login(){

    const {email, password} = this.myForm.value;
    this.authService.login(email, password)
    .subscribe({
      next: ()=> console.log('Todo bien'),
      error: (message) =>{
        Swal.fire('Error', message, 'error')
      }
    })
  }

}
