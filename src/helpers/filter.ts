import {IContact} from '../@types';

export const filter = (data: IContact[], search: string): IContact[] => {
  return data.filter(item => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );
  });
};
