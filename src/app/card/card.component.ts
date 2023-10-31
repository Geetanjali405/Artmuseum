import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ApiService, Post } from '../api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() art: Post | undefined;

  constructor(private apiService: ApiService) {}

  addToWishlist() {
    this.apiService.addToWishlist(this.art);
  }
  viewDetails() {
    localStorage.setItem('currentArt', JSON.stringify(this.art));
    this.apiService.viewDetails(this.art);
  }
  onCardImageClick(event: Event) {
    event.preventDefault();
    this.viewDetails();
  }
}
