import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as QRCode from 'qrcode';

import { Certificate, EMPTY_CERTIFICATE } from '../../../models/certificate';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements AfterViewInit {
  @ViewChild('barcode', { static: true })
  canvasElement: ElementRef;

  @Input()
  certificate: Certificate = EMPTY_CERTIFICATE;

  constructor() {}

  async ngAfterViewInit() {
    await QRCode.toCanvas(
      this.canvasElement.nativeElement,
      this.certificate.qrData,
      {
        width: 300,
      }
    );
  }

  deleteCertifcate() {
    console.log('CLICKED');
  }
}
