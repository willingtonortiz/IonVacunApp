import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

import { Certificate } from '../models/certificate';

@Injectable({ providedIn: 'root' })
export class CertificateService {
  constructor(private readonly storage: Storage) {}

  getOneCachedById(id: string): Observable<Certificate> {
    return from(this.storage.get(id));
  }

  async saveOneToCached(certificate: Certificate) {
    await this.storage.set(certificate.id, certificate);
  }
}
