export interface CertificationExam {
  id: string;
  companyId: string;
  officialCertificationId: string;
  certificateTitle: string;
  description: string;
  price: number;
  priceMillimes: number;
  date: string;
  addressName: string;
  addressLink: string;
  timeStart: string;
  timeEnd: string;
  capacity: number;
  bookedSeats: number;
  seatsLeft: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CertificationExamsPaginatedResponse {
  items: CertificationExam[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ListCertificationExamsQuery {
  officialCertificationId?: string;
  page?: number;
  limit?: number;
}
