interface DevInterface {
  name: string;
  age: string;
  hobby: Array<any>;
}
export class PaginationDTO {
  data: Array<DevInterface>;
  page: number;
  limit: number;
  totalCount: number;
}
