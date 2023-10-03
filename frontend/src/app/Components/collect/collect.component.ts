import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {

  loggeduser: any;
  email: any;
  items: any = {}
  arr: Number[] = [];
  products: any = {
    "data": []
  };

  constructor(private http: HttpClient) {
  }

  getImageUrl(model: string): string {
    const filename = model.replace(/\s+/g, '');
    return `../../../assets/img/product/${filename}.jpg`;
  }

  ngOnInit() {
    this.loggeduser = JSON.parse(localStorage.getItem('user')!);

    if (this.loggeduser != null) {

      this.email = this.loggeduser[0].email;
      console.log(this.email);
    }

    let data: any = {
      "email": this.email
    };

    this.http.get('http://localhost:4000/user/get/' + this.email).subscribe((res) => {
      this.items = res;
      console.log(this.items.data[0].favorites);
      this.arr = this.items.data[0].favorites;

      const queryParams = new URLSearchParams();
      this.arr.forEach((item: any) => queryParams.append('arr', String(item)));

      const url = 'http://localhost:4000/product/get?' + queryParams.toString();

      this.http.get(url).subscribe((res) => {

        this.products = res;

      });
    });


  }
}
