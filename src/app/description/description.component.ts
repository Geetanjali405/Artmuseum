import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Post } from '../api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  art: Post | undefined;

  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentArt')) {
      this.art = JSON.parse(localStorage.getItem('currentArt')!);
      console.log(this.art);
    }
    document.getElementById('descriptionBox').innerHTML = this.art.description;
   
  }
}
