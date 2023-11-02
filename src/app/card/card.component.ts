import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  art: Post | undefined;
  @Input() artwork_id: number;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getPostById(this.artwork_id).subscribe({
      next: (artwork) => {
        this.art = artwork;
      },
      error: (er) => {
        console.error(er);
      },
    });
  }

  addToWishlist(): void {
    this.apiService.addToWishlist(this.art);
  }
  viewDetails(): void {
    this.router.navigate(['/description', this.art?.id]);
  }
  onCardImageClick(event: Event): void {
    event.preventDefault();
    this.viewDetails();
  }
}
