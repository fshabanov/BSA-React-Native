interface IContact {
  name: string;
  phone: string;
  email: string;
  id: number | string;
}

interface IContext {
  data: IContact[];
  addContact: (contact: IContact) => void;
  deleteContact: (id: number) => void;
  loading: boolean;
}

export type {IContact, IContext};
