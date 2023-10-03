import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {}
  result: any = {}
  alert: any = ""
  product_id: any
  togglePassword($event: any) {
    const togglePassword = document.querySelector('#showpassword');
    const password: HTMLElement = document.querySelector('#password')!;
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
  }
  CustomerLogin(regForm: any) {

    const data = JSON.stringify(this.model)
    //console.log(data)
    this.http.post('http://localhost:4000/user/login', data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe((res) => {

      this.result = res
      if (this.result.code == 3000 && this.result.data.length != 0) {//成功返回的code
        //console.log(this.result.data)
        localStorage.setItem('user', JSON.stringify(this.result.data))
        var stored = JSON.parse(localStorage.getItem('user')!)  //Add !
        //console.log(stored)
        this.router.navigate(['/'])
      }
      else {
        this.alert = "Invalid Email or Password"
      }

    })

  }
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)

  }

}
