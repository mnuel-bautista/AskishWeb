import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  user = ''; 

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated.subscribe((isAuthenticated) => {
     /*  if(user != null) {
        this.user = user.displayName ?? user.email ?? ''; 
      } */
      this.user = isAuthenticated + "";
    })
  }

  signOut() {
    this.auth.signOut();
  }
}
