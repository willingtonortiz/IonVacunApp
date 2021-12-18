export type Certificate = {
  id: string;
  name: string;
  documentType: string;
  document: string;
  birthDate: Date;
  genre: string;
  nationality: string;
  vaccine: string;
  qrData: string;
  doses: Dose[];
  issueBy: string;
  issueDate: Date;
};

export type Dose = {
  order: number;
  name: string;
  vaccinationDate: Date;
  manufacturer: string;
  vaccinationPlace: string;
};

export const EMPTY_CERTIFICATE: Certificate = {
  id: '',
  name: '',
  documentType: '',
  document: '',
  birthDate: new Date(),
  genre: '',
  nationality: '',
  vaccine: '',
  qrData: '',
  doses: [],
  issueBy: '',
  issueDate: new Date(),
};
