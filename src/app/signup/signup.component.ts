import { Component, OnInit } from '@angular/core';
//import { Auth, updateCurrentUser, updateProfile } from '@angular/fire/auth';
//import { collection, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { AuthService } from '../auth.service';
//import { addDoc, doc } from '@firebase/firestore';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  nameFormControl = new FormControl('', [Validators.required]);

  passwordControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthService,  private router: Router) { }

  ngOnInit(): void {
  }

  async signup() {
    if (!this.emailFormControl.valid) {
      alert("El email no es válido")
      return
    }

    if (!this.nameFormControl.valid) {
      alert("El nombre no es válido")
      return
    }

    if (!this.passwordControl.valid) {
      alert("La contraseña no es válida")
      return
    }

    let email = this.emailFormControl.value!;
    let name = this.nameFormControl.value!;
    let password = this.passwordControl.value!;

    await this.auth.createUser(name, email, password)
    .catch(() => {
      alert("Ocurrió algún error")
      return; 
    })

    this.router.navigate(['../grupos'])


  }

}
