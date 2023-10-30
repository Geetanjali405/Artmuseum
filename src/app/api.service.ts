import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://api.artic.edu/api/v1';

  constructor(private http: HttpClient) {}

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
    return this.http
      .get<any>(`${this.apiUrl}/artworks/${id}?page=${page}&limit=${pageSize}`)
      .pipe(
        map((response) => {
          return response.data as Post[];
        })
      );
  }

  getSearch(page: number, pageSize: number, query: string): Observable<Post[]> {
    // console.log(`${this.apiUrl}/artworks/search?q=${query}&page=${page}&limit=${pageSize}`);
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

  addToWishlist(art: Post) :void{
    let wishlist: Post[] = [];
    if (localStorage.getItem(WISHLIST_KEY)) {
      wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)!);
    }
  
    const artExistsInWishlist = wishlist.some(wishlistArt => wishlistArt.id === art.id);
    if (artExistsInWishlist) {
      alert("ART IS ALREADY ADDED TO WISHLIST! EXPLORE MORE!")
    }
    if (!artExistsInWishlist) {
      wishlist.push(art);
  
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      alert("ART ADDED TO WISHLIST SUCCESSFULLY!!")
    }
  }

  getWishlist(): Post[] {
    // get wishlist from local storage
    let wishlist: Post[] = [];
    if (localStorage.getItem(WISHLIST_KEY)) {
      wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)!);
    }
    console.log(wishlist);
    return wishlist;
  }
}
