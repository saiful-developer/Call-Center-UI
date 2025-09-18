import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoderService } from '../../services/loder.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrls: ['./loader.css']
})
export class Loader implements OnDestroy {
  isLoading = false;
  private sub = new Subscription();

  constructor(private loader: LoderService) {
    this.sub.add(this.loader.isLoading$.subscribe(v => this.isLoading = v));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
