import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private Jarwis:JarwisService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.Jarwis.signup(this.form).subscribe(
      data=>console.log(data), 
      error=> this.handleError(error)
    );
  }

  handleError(error){
    this.errors = error.error.errors;
  }

}
