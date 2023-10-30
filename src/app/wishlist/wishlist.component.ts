import { Component,Input,Output,EventEmitter, Inject, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  @Input() art: Post | undefined;

  wishlist: Post[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.wishlist = this.apiService.getWishlist();
  }
}
