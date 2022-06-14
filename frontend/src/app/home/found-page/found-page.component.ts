import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}
@Component({
  selector: 'app-found-page',
  templateUrl: './found-page.component.html',
  styleUrls: ['./found-page.component.scss']
})
export class FoundPageComponent implements OnInit {
  focus?: any;
  focus1?: any;
  focus5?: any;
  showNational: boolean = false
  showBank: boolean = false
  isChecked?: boolean;
  value: number = 0;
  foundForm = new FormGroup({
    'fullName': new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    'nationalCardId': new FormControl(''),
    'bankCardId': new FormControl('')
  })

  status: boolean = false
  public alerts: Array<IAlert> = [];

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void { }

  checkCheckBoxvalue(event: any): void {
    this.showNational = event.target.checked
    if (!!this.showNational) {
      this.foundForm.get('nationalCardId')?.setValidators(Validators.required);
    } else {
      this.foundForm.get('nationalCardId')?.setValidators(null);
    }
  }

  checkCheckBoxBank(event: any): void {
    this.showBank = event.target.checked
    if (this.showBank) {
      this.foundForm.get('bankCardId')?.setValidators(Validators.required);
    } else {
      this.foundForm.get('bankCardId')?.setValidators([]);
    }
  }

  fullNameChange(event: any): void {
    if (event.target.value.length > 0) {
      this.value += 30;
    } else {
      this.value -= 30;
    }
  }

  nationalCardChange(event: any): void {
    if (event.target.value.length > 0) {
      this.value += 30;
    } else {
      this.value -= 30;
    }
  }

  bankInputChange(event: any): void {
    if (event.target.value.length > 0) {
      this.value += 40;
    } else {
      this.value -= 40;
    }
  }

  onFormSubmit(): void {
    if (this.foundForm.valid) {
      this.http.userFound({ ...this.foundForm.value, id: localStorage.getItem('id') }).subscribe((result: any) => {
        if (result.response === "success") {
          this.alerts.push({
            id: 1,
            type: 'success',
            strong: 'Success!',
            message: 'Your form submitted successfuly',
            icon: 'fa fa-thumbs-o-up'
          })
          this.status = true;
        }

      })
    }
  }
  close(alert: IAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
