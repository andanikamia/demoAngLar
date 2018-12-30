import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';

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
  
  constructor(private Jarwis:JarwisService) { 

  }

  ngOnInit() {
  }

  onSubmit(){
    this.Jarwis.login(this.form).subscribe(
      data=>console.log(data), 
      error=> this.handleError(error)
    );
  }

  handleError(error){
    this.errors = error.error.error;
  }
}
