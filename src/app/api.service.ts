import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
export interface Post {
  id: number;
  title: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  description: string;
  image_id: string;
  artist_title: string;
}

const WISHLIST_KEY = 'my-wishlist';
const DETAIL_KEY = 'my-detail';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://api.artic.edu/api/v1';
  private largerImageSource = new BehaviorSubject<Post | undefined>(undefined);
  largerImage$ = this.largerImageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getTotalLength(): Observable<number> {
    return this.http.get<any>(this.apiUrl + '/artworks').pipe(
      map((response) => {
        return response.pagination.total;
      })
    );
  }

  getPosts(page: number, pageSize: number): Observable<Post[]> {
    return this.http
      .get<any>(`${this.apiUrl}/artworks?page=${page}&limit=${pageSize}`)
      .pipe(
        map((response) => {
          return response.data as Post[];
        })
      );
  }

  getPostById(page: number, pageSize: number, id: number): Observable<Post[]> {
    return this.http.get<any>(`${this.apiUrl}/artworks/${id}`).pipe(
      map((response) => {
        return response.data as Post[];
      })
    );
  }

  getSearch(page: number, pageSize: number, query: string): Observable<Post[]> {
    return this.http
      .get<any>(
        `${this.apiUrl}/artworks/search?q=${query}&page=${page}&limit=${pageSize}`
      )
      .pipe(
        map((response) => {
          return response.data as Post[];
        })
      );
  }

  addToWishlist(art: Post): void {
    let wishlist: Post[] = [];
    if (localStorage.getItem(WISHLIST_KEY)) {
      wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)!);
    }

    const artExistsInWishlist = wishlist.some(
      (wishlistArt) => wishlistArt.id === art.id
    );
    if (artExistsInWishlist) {
      alert('ART IS ALREADY ADDED TO WISHLIST! EXPLORE MORE!');
    }
    if (!artExistsInWishlist) {
      wishlist.push(art);

      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      alert('ART ADDED TO WISHLIST SUCCESSFULLY!!');
    }
  }

  getWishlist(): Post[] {
    let wishlist: Post[] = [];
    if (localStorage.getItem(WISHLIST_KEY)) {
      wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)!);
    }
    console.log(wishlist);
    return wishlist;
  }
  viewDetails(art: Post): void {
    localStorage.setItem('currentArt', JSON.stringify(art));
  }
}
