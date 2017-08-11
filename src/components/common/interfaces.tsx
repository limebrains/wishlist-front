export interface Iwishlist {
  name: string;
  description?: string;
  date_created: string;
  date_updated: string;
  pk: number;
  items?: Iitem[];
  length: number;
  expand: boolean;
  owner: Iuser;
  users: Iuser[];

}

export interface Imodal {
  loginModal: boolean,
}

interface Iitem {
  pk: number;
  name: string;
}

export interface Iuser {
  email: string;
  username: string;
  pk: number
}
