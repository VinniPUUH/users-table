interface IUser {
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: string;
  location: {
    city: string;
  };
  name: {
    first: string;
    last: string;
  };
  nat: string;
  phone: string;
  picture: {
    thumbnail: string;
  };
}

export type { IUser };
