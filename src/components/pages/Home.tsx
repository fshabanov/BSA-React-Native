import React, {useContext, useEffect, useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import {ContactBlock} from '../ContactBlock';
import {IContact} from '../../@types';
import {filter} from '../../helpers/filter';
import Loader from '../Loader';
import ModalAddNew from '../ModalAddNew';
import {DataContext} from '../../context/dataContext';
type RootStackParamList = {
  Home: undefined;
  Contact: {contact: IContact};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  const {data, loading, addContact} = useContext(DataContext);
  const [dataToShow, setDataToShow] = useState<IContact[]>(data);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  useEffect(() => {
    setDataToShow(filter(data, search));
  }, [data, search]);

  const handleClick = (contact: IContact) => {
    navigation.navigate('Contact', {contact});
  };

  const handleAdd = (body: IContact, error?: boolean) => {
    if (error) {
      return;
    }
    addContact(body);
    handleModalClose();
    navigation.navigate('Contact', {contact: body});
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Add new contact" onPress={handleModalOpen} />

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={handleModalClose}>
        <ModalAddNew onSubmit={handleAdd} />
      </Modal>

      <ScrollView contentContainerStyle={styles.contactBlock}>
        {dataToShow.map(contact => (
          <ContactBlock
            key={contact.id}
            {...contact}
            onClick={() => handleClick(contact)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contactBlock: {
    justifyContent: 'center',
  },
  search: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export {Home};
