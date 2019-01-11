import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { OutputUsersComponent } from './components/output-users/output-users.component';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateUsersComponent,
    OutputUsersComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    UpdateModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
