import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  product_id: any
  alreadyadded: any
  models: any = {}
  ratings: any = { "star": null, "review": null }
  tops: any = {}
  delivery: any
  product_cart: any = []
  loggeduser: any
  key: any
  reviews: any = {}
  result: any
  reviewError: any
  NoReview: any = ""
  selectedColor: string = ""
  colors: string[] = ['Red', 'Blue', 'Green', 'Black', 'Purple', 'White']
  storages: string[] = ['64GB', '128GB', '256GB']
  selectedStorage: string = ""
  selectedPrice: number = 0.00;

  getImageUrl(model: string): string {
    const filename = model.replace(/\s+/g, '');
    return `../../../assets/img/product/${filename}.jpg`;
  }

  onChangeSelection(storage: string) {
    this.selectedStorage = storage;

    switch (storage) {
      case '64GB':
        this.selectedPrice = 849.00;
        break;
      case '128GB':
        this.selectedPrice = 919.00;
        break;
      default:
        this.selectedPrice = 1069.00;
        break;
    }

    console.log(this.selectedPrice);

  }
  onColorSelect(color: string) {
    this.selectedColor = color;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.product_id = this.route.snapshot.params['id'];
    console.log("Product Id", this.product_id);
    this.http.get('http://localhost:4000/product/get?arr=' + this.product_id).subscribe((res) => {
      this.models = res;
      console.log(this.models.data);
      console.log(this.models.data[0].product);
      this.selectedStorage = this.models.data[0].storage;
      this.selectedColor = this.models.data[0].color;
      this.selectedPrice = this.models.data[0].price;
    })

    // this.http.get("http://localhost:4000/getLimitData/12").subscribe((res) => {
    //   this.tops = res;
    //   //console.log("Tops:",this.tops);
    // })
    // this.loggeduser = JSON.parse(localStorage.getItem('user')!)
    // console.log("Logged User", this.loggeduser)

    //this.getReview()
  }

  counter(i: number) {
    return new Array(i);
  }
  getReview() {
    console.log("get review function Chala")
    this.http.get("http://localhost:4000/getReview/" + this.product_id).subscribe((res) => {
      this.reviews = res
      this.NoReview = this.reviews.length
      console.log("getReview", this.reviews)
    })
  }
  SendReview() {
    console.log(this.ratings)
    if ((this.ratings.review == "" || this.ratings.review == null) || this.ratings.star == null) {
      if (this.ratings.review == "" || this.ratings.review == null) this.reviewError = "Please Enter Your Review to Submit"
      else this.reviewError = "Please Enter Ratings to Submit"
    }
    else {
      console.log("else chala")
      this.ratings["Name"] = this.loggeduser[0].NAME
      this.ratings["Product_Id"] = this.product_id
      console.log(JSON.stringify(this.ratings))
      this.http.post('http://localhost:4000/setReview', JSON.stringify(this.ratings), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe((res) => {
        this.result = res
        console.log("Result from set Review", res)
        if (this.result.success == true) {
          this.getReview()
        }
      })
    }
  }
  Delivery($event: any) {
    this.delivery = "Delivery in 4-6 days| Free Delivery Above ₹499"
  }


  AddtoCart($event: any) {
    //let headercomponent=new HeaderComponent(this.router);

    if (this.product_cart.length == 0) {
      var product = { company: this.models[0].COMPANY_NAME, name: this.models[0].PRODUCT_NAME, colour: this.models[0].COLOUR, variant: this.models[0].VARIANT, price: this.models[0].PRICE, image: this.models[0].PRODUCT_IMAGE }
      this.product_cart.push(product)
      console.log(this.product_cart.length)
      var a = JSON.parse(localStorage.getItem("user")!)

      if (a == null) {
        this.router.navigate(['/login'])

      }
      if (JSON.parse(localStorage.getItem(a[0].CUSTOMER_ID)!) != null) {
        var user = JSON.parse(localStorage.getItem("user")!)
        var key = user[0].CUSTOMER_ID;
        console.log(user[0].CUSTOMER_ID)
        var stored = JSON.parse(localStorage.getItem(key)!);
        var check = JSON.stringify(stored)
        if (check.includes(this.models[0].PRODUCT_NAME) == false) {
          stored.push(this.product_cart)
          localStorage.setItem(key, JSON.stringify(stored));
          window.location.reload();
          //headercomponent.ngOnInit()
        }
        else {
          console.log("Chala")
          this.alreadyadded = "Product is already added in your cart"
        }

      }
      else {
        var LoggedUser = JSON.parse(localStorage.getItem('user')!)
        if (LoggedUser != null) {
          console.log("else chala")
          var key = LoggedUser[0].CUSTOMER_ID;
          console.log(LoggedUser[0].CUSTOMER_ID)
          localStorage.setItem(key, JSON.stringify([this.product_cart]));
          window.location.reload();
          //headercomponent.ngOnInit()
        }

      }


    }

  }

}
