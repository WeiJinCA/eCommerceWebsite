import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../Model/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  constructor(private http: HttpClient) {
  }


  loggeduser: any;
  email: any;
  @Input() item!: Item;
  isFilled = false;
  items: any = {}
  arr: Number[] = [];

  toggleHeart(event: Event) {

    this.isFilled = !this.isFilled;

    this.loggeduser = JSON.parse(localStorage.getItem('user')!)
    if (this.loggeduser != null) {

      this.email = this.loggeduser[0].email
    }

    let data: any = {
      "email": this.email,
      "productId": this.item.id,
      "status": this.isFilled
    };

    //Modify favorites status for user
    this.http.put('http://localhost:4000/user/favorites', data).subscribe((res) => {
      console.log(res);
    });
  }

  getImageUrl(model: string): string {
    const filename = model.replace(/\s+/g, '');
    return `../../../assets/img/product/${filename}.jpg`;
  }

  ngOnInit() {
    this.loggeduser = JSON.parse(localStorage.getItem('user')!);

    if (this.loggeduser != null && this.loggeduser[0]) {
      this.http.get('http://localhost:4000/user/get/' + this.loggeduser[0].email).subscribe((res) => {
        this.items = res;
        this.arr = this.items.data[0].favorites;

        if (this.arr.includes(this.item.id)) {
          this.isFilled = true;
        } else {
          this.isFilled = false;
        }
      });
    }
  }

  toProduct(event: Event) {

  }
}
