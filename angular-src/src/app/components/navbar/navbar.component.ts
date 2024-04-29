import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  constructor(
    private validateService: ValidateService,
    public authService: AuthService,
    private router: Router
    ) { }

    ngOnInit() {
      
    }

    onLogoutClick(){
      this.authService.logout();
      alert('You are now logged out');
      this.router.navigate(['/login']);
      return false;
    }

}
