import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GridstackComponent } from './gridstack/gridstack.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'grid',
    component: DashboardComponent,
    children: [{ path: '', component: GridstackComponent }],
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent },
];
