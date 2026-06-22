export interface OfficialCertification {
  _id: string;
  title: string;
  subtitle: string;
  tag: string;
  desc: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CertificationsPage {
  _id: string;
  companyId: string;
  countriesRepresented: number;
  globalPartners: number;
  officialCertifications: OfficialCertification[];
  faqs: FaqItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
