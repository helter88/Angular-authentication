import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanLoadGuard } from './auth/auth-can-load.guard';

const routes: Routes = [
  {path: "inbox", 
  canLoad: [AuthCanLoadGuard],
  loadChildren: () => import("./inbox/inbox.module").then(mod => mod.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
