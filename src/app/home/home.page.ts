import { Component } from '@angular/core';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { v4 as uuidv4 } from '@lukeed/uuid';
import { Certificate, EMPTY_CERTIFICATE } from '../models/certificate';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
  };

  public certificates: Certificate[] = [
    {
      ...EMPTY_CERTIFICATE,
      id: uuidv4(),
      name: 'Ricardo Daniel Iglesias Espinoza',
      qrData: 'Ricardo Daniel Iglesias Espinoza',
    },
    {
      ...EMPTY_CERTIFICATE,
      id: uuidv4(),
      name: 'Andrea Nicole Ortiz Maurtua',
      qrData: 'Andrea Nicole Ortiz Maurtua',
    },
    {
      ...EMPTY_CERTIFICATE,
      id: uuidv4(),
      name: 'Jair Orlando Huaman Bellido',
      qrData: 'Jair Orlando Huaman Bellido',
    },
  ];

  constructor() {}

  scanQr() {}
}
