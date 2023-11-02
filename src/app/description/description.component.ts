import { Component, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit{
  artwork_id: number;
  art: Post | undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => (this.artwork_id = param['id']));
    this.apiService.getPostById(this.artwork_id).subscribe((art: Post) => {
      this.art = art;
      document.getElementById('descriptionBox').innerHTML = this.art?.description;
    });
  }
}
