
export class Player {
  name: string;
  country: string;
  age: number;
  point: number;
  tournaments: number;
  id?: number;


  constructor(name: string, country: string, age: number, point: number, tournaments: number, id?: number) {
    this.name = name;
    this.country = country;
    this.age = age;
    this.point = point;
    this.tournaments = tournaments;
    this.id = id;
  }
}
