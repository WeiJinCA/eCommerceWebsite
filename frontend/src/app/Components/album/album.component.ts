import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../../Model/item.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private http: HttpClient) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  items: any = {}

  fileToUpload: File = new File([], 'dummy');

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0)!;
    console.log(this.fileToUpload);
    const formData: FormData = new FormData();
    formData.append('Image', this.fileToUpload);
    this.http.post('http://localhost:4000/upload', formData).subscribe((res) => {
      console.log(res);
    });
  }


  ngOnInit(): void {
    //window.scrollTo(0, 0);
    // this.product_id = this.route.snapshot.params['id'];
    // console.log("Product Id", this.product_id);
    this.http.get('http://localhost:4000/product/getAll').subscribe((res) => {
      this.items = res;
      console.log(this.items.data);
    })

  }
}
