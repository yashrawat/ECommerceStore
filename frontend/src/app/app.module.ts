import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './utils/homepage/homepage.component';
import { HeaderComponent } from './utils/header/header.component';
import { FooterComponent } from './utils/footer/footer.component';
import { PagenotfoundComponent } from './utils/pagenotfound/pagenotfound.component';
import { ContactUsComponent } from './utils/contact-us/contact-us.component';
import { FaqsComponent } from './utils/faqs/faqs.component';
import { ErrorComponent } from './utils/error/error.component';
import { CartService } from './utils/cart.service';
import { UserService } from './utils/user.service';
import { AuthService } from './utils/auth.service';
import { ProductService } from './utils/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    PagenotfoundComponent,
    ContactUsComponent,
    FaqsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    CartService,
    UserService,
    AuthService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
