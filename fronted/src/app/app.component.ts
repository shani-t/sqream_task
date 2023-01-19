import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SQREAM_TASK_SHAMI';
  isLoggedIn$!: Observable<boolean>;
  href!: string;

  constructor(
    private renderer: Renderer2,
    private store: Store,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,


  ) {}

  ngOnInit(): void {
    this.href = this.document.location.href;
  }
}
