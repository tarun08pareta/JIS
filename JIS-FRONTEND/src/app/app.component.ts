import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from './api/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JIS-FRONTEND';
loading = false;
  constructor(private router: Router,private loadingService: LoadingService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top on every route change
      }
    });

    this.loadingService.isLoading.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }



}
