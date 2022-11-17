import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposComponent } from './grupos/grupos.component';
import { SignupComponent } from './signup/signup.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { Firebase } from './firebase/firebase';
import {MatDialogModule} from '@angular/material/dialog';
import { NuevoGrupoComponent } from './grupos/nuevo-grupo/nuevo-grupo.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GruposComponent,
    SignupComponent,
    NuevoGrupoComponent,
    NuevoCuestionarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule, 
    MatIconModule, 
    MatDialogModule, 
  ],
  providers: [Firebase],
  bootstrap: [AppComponent]
})
export class AppModule { }
