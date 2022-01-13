import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

import { Certificate } from '../models/certificate';
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

  async scanQr(): Promise<void> {
    await BarcodeScanner.hideBackground(); // make background of WebView transparent
    console.log('FIRST');

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    console.log('SECOND');

    // if the result has content
    if (result.hasContent) {
      console.log('THIRD');
      console.log(result.content); // log the raw scanned content
    }

    console.log('FOURTH');
  }

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
