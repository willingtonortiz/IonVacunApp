import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';
import { Certificate, EMPTY_CERTIFICATE } from '../models/certificate';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.page.html',
  styleUrls: ['./certificate-detail.page.scss'],
})
export class CertificateDetailPage implements OnInit, AfterViewInit {
  @ViewChild('barcode', { static: true })
  canvasElement: ElementRef;

  certificate: Certificate = EMPTY_CERTIFICATE;

  constructor(
    private readonly certificateService: CertificateService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const certificateId = this.route.snapshot.params.id as string;

    // this.certificateService
    //   .getOneCachedById(certificateId)
    //   .subscribe((certificate) => (this.certificate = certificate));

    this.certificate = {
      ...EMPTY_CERTIFICATE,
      id: certificateId,
      qrData: certificateId,
      name: 'Ricardo Daniel Iglesias Espinoza',
      document: 'DNI: 20729995',
      birthDate: new Date('1999/08/03'),
      genre: 'Masculino',
      nationality: 'PERU',
      vaccine: 'Vacuna contra Covid',
      issueBy: 'Ministerio de Salud del Perú',
      issueDate: new Date('1999/08/03'),
      doses: [
        {
          order: 2,
          name: '2da dosis',
          vaccinationDate: new Date('2021/08/03'),
          manufacturer: 'PFIZER (FFH244)',
          vaccinationPlace:
            'LA LIBERTAD - UPAO (Movil y Peatonal) - LA LIBERTAD TRUJILLO TRUJILLO',
        },
        {
          order: 1,
          name: '1ra dosis',
          vaccinationDate: new Date('2021/08/03'),
          manufacturer: 'PFIZER (FFH244)',
          vaccinationPlace:
            'LA LIBERTAD - UPAO (Movil y Peatonal) - LA LIBERTAD TRUJILLO TRUJILLO',
        },
      ],
    };
  }

  async ngAfterViewInit() {
    await QRCode.toCanvas(
      this.canvasElement.nativeElement,
      this.certificate.qrData,
      {
        width: 300,
      }
    );
  }

  downloadPdf() {}
}
