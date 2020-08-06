import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { ApiInterceptor } from './interceptor/api.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from './interceptor/fakebackend.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Permissions, AuthGaurdService } from './service/auth-gaurd.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [ApiService,
    {provide:HTTP_INTERCEPTORS, useClass:ApiInterceptor,multi: true },
    AuthGaurdService,
    Permissions,
    fakeBackendProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
