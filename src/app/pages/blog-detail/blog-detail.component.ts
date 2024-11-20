import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone:true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    NgFor,
    NgIf
  ]
})
export class BlogDetailComponent implements OnInit {
  blogForm: FormGroup;
  blogId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.blogId = +this.route.snapshot.paramMap.get('id')!;
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe((data) => {
        this.blogForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.blogId) {
        this.blogService
          .updateBlog(this.blogId, this.blogForm.value)
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      } else {
        this.blogService.createBlog(this.blogForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
