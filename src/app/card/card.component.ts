import { Component,Input,Output,EventEmitter, Inject } from '@angular/core';
import { ApiService, Post } from '../api.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() art: Post | undefined;

  constructor(private apiService: ApiService) {}

  addToWishlist() {
    // add art to local storage
    this.apiService.addToWishlist(this.art);
  }


}
