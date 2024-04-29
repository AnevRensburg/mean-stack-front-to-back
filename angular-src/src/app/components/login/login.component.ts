import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username:string;
  password:string;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
    ) { }

    ngOnInit() {
      
    }

  onLoginSubmit() {
    // get username / password from form
    const user = {
      username: this.username,
      password: this.password
    }

    // make api call to log user in
    this.authService.loginUser(this.username, this.password).subscribe(async (data: any) => {
      console.log(data);
      if (data.success){
        this.authService.storeUserData(data.token, data.user);
        console.log('navigate')
        let result = await this.router.navigate(['dashboard']);
        console.log(result);
      } else {
        alert('Error with logging in')
        this.router.navigate(['/login']);
      }
    });
        
  }
}
