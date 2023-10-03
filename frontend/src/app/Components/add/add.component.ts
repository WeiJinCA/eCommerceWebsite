import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  model: any = {}

  constructor(private http: HttpClient, private router: Router) {
  }

  fileToUpload: File = new File([], 'dummy');

  // handleFileInput(files: FileList | null) {
  //   if (files !== null && files.length > 0) {
  //     this.fileToUpload = files.item(0)!;
  //     console.log(this.fileToUpload);
  //     const formData: FormData = new FormData();
  //     formData.append('Image', this.fileToUpload);
  //     this.http.post('http://localhost:4000/upload', formData).subscribe((res) => {
  //       console.log(res);
  //     });
  //   } else {
  //     console.log('No file selected.');
  //   }

  // }

  handleFileInput() {
    const files: FileList | null = this.fileInput.nativeElement.files;
    if (files !== null && files.length > 0) {
      // Process the selected file(s)
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        // You can now work with the 'file' object (e.g., upload it, read its content, etc.)
        console.log(file);
      }
    } else {
      // Handle the case when no file is selected
      console.log('No file selected.');
    }
  }

  AddProduct(regform: any) {
    this.model.id = Math.floor(Math.random() * 100);
    const data = JSON.stringify(this.model);
    console.log("Data hai", data);

    this.http.post('http://localhost:4000/product/create', data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe((res) => {

      this.router.navigate(['/']);
    });

  }
}
