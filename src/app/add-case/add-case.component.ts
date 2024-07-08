import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-case.component.html',
  styleUrl: './add-case.component.css'
})
export class AddCaseComponent {

  public myForm: FormGroup = this.fb.group({
    caseMP:['', [Validators.required]],
    caseDEIC:['', [Validators.required]],
    alertaNumber:['', [Validators.required]],

    name:['', [Validators.required]],
    edad:['', [Validators.required]],
    lugar:['',[Validators.required]],
    gps:['', [Validators.required]],

    investigador:['', [Validators.required]]

  })

  constructor(private fb: FormBuilder) { }

  onSave():void{
  if(this.myForm.invalid) return;
    console.log(this.myForm.value);
  }

}
