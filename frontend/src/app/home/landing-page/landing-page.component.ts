import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {
  msg?: string;

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService
      .getMessage()
  }

  areas = [{
    country: 'Russia',
    area: 12,
  }, {
    country: 'Canada',
    area: 7,
  }, {
    country: 'USA',
    area: 5,
  }];

  route(): void {
    this.router.navigate(['/landing'])
  }

  pointClickHandler(e: any): void {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e: any): void {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item: any) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }
}
