import { AuthService } from './../../../auth/services/auth-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SgicDataService } from '../../services/sgic-data.service';
import { ToastrService } from 'ngx-toastr';
import { read } from 'fs';

@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-case.component.html',
  styleUrl: './add-case.component.css'
})
export class AddCaseComponent {
  //arrays

  selectedFiles: File[] = [];


  public myForm: FormGroup = this.fb.group({
    caseTipo: ['', Validators.required],
    mpNumber: ['', [Validators.required]],
    deicNumber: ['', [Validators.required]],
    alertaNumber: ['', [Validators.required]],
    Name: ['', [Validators.required]],
    Age: ['', [Validators.required]],
    Lugar: ['', [Validators.required]],
    Gps: ['', [Validators.required]],
    investigacionStatus: ['', [Validators.required]],
    files: ['', [Validators.required]]
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
    if (caseTipo === 'Alerta') {
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
    console.log("im on the getFieldErrors method")
    return null;
  }

  onFileChange(event: Event){
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length >0){

      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64File = reader.result as string;
        this.myForm.patchValue({files: [base64File]});
      };

      reader.readAsDataURL(file);
/*
      this.selectedFiles = Array.from(input.files);
      const files = Array.from(input.files).map(file => file.name);
      this.myForm.patchValue({files}) */
      }
    }


  CargarCaso() {
    const userId = this.authService.getUserId();
    const investigadorName = this.authService.getInvestigadorName();

    const {
      caseTipo,
      mpNumber,
      deicNumber,
      Name,
      Age,
      Lugar,
      Gps,
      investigacionStatus,
      alertaNumber,
      files,
    } = this.myForm.value;

    const body: any = {
      caseTipo,
      mpNumber,
      deicNumber,
      Name,
      Age,
      Lugar,
      Gps,
      investigadorName,
      investigacionStatus,
      userId,
      files,
    };

    if (caseTipo === 'Alerta') {
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

