import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { CommandeComponent } from './commande/commande.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { FactureComponent } from './facture/facture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  
  declarations: [
    AppComponent,
    CommandeComponent,
    MainNavComponent,
    FactureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatCheckboxModule,
    MatCardModule,
    MatBadgeModule,
    MatToolbarModule,
    HttpClientModule ,
    MatInputModule,
    MatIconModule,
    FormsModule, ReactiveFormsModule,
    MatListModule,
    LayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainNavComponent
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
