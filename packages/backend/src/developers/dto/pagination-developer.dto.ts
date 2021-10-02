interface DevInterface {
  name: string;
  age: string;
  hobby: Array<any>;
}
export class PaginationDTO {
  data: any;
  page: number;
  limit: number;
  totalCount: number;
}
