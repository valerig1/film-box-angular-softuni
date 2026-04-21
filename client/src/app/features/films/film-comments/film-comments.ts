import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, CommentsService, FormService } from '../../../core/services';
import { Comment } from '../../../models';

@Component({
  selector: 'app-film-comments',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './film-comments.html',
  styleUrl: './film-comments.scss',
})
export class FilmComments implements OnInit {
  @Input() filmId!: string;
  @Input() filmOwnerId!: string;

  protected commentsService = inject(CommentsService);
  protected authService = inject(AuthService);
  protected formService = inject(FormService);

  private cdr = inject(ChangeDetectorRef);

  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor() {
    this.commentForm = this.formService.createCommentForm();
  }

  ngOnInit(): void {
    this.commentsService.getCommentsByFilm(this.filmId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.cdr.detectChanges();
      },
      error: () => {
        this.comments = [];
        this.cdr.detectChanges();
      }
    });
  }

  canComment(): boolean {
    const user = this.authService.currentUser();
    return !!user && user._id !== this.filmOwnerId;
  }

  get content(): AbstractControl | null {
    return this.commentForm.get('content');
  }

  get showContentError(): boolean {
    return this.content?.invalid && (this.content?.dirty || this.content?.touched) || false;
  }

  get contentErrorMessage(): string {
    if (this.content?.errors?.['required']) {
      return 'Comment is required!';
    }

    if (this.content?.errors?.['minlength']) {
      return 'Comment must be at least 2 characters!';
    }

    if (this.content?.errors?.['maxlength']) {
      return 'Comment must not exceed 1000 characters!';
    }

    return '';
  }

  onSubmit(): void {
    if (!this.canComment()) {
      return;
    }

    if (this.commentForm.valid) {
      const { content } = this.commentForm.value;
      const user = this.authService.currentUser();

      if (!user) {
        return;
      }

      this.commentsService.addComment(
        this.filmId,
        content,
        user.username
      ).subscribe({
        next: (comment) => {
          this.comments.unshift(comment);
          this.commentForm.reset();
        },
        error: () => {
          this.commentForm.reset();
          this.formService.markFormGroupTouched(this.commentForm);
        }
      });
    } else {
      this.formService.markFormGroupTouched(this.commentForm);
    }
  }
}