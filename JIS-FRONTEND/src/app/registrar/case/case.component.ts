import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../api/service.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrl: './case.component.css',
})
export class CaseComponent implements OnInit {
  caseForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  lawyers: any[] = [];
  Judge: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ServiceService,
    private toast: HotToastService
  ) {
    this.caseForm = this.fb.group({
      defendantName: ['', Validators.required],
      defendantAddress: ['', Validators.required],
      crimeType: ['', Validators.required],
      dateCommitted: ['', Validators.required],
      locationCommitted: ['', Validators.required],
      arrestingOfficer: ['', Validators.required],
      CIN: ['', Validators.required],
      judge_id: ['', Validators.required],
      lawyer_id: ['', Validators.required],
      status: ['pending', Validators.required],
      victim: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.api.getLawyer().subscribe((data:any) => {
      this.lawyers= data;
      console.log(this.lawyers);
    });
    this.api.getJudges().subscribe((data:any) => {
      this.Judge= data;
      console.log(this.Judge);
    })
  }
  onSubmit() {
    if (this.caseForm.invalid) {
      this.toast.error('Please fill in all required fields.');
      this.successMessage = '';
      return;
    }

    const formData = {
      ...this.caseForm.value,
    };

    console.log('Form Data:', formData);

    this.api.addCase(formData).subscribe(
      (response) => {
        this.toast.success('Case submitted successfully:');
        this.successMessage = 'Case submitted successfully!';
        this.errorMessage = '';
        this.caseForm.reset({ status: 'pending' }); // reset while keeping default
      },
      (error) => {
        console.error('Error submitting case:', error);
        this.errorMessage = 'Error submitting case. Please try again.';
        this.successMessage = '';
      }
    ); // reset while keeping default
  }
}
