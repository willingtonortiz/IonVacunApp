import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from '@lukeed/uuid';
import { timer } from 'rxjs';

import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.page.html',
  styleUrls: ['./add-certificate.page.scss'],
})
export class AddCertificatePage {
  form: FormGroup;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly certificateService: CertificateService
  ) {
    this.form = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      documentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]{8}$/),
        ],
      ],
      birthDate: [new Date().toISOString(), [Validators.required]],
      issueDate: [new Date().toISOString(), [Validators.required]],
    });
  }

  get fdocumentType(): AbstractControl {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('documentType')!;
  }

  get fdocumentNumber(): AbstractControl {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('documentNumber')!;
  }

  get fbirthDate(): AbstractControl {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('birthDate')!;
  }

  get fissueDate(): AbstractControl {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.form.get('issueDate')!;
  }

  async addCertificate(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    await timer(3000).toPromise();

    const certificateId = uuidv4();
    this.certificateService.saveOneToCache({
      id: certificateId,
      documentType: this.fdocumentType.value,
      document: this.fdocumentNumber.value,
      birthDate: this.fbirthDate.value,
      issueDate: this.fissueDate.value,
      qrData: certificateId,
      name: 'Ricardo Daniel Iglesias Espinoza',
      genre: 'Masculino',
      nationality: 'PERU',
      vaccine: 'Vacuna contra Covid',
      issueBy: 'Ministerio de Salud del Perú',
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
    });

    this.isLoading = false;
    this.router.navigateByUrl('/home');
  }
}
