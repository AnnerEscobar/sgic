import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-case.component.html',
  styleUrl: './add-case.component.css'
})
export class AddCaseComponent implements OnInit {


  public myForm: FormGroup = this.fb.group({
    tipoCaso:['1', Validators.required],
    caseMP: ['', [Validators.required]],
    caseDEIC: ['', [Validators.required]],
    alertaNumber: ['', [Validators.required]],

    name: ['', [Validators.required]],
    edad: ['', [Validators.required]],
    lugar: ['', [Validators.required]],
    gps: ['', [Validators.required]],
    estadoCaso:['1', [Validators.required]],
    investigador: ['', [Validators.required]]

  })


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;

  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return 'Minimo tres caracteres';
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }


}
