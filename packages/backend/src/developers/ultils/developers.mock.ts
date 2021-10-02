import { DeveloperEntity } from '../entities/developer.entity';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
const findAllDev: {
  data: DeveloperEntity[];
  total: number;
} = {
  total: 2,
  data: [
    {
      id: '7ec904ca-d012-40fa-9eb8-f130ed669268',
      name: 'kelvin diego da silva soares',
      age: 20,
      hobby: ['musica', 'internet'],
      createdAt: '2021-10-02T16:57:14.489Z',
      updatedAt: '2021-10-02T16:57:14.489Z',
    },
    {
      id: '7ec904ch-d012-40fa-9eb8-f130ed669268',
      name: 'wellington',
      age: 40,
      hobby: ['musica', 'internet', 'futebool'],
      createdAt: '2021-10-02T16:57:14.489Z',
      updatedAt: '2021-10-02T16:57:14.489Z',
    },
  ],
};

const body: CreateDeveloperDto = {
  age: 20,
  hobby: ['Web developer', 'Music'],
  name: 'Wellington',
};

export { findAllDev, body };
