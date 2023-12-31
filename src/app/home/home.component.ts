import { Component, OnInit } from '@angular/core';
import { ApiService,Post } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchForm: FormGroup;
  pageSize: number = 12;
  paginatedPosts: Post[];
  currentPageIndex = 0;
  pageLength: number = 0;
  artworkIds: number[] = [];
  pageEvent: PageEvent = {
    length : 0,
    pageIndex: 0,
    previousPageIndex: 0,
    pageSize: this.pageLength
  };
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.isLoading = true;
    this.apiService.getTotalLength().subscribe({
      next: (totLength) => {
        this.pageLength = totLength;
        // this.isLoading = false;
      },
    });

    this.apiService.getPosts(1, 12).subscribe(
    (data: number[]) => {
        this.artworkIds = data;
        this.pageEvent.length = this.artworkIds.length;
        this.pageEvent.pageSize = 12;
        // this.isLoading = false;
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

  handlePagination(): void {
    this.apiService
      .getPosts(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize)
      .subscribe(
        (data: number[]) => {
          this.artworkIds = data;
        },
        (error) => {
          console.log(error);
          this.posts = [];
        }
      );
  }

  handlePageChange(event: PageEvent):void {
    this.pageEvent = event;
    this.handlePagination();
  }

  filterPosts():void {
    console.log('inside search');
    let searchQuery = this.searchForm.controls['searchQuery'].value.toLowerCase();
      if(searchQuery === ''){
        this.handlePagination();
        return;
      }
      
    if (searchQuery.length > 0) {
      this.posts = [];
      this.apiService
        .getSearch(
          this.pageEvent.pageIndex + 1,
          this.pageEvent.pageSize,
          searchQuery
        )
        .subscribe(
          (data: number[]) => {
            this.artworkIds = data;
            console.log(this.artworkIds)
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.paginatePosts(this.currentPageIndex, this.pageSize);
  }


  paginatePosts(currentPageIndex: number, pageSize: number):void {
    this.currentPageIndex = currentPageIndex;
    this.pageSize = pageSize;
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  }
}