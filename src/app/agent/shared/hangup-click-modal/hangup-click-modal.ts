import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { HangupSuccess } from './hangup-success/hangup-success';


@Component({
  selector: 'app-hangup-click-modal',
  imports: [CommonModule, ReactiveFormsModule, HangupSuccess],
  templateUrl: './hangup-click-modal.html',
  styleUrl: './hangup-click-modal.css'
})
export class HangupClickModal implements OnInit {
  isVisible: boolean = false;
  submited: boolean = false;
  hangupClickForm!: FormGroup;
  errorMassage = ''
  @ViewChild('hangupSuccess') hangupSuccess!: HangupSuccess;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.hangupClickForm = this.fb.group({
      field1: ['', Validators.required],
      field2: ['']
    })

  }




  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.hangupClickForm.reset();
    this.errorMassage = '';
  }


  onSubmit() {
    if (this.hangupClickForm.invalid) {
      this.errorMassage = 'Fild 1 is requred';
      return;
    } else {

      this.hangupSuccess.open();
      this.closeSuccess()
      console.log(this.hangupClickForm.value)
      this.errorMassage = '';
      this.submited = true;
    }

  }

  closeSuccess() {
    setTimeout(() => {
      
      this.hangupSuccess.close()
      this.close()
    }, 3000);
  }

}
