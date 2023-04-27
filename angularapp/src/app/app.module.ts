import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ListContactComponent,
    EditContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'Modify', component: EditContactComponent },
      { path: 'List', component: ListContactComponent },
      { path: '', redirectTo: '/List', pathMatch: 'full' },
    ]),
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
