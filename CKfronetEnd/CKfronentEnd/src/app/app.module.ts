import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientServicesService } from './services/client-services.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ AppComponent, ClientsComponent, NavbarComponent ],
	imports: [ BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
	providers: [ ClientServicesService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
