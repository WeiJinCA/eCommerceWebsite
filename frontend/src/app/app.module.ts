import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductComponent } from './Components/product/product.component';
import { RegisterComponent } from './Components/register/register.component';
import { HeaderComponent } from './Components/header/header.component';
import { AlbumComponent } from './Components/album/album.component';
import { ItemComponent } from './Components/item/item.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeroComponent } from './Components/hero/hero.component';
import { AddComponent } from './Components/add/add.component';
import { CollectComponent } from './Components/collect/collect.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    RegisterComponent,
    HeaderComponent,
    AlbumComponent,
    ItemComponent,
    FooterComponent,
    HeroComponent,
    AddComponent,
    CollectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
