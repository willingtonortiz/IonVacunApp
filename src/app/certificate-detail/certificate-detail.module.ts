import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CertificateDetailPageRoutingModule } from './certificate-detail-routing.module';
import { CertificateDetailPage } from './certificate-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificateDetailPageRoutingModule,
    NgxSpinnerModule,
  ],
  declarations: [CertificateDetailPage],
})
export class CertificateDetailPageModule {}
