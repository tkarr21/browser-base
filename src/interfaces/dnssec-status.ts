export interface IDnssecStatus {
  status?: string;
  ignored?: boolean;
  host?: string;
  edns_error?: number;
}
