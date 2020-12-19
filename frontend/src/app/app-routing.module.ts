import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { ContactUsComponent } from './utils/contact-us/contact-us.component';
import { FaqsComponent } from './utils/faqs/faqs.component';
// import { HomepageComponent } from './utils/homepage/homepage.component';
import { PagenotfoundComponent } from './utils/pagenotfound/pagenotfound.component';

const routes: Routes = [
  // { path: 'homepage', component: HomepageComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(p => p.ProductModule), canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(u => u.UserModule), canActivate: [AuthGuard] },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
