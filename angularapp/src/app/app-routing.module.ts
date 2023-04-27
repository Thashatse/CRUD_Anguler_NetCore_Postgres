import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
    children: []
  },
  {
    path: 'ModifyContact',
    pathMatch: 'full',
    component: EditContactComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
