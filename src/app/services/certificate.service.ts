import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Certificate } from '../models/certificate';

const CERTIFICATES_KEY = 'CERTIFICATES_KEY';

@Injectable({ providedIn: 'root' })
export class CertificateService {
  constructor(private readonly storage: Storage) {}

  getAllCached(): Observable<Certificate[]> {
    return from(
      this.storage.get(CERTIFICATES_KEY) as Promise<Certificate[] | null>
    ).pipe(
      map((certificates) => {
        if (!certificates) {
          return [];
        }

        return certificates;
      })
    );
  }

  getOneCachedById(id: string): Observable<Certificate> {
    return from(
      this.storage.get(CERTIFICATES_KEY) as Promise<Certificate[] | null>
    ).pipe(
      map((certificates: Certificate[] | null) => {
        if (!certificates) {
          throw Error('Not found');
        }

        const certificate = certificates.find((x) => x.id === id);
        if (!certificate) {
          throw Error('Not found');
        }

        return certificate;
      })
    );
  }

  async saveOneToCache(certificate: Certificate) {
    const certificatesPromise = this.storage.get(CERTIFICATES_KEY) as Promise<
      Certificate[] | null
    >;
    const certificates = (await certificatesPromise) ?? [];
    const newCertificates = [...certificates, certificate];
    await this.storage.set(CERTIFICATES_KEY, newCertificates);
  }

  async deleteOneCached(id: string) {
    const certificatesPromise = this.storage.get(CERTIFICATES_KEY) as Promise<
      Certificate[] | null
    >;
    const certificates = (await certificatesPromise) ?? [];
    const newCertificates = certificates.filter((x) => x.id !== id);
    await this.storage.set(CERTIFICATES_KEY, newCertificates);
  }
}
