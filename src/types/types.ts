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
  filterHeaders: TripData[];
  sortable: boolean;
  caption: string;
  rows: string[];
  setFilterHeaders: () => void;
}
