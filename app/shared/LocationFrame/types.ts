export interface BranchLocation {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  lat: number;
  lng: number;
  addressLink?: string;
  hasCoordinates?: boolean;
}
