import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../api/service.service';
import { HotToastService } from '@ngneat/hot-toast';
import { LoadingService } from '../../api/loading.service';

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
  caseId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ServiceService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
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
    this.route.paramMap.subscribe((params) => {
      this.caseId = params.get('id');
      console.log('case id+',this.caseId)
      if (this.caseId) {
        this.isEditMode = true;
        this.api.getCaseById(this.caseId).subscribe((data: any) => {
          console.log('data',data)
          this.caseForm = this.fb.group({
            defendantName: data.data.defendantName,
            defendantAddress: [data.data.defendantAddress, Validators.required],
            crimeType: [data.data.crimeType, Validators.required],
            dateCommitted: [data.data.dateCommitted, Validators.required],
            locationCommitted: [data.data.locationCommitted, Validators.required],
            arrestingOfficer: [data.data.arrestingOfficer, Validators.required],
            CIN: [data.data.CIN, Validators.required],
            judge_id: [data.data.judge_id, Validators.required],
            lawyer_id: [data.data.lawyer_id, Validators.required],
            status: [data.data.status, Validators.required],
            victim: [data.data.victim, Validators.required],
          });
          this.caseForm.patchValue(this.caseForm);
          console.log('form value after edit button click',this.caseForm.value);
        });
      }
    });
    this.api.getLawyer().subscribe((data: any) => {
      this.lawyers = data;
      console.log(this.lawyers);
    });
    this.api.getJudges().subscribe((data: any) => {
      this.Judge = data;
      console.log(this.Judge);
    });
  }
  onSubmit() {
    if (this.caseForm.invalid) {
      this.toast.error('Please fill in all required fields.');
      return;
    }

    const formData = this.caseForm.value;

    if (this.isEditMode && this.caseId) {
      // UPDATE MODE
      this.api.updateCase({ ...formData, id: this.caseId }).subscribe(
        () => {
          this.toast.success('Case updated successfully!');
         this.router.navigate(['/case-list']);        },
        (error) => {
          console.error('Update error:', error);
          this.toast.error('Failed to update case');
        }
      );
    } else {
      // CREATE MODE
      this.api.addCase(formData).subscribe(
        () => {
          this.toast.success('Case submitted successfully!');
          this.caseForm.reset({ status: 'pending' });

          this.router.navigate(['/case-list']);

        },
        (error) => {
          console.error('Create error:', error);
          this.toast.error('Failed to submit case');
        }
      );
    }
  }
}
