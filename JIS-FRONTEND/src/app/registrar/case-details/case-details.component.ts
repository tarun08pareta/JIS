import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../api/service.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.css'
})
export class CaseDetailsComponent  implements OnInit {

  caseId: any;
  caseData: any;

  constructor(private api : ServiceService,private route: ActivatedRoute,
    private toast: HotToastService
  ) { }
  ngOnInit(): void {
    this.caseId = this.route.snapshot.params['id'];
    console.log('case id+',this.caseId)
    if(this.caseId) {
      this.api.CaseDetails(this.caseId).subscribe((data: any) => {
        console.log(data);
        this.caseData = data.data;
      });
    }
  }

onDeleteSchedule(scheduleId: string) {
  this.api.deleteSchedule(scheduleId).subscribe(() => {
    this.api.CaseDetails(this.caseId).subscribe((data: any) => {
      this.toast.success('Schedule deleted successfully!');
      this.caseData = data.data;
    });
  });
}

}
