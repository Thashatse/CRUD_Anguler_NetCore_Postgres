import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactAPIModel } from '../shared/contacts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})

export class ListContactComponent {
  public contacts?: ContactAPIModel[];
  public page: number;

  constructor(private http: HttpClient, private router: Router) {
    this.page = 1;
    this.refreshData();
  }

  title = 'Contacts';

  public refreshData() {
    this.contacts = [];
    this.http.get<ContactAPIModel[]>('/Contacts?pageNumber=' + this.page).subscribe(result => {
      this.contacts = result;
    }, error => console.error(error));
  }

  public onDeleteClick(event: any, contactID: number) {
    console.log('Delete Contact: ' + contactID);
    this.http.delete('/Contacts?id=' + contactID).subscribe(result => {
      this.refreshData();
      alert("Deleted Successfully");
    }, error => console.error(error));
  }

  onAddClick() {
    this.router.navigate(['/Modify']);
  }

  onEditClick(event: any, contactID: number) {
    this.router.navigate(['/Modify', { id: contactID }]);
  }

  onNextPageClick() {
    this.page++;
    this.refreshData();
  }

  onPreviousPageClick() {
    if (this.page == 1) {
      alert("First Page Reached");
      return;
    }

    this.page--;
    this.refreshData();
  }
}
