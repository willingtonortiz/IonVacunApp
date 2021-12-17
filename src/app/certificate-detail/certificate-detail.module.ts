import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificateDetailPageRoutingModule } from './certificate-detail-routing.module';

import { CertificateDetailPage } from './certificate-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificateDetailPageRoutingModule
  ],
  declarations: [CertificateDetailPage]
})
export class CertificateDetailPageModule {}
