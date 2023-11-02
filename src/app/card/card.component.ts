import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  art: Post | undefined;
  @Input() artwork_id: number;
  constructor(private apiService: ApiService) {}

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
    localStorage.setItem('currentArt', JSON.stringify(this.art));
    this.apiService.viewDetails(this.art);
  }
  onCardImageClick(event: Event): void {
    event.preventDefault();
    this.viewDetails();
  }
}
