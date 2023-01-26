export type ID = string | number;

export interface Category {
    name: string;
    id: ID;
    color: string;
}

export interface Service {
  name: string;
  cost: number;
  description: string;
  id: ID;
}

export interface Project {
  name: string;
  budget: number;
  cost: number;
    id: ID;
    Services: Service[];
    Category: Category;
}