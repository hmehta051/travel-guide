export interface TripData {
  timestamp: string | number;
  purchase_id: string;
  mail: string;
  name: string;
  source: string;
  status: string;
  select: string;
}
export interface PropsType {
  headers: TripData[];
  sortable: boolean;
  caption: string;
  rows: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: any) => void;
}
