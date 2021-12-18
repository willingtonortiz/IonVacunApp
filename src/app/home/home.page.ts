import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { v4 as uuidv4 } from '@lukeed/uuid';

import { Certificate, EMPTY_CERTIFICATE } from '../models/certificate';
import { CertificateService } from '../services/certificate.service';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter {
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
  };

  public certificates: Certificate[] = [];

  constructor(
    private readonly router: Router,
    private readonly certificateService: CertificateService,
    private readonly alertController: AlertController
  ) {}

  ionViewDidEnter(): void {
    this.loadAllCertificates();
  }

  scanQr() {}

  addCertificate(): void {
    this.router.navigateByUrl('/add-certificate');
  }

  async deleteCertificate(certificateId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar certificado',
      message: '¿Estas seguro de eliminar el certificado?',
      buttons: [
        { text: 'Eliminar', role: 'DELETE' },
        { text: 'Cancelar', role: 'CANCEL' },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role === 'CANCEL') {
      return;
    }

    await this.certificateService.deleteOneCached(certificateId);
    this.loadAllCertificates();
  }

  loadAllCertificates(): void {
    this.certificateService
      .getAllCached()
      .subscribe((certificates) => (this.certificates = certificates));
  }
}
