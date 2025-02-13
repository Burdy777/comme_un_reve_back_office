import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Blog } from '../../shared/models/blog';
import { BlogService } from '../../shared/services/blog.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlicePipe, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  blogs: Blog[] = [];

  constructor(private blogService: BlogService, private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/blog-details', id]);
  }
  
  logout(): void {
    this.authService.logout();
  }

  

}
