import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  art: Post | undefined;
  
  @Input() artwork_id: number;
 isLoading: boolean;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getPostById(this.artwork_id).subscribe({
      next: (artwork) => {
        this.art = artwork;
        this.isLoading = false;
      }
    });
  }

  addToWishlist(): void {
    this.apiService.addToWishlist(this.art);
  }

  viewDetails(): void {
    this.router.navigate(['/description', this.art?.id]);
  }

  onCardImageClick(event: Event): void {
    this.router.navigate(['/description', this.art?.id]);
  }
}
