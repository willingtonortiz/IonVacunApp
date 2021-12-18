import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';

import { Certificate, EMPTY_CERTIFICATE } from '../models/certificate';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.page.html',
  styleUrls: ['./certificate-detail.page.scss'],
})
export class CertificateDetailPage implements OnInit {
  @ViewChild('barcode', { static: true })
  canvasElement!: ElementRef;

  certificate: Certificate = EMPTY_CERTIFICATE;

  constructor(
    private readonly certificateService: CertificateService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const certificateId = this.route.snapshot.params.id as string;

    this.certificateService
      .getOneCachedById(certificateId)
      .subscribe((certificate) => {
        this.certificate = certificate;
        this.loadQRCode(certificate.qrData);
      });
  }

  async loadQRCode(value: string): Promise<void> {
    await QRCode.toCanvas(this.canvasElement.nativeElement, value, {
      width: 300,
    });
  }

  downloadPdf() {}
}
