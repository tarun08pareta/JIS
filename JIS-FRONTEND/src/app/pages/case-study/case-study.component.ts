import { Component } from '@angular/core';
import { ServiceService } from '../../api/service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrl: './case-study.component.css'
})
export class CaseStudyComponent {
 caseList: any[] = [];
searchTerm: string = '';
  searchChanged = new Subject<string>();
  constructor(
    private api: ServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toast: HotToastService
  ) {}

  imageUrls: string[] = [
  'images/case1.jpg',
  'images/case2.jpg',
  'images/case3.jpg',
  'images/details.jpg',]

  ngOnInit(): void {
    this.loadCases();

    this.searchChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.filterCases();
      });
  }



  loadCases() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.api.allCase().subscribe((data: any) => {
      console.log(data);
       const filteredCases = data.filter((item: any) => {

      return item.judge.id  === user.response.user.id || item.lawyer.id === user.response.user.id;
    });

     this.caseList = filteredCases.map((item: any, index: number) => ({
      ...item,
      image: this.imageUrls[index % this.imageUrls.length]
    }));
    });
  }
 filterCases() {
    const term = this.searchTerm.trim();

    if (term === '') {
      this.loadCases();
      return;
    }

    this.api.searchCases(term).subscribe((data: any) => {
      this.caseList = data.map((item: any, index: number) => ({
        ...item,
        image: this.imageUrls[index % this.imageUrls.length]
      }));
    });
  }
}
