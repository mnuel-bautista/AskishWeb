import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $isAuthenticated = new BehaviorSubject('false');

  isAuthenticated = this.$isAuthenticated.asObservable();

  private app = initializeApp(environment.firebase)

  private auth = getAuth(this.app)

  constructor(/* private auth: Auth */private router: Router) {
    this.auth.onAuthStateChanged((currentUser) => {
      this.$isAuthenticated.next(currentUser?.displayName ?? "")
    })
  }

  login(email: string, password: string) {
    if (email != null && password != null) {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          this.router.navigate(['../grupos'])
        }).catch(() => {
          alert("Ocurrió algún error al iniciar sesión")
        })
    }
  }

  async createUser(displayName: string, email: string, password: string)  {
    let userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
    await updateProfile(userCredential.user, {displayName: displayName})
  }

  signOut() {
    this.auth.signOut()
  }
}
