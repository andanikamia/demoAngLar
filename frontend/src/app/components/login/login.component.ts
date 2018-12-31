import { AuthService } from './../../Services/auth.service';
import { TokenService } from './../../Services/token.service';
import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public errors = null;
  
  constructor(
    private Jarwis:JarwisService,
    private Token: TokenService,
    private Router: Router,
    private Auth : AuthService
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.Jarwis.login(this.form).subscribe(
      data=>this.handleResponse(data), 
      error=> this.handleError(error)
    );
  }

  handleResponse(data){
    this.Token.handle(data.access_token); 
    this.Auth.changeAuthStatus(true);
    this.Router.navigateByUrl('/profile');
  }

  handleError(error){
    this.errors = error.error.error;
  }
}
