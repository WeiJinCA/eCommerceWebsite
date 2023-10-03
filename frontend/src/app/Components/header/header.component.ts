import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  product_count: any
  constructor(private router: Router, private http: HttpClient) { }
  key: any
  loggeduser: any
  option: any
  email: any

  Logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    if (window.location.href == "http://localhost:4200/") {
      window.location.reload()
    }
  }

  // ChangePassword() {

  //   this.router.navigate(['/changePassword'], { queryParams: { email: this.email } })
  // }

  ngOnInit(): void {
    this.loggeduser = JSON.parse(localStorage.getItem('user')!)
    if (this.loggeduser != null && this.loggeduser[0]) {
      console.log(this.loggeduser[0]);

      this.key = this.loggeduser[0].CUSTOMER_ID
      var stored = JSON.parse(localStorage.getItem(this.key)!)
      this.option = this.loggeduser[0].name
      this.email = this.loggeduser[0].email
    } else {
      this.option = ''
    }

    if (this.loggeduser == null || stored == null) {
      this.product_count = 0
    }
    else {

      this.product_count = stored.length
    }

  }
}
