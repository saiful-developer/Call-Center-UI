import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoderService } from '../../services/loder.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class Loader implements OnDestroy {
  isLoading = false;
  elapsedMs = 0;

  private sub = new Subscription();

  constructor(private loader: LoderService) {
    this.sub.add(this.loader.isLoading$.subscribe(v => this.isLoading = v));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
