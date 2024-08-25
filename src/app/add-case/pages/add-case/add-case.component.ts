import { AuthService } from './../../../auth/services/auth-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SgicDataService } from '../../services/sgic-data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-case.component.html',
  styleUrl: './add-case.component.css'
})
export class AddCaseComponent {


  public myForm: FormGroup = this.fb.group({
    caseTipo: ['1', Validators.required],
    mpNumber: ['M0030-2024-456', [Validators.required]],
    deicNumber: ['DEIC52-2024-08-23-456', [Validators.required]],
    alertaNumber: ['', [Validators.required]],

    desaparecidoName: ['Josue Maxia Gomez', [Validators.required]],
    desaparecidoAge: ['25', [Validators.required]],
    desaparecidoLugar: ['El trebol', [Validators.required]],
    desaparecidoGps: ['14.613279677819097,-90.53330812361615', [Validators.required]],
    investigacionStatus: ['1', [Validators.required]],
    investigadorName: ['Anner Escobar', [Validators.required]]
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sgicService: SgicDataService,
    private authService: AuthService,
    private toastr: ToastrService,

  ) {
    this.myForm.get('caseTipo')?.valueChanges.subscribe(value => this.onCaseTipoChange(value));
  }


  onCaseTipoChange(caseTipo: string): void {
    const alertaNumberControl = this.myForm.get('alertaNumber');
    if (caseTipo === 'Alerta Alba-Keneth') {
      alertaNumberControl?.setValidators([Validators.required]);
      alertaNumberControl?.enable();
    } else {
      alertaNumberControl?.clearValidators();
      alertaNumberControl?.disable();
    }
    alertaNumberControl?.updateValueAndValidity();
  }


  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }


  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return 'Minimo tres caracteres';
      }
    }
    return null;
  }

  CargarCaso() {
    const userId = this.authService.getUserId();

    const {
      caseTipo,
      mpNumber,
      deicNumber,
      desaparecidoName,
      desaparecidoAge,
      desaparecidoLugar,
      desaparecidoGps,
      investigadorName,
      investigacionStatus,
      alertaNumber,
    } = this.myForm.value;

    const body: any = {
      caseTipo,
      mpNumber,
      deicNumber,
      desaparecidoName,
      desaparecidoAge,
      desaparecidoLugar,
      desaparecidoGps,
      investigadorName,
      investigacionStatus,
      userId,
    };

    if (caseTipo === 'Alerta Alba-Keneth') {
      body.alertaNumber = alertaNumber;
    } else {
      body.alertaNumber = null;
    }

    this.sgicService.createCaso(body)
      .subscribe({
        next: () => {
          this.toastr.success("Registrado existosamente", 'Success',);
          this.router.navigateByUrl('/dashboard');
        },
        error: (message) => {
          this.toastr.error(message, "Error",);
        }
      });

    console.log('Request Body:', body);
    console.log("Este es el valor de alertaNumber:", body.alertaNumber);
  }



  /* CargarCaso() {

    const userId = this.authService.getUserId();

    const {
      caseTipo,
      mpNumber,
      deicNumber,
      desaparecidoName,
      desaparecidoAge,
      desaparecidoLugar,
      desaparecidoGps,
      investigadorName,
      investigacionStatus,
      ...rest
    } = this.myForm.value;

    let alertaNumber = rest;
    console.log("Este es el valor de rest", rest)

    if (caseTipo !== 'Alerta Alba-Keneth') {
      alertaNumber = 'NaN';
    }

    const body: any = {
      caseTipo,
      mpNumber,
      deicNumber,
      alertaNumber,
      desaparecidoName,
      desaparecidoAge,
      desaparecidoLugar,
      desaparecidoGps,
      investigadorName,
      investigacionStatus,
      userId,
    };


    this.sgicService.createCaso(body)

      .subscribe({
        next: () => {
          this.toastr.success("Registrado existosamente", 'Success',)
          this.router.navigateByUrl('/dashboard');
        },
        error: (message) => {
          this.toastr.error(message, "Error",)
        }
      });
    console.log('Request Body:', body);
    console.log("Este ese el valor de alertaNumber:", alertaNumber);
  } */
}

