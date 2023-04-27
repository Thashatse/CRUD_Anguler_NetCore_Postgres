import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  Username = "";
  Password = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthServiceService) {
  }

  onSubmit() {
    var isValid = true;
 
    var element = document.getElementById('Username');
    if (this.Username === "") {
      isValid = false;
      if (element != undefined) {
        element.classList.add("InValid");
      }
    }
    else {
      if (element != undefined) {
        element.classList.remove("InValid");
      }
    }

    var element = document.getElementById('Password');
    if (this.Password === "") {
      isValid = false;
      if (element != undefined) {
        element.classList.add("InValid");
      }
    }
    else {
      if (element != undefined) {
        element.classList.remove("InValid");
      }
    }

    if (isValid) {
      debugger;
      this.http.post('/Token', {
        username: this.Username,
        password: this.Password,
      },
        { responseType: 'text' })
        .subscribe(result => {
          this.authService.setToken(result);
          this.goHome();
        }, error => {
          alert("Invalid Request");
          this.Password = "";
          console.error(error);
        });
    }
    else {
      alert('Please complete the form')
    }
  }

  goHome() {
    this.router.navigate(['/List']);
  }
}
