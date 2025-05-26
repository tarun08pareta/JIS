import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../api/service.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-schedule-case',
  templateUrl: './schedule-case.component.html',
  styleUrl: './schedule-case.component.css',
})
export class ScheduleCaseComponent implements OnInit {
  scheduleForm: FormGroup;
  courtCases: any[] = [];
  caseId: string | null = null;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private api: ServiceService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private router: Router,
     private location: Location
  ) {
    this.scheduleForm = this.fb.group({
      case_id: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.caseId = params.get('id');
      console.log('case id+', this.caseId);
      if (this.caseId) {
        this.isEditMode = true;
        this.api.getScheduleById(this.caseId).subscribe((data: any) => {
            const schedule = data.data;
             // Format the date to match input[type="datetime-local"]
  const formattedDate = new Date(schedule.date).toISOString().slice(0, 16);

          console.log('data', data);
          this.scheduleForm = this.fb.group({
            case_id: [data.data.case_id, Validators.required],
            date: [formattedDate, Validators.required],
            location: [data.data.location, Validators.required],
            description: [data.data.description, Validators.required],
            status: [data.data.status, Validators.required],
          });
          this.scheduleForm.patchValue(this.scheduleForm.value);
          // console.log('form value after edit button click',this.caseForm.value);
        });
      }
    });
    this.allCase();
  }

  allCase() {
    this.api.allCase().subscribe((data: any) => {
      console.log(data);
      this.courtCases = data;
    });
  }
  onSubmit() {
    if (this.scheduleForm.valid) {
      const formData = this.scheduleForm.value;
      if (this.isEditMode && this.caseId) {
        this.api
          .updateCaseSchedule({ ...formData, id: this.caseId })
          .subscribe({
            next: () => {
              this.toast.success('Schedule updated successfully!');
             this.location.back();



            },
            error: (err) => {
              this.toast.error('Failed to update schedule');
            },
          });
        return;
      } else {
        this.api.addSchedule(formData).subscribe({
          next: () => {
            this.toast.success('Schedule created successfully!');
            this.router.navigate(['/case-list']);
          },
          error: (err) => {
            this.toast.error('Failed to create schedule');
          },
        });
      }
    }
  }
}
