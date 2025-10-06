import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageSnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string) {
    this.snackBar.open(message, '✖', {
      duration: 3500,
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'end', // right side
      verticalPosition: 'bottom' // bottom
    });
  }
}
