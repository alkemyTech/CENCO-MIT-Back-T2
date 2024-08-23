import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): object {
    return {
      name: 'CENCO-MIT-Back-T2',
      version: '1.0.0',
      contributors: [
        {
          name: 'Sara López',
          email: 'saralopezbz@gmail.com',
          url: 'https://github.com/saralopezbz',
        },
        {
          name: 'Gabriela Moya',
          email: 'g.moyamoreno@gmail.com',
          url: 'https://github.com/gabibot',
        },
        {
          name: 'Sara Rioseco',
          email: 'sara.rioseco@gmail.com',
          url: 'https://github.com/sara-rioseco',
        },
        {
          name: 'Silvana Vitali',
          email: 'silgivia@hotmail.com',
          url: 'https://github.com/silvanavitali',
        },
      ],
    };
  }
}
