import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificateDetailPage } from './certificate-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: CertificateDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificateDetailPageRoutingModule {}
