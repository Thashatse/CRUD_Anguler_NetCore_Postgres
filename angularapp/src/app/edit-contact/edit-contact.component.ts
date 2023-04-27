import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactAPIModel } from '../shared/contacts.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  contact = new ContactAPIModel();
  formDate = new Date().toISOString().substring(0, 10);

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = 0;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'] === undefined ? 0 : +params['id'];
      if (this.id != 0) {
        this.http.get<ContactAPIModel>('/Contacts/GetContact?id=' + this.id)
          .subscribe(result => {
            this.contact = result;

            debugger;
            var dateString = this.contact.dateOfBirth.toString().substring(0, 10);
              var element = document.getElementById('dateOfBirth') as HTMLInputElement;
              if (element != null) {
                this.formDate = dateString;
              }
          }, error => console.error(error));
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSaveClick() {
    var isValid = true;

    var element = document.getElementById('name');
    if (this.contact.name === "") {
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

    var element = document.getElementById('surname');
    if (this.contact.surname === "") {
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

    var element = document.getElementById('telephoneNumber');
    if (this.contact.telephoneNumber === 0 || this.contact.telephoneNumber.toString().length !== 9) {
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

    var element = document.getElementById('emailAddresss');
    if (this.contact.emailAddresss === "" || !this.isEmailValid(this.contact.emailAddresss)) {
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

    var element = document.getElementById('dateOfBirth');
    if (this.formDate === undefined) {
      isValid = false;
      if (element != undefined) {
        element.classList.add("InValid");
      }
    }
    else {
      if (element != undefined) {
        element.classList.remove("InValid");
        this.contact.dateOfBirth = new Date(this.formDate);
      }
    }

    if (isValid) {
      this.http.post('/Contacts', this.contact)
        .subscribe(result => {
          alert('Contact Saved');
          this.return();
        }, error => console.error(error));
    }
    else {
      alert('Please complete the form')
    }
  }

  isEmailValid(emailAdress: string) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex))
      return true;

    else
      return false;
  }

  //see https://regexr.com/3e48o for another exemple

  return() {
    this.router.navigate(['/']);
  }
}
