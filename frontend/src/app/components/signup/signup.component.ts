import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password :null,
    password_confirmation :null
  };

  public errors = [];

  constructor(
    private Jarwis:JarwisService,    
    private Token: TokenService,
    private Router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.Jarwis.signup(this.form).subscribe(
      data=>this.handleResponse(data), 
      error=> this.handleError(error)
    );
  }

  handleResponse(data){
    this.Token.handle(data.access_token); 
    this.Router.navigateByUrl('/profile') ;
  }

  handleError(error){
    this.errors = error.error.errors;
  }

}
