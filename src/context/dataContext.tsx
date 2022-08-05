import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import {IContact, IContext} from '../@types';

const DataContext = createContext<IContext>({
  data: [],
  loading: false,
  deleteContact: () => {},
  addContact: () => {},
});

const DataContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [data, setData] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteContact = (id: number | string) => {
    const newData = data.filter((contact: IContact) => contact.id !== id);
    setData(newData);
  };
  const addContact = (contact: IContact) => {
    setData([...data, contact]);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((users: IContact[]) => {
        setData(users);
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{data, loading, deleteContact, addContact}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export {DataContext};
