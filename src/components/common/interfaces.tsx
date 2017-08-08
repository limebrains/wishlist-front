export interface Iwishlist {
  name: string;
  description?: string;
  date_created: string;
  date_updated: string;
  pk: number;
  items?: any;
  length: number;
  expand: boolean;
  owner: Iuser;
  users: Iuser[];

}

export interface Iuser {
  email: string;
  username: string;
  pk: number
}
