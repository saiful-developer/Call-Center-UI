import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hangup-success',
  imports: [CommonModule],
  templateUrl: './hangup-success.html',
  styleUrl: './hangup-success.css'
})
export class HangupSuccess {
  isVisible: boolean = false;
  successMassage = '';

  constructor(private router: Router) {}


  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.router.navigate(['/'])
  }

}
