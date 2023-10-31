import { Component } from '@angular/core';
import { ApiService,Post } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchForm: FormGroup;
  pageSize: number = 12;
  paginatedPosts: Post[];
  currentPageIndex = 0;
  pageLength: number = 0;

  pageEvent: PageEvent = {
    length : 0,
    pageIndex: 0,
    previousPageIndex: 0,
    pageSize: this.pageLength
  };
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.apiService.getTotalLength().subscribe({
      next: (totLenght) => {
        this.pageLength = totLenght;
      },
    });

    this.apiService.getPosts(1, 12).subscribe(
    
      (data: Post[]) => {
        this.posts = data;
        this.pageEvent.length = this.posts.length;
        this.pageEvent.pageSize = 12;
      },
      (error) => {
        console.log(error);
      }
    );
    this.paginatePosts(this.currentPageIndex, this.pageSize);
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.filterPosts();
    });
  }

  handlePageChange(event: PageEvent) {
    // const pageSize = event.pageSize;
    // const pageIndex = event.pageIndex;
    this.pageEvent = event;
    this.apiService
      .getPosts(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize)
      .subscribe(
        (data: Post[]) => {
          this.posts = data;
          // this.filteredPosts = this.posts;
        },
        (error) => {
          console.log(error);
          this.posts = [];
        }
      );
  }

  filterPosts() {
    console.log('inside search');
    let searchQuery =
      this.searchForm.controls['searchQuery'].value.toLowerCase();
      if(searchQuery === ''){
        this.apiService.getPosts(1, 12).subscribe(
    
          (data: Post[]) => {
            this.posts = data;
            this.pageEvent.length = this.posts.length;
            this.pageEvent.pageSize = 12;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      }
      
    if (searchQuery.length > 2) {
      console.log("inside condition");
      this.posts = [];
      this.apiService
        .getSearch(
          this.pageEvent.pageIndex + 1,
          this.pageEvent.pageSize,
          searchQuery
        )
        .subscribe(
          (data: Post[]) => {
            this.posts = data;
            // this.filteredPosts = this.posts;
            console.log(this.posts)
          },
          (error) => {
            console.log(error);
            // this.posts = [];
          }
        );
    }
    this.paginatePosts(this.currentPageIndex, this.pageSize);
  }
  paginatePosts(currentPageIndex: number, pageSize: number) {
    this.currentPageIndex = currentPageIndex;
    this.pageSize = pageSize;
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // this.filteredPosts = this.filteredPosts.slice(startIndex, endIndex);
  }
}
