import React, {useContext, useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  View,
  StyleSheet,
  Image,
  TextInput,
  Linking,
  Modal,
} from 'react-native';
import {IContact} from '../../@types';
import {imagePlaceholder} from '../../data';
import {ModalDelete} from '../ModalDelete';
import Loader from '../Loader';
import {useLoading} from '../../hooks/useLoading';
import {DataContext} from '../../context/dataContext';

type RootStackParamList = {
  Home: undefined;
  Contact: {contact: IContact};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;

const Contact: React.FC<Props> = ({navigation, route}) => {
  const [showModal, setShowModal] = useState(false);
  const {loading, startLoading, stopLoading} = useLoading(false);
  const {contact} = route.params;
  const {deleteContact} = useContext(DataContext);

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const handleDelete = () => {
    startLoading();
    fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
      method: 'DELETE',
    }).then(() => {
      deleteContact(contact.id);
      setShowModal(false);
      navigation.goBack();
      stopLoading();
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Image source={{uri: imagePlaceholder}} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={contact.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={contact.phone}
        />
        <View style={styles.buttons}>
          <Button title="Call" onPress={handleCall} />
          <Button title="Delete" onPress={handleModalOpen} />
        </View>
      </View>
      <Button title="Go Back" onPress={() => navigation.navigate('Home')} />
      <Modal
        animationType="slide"
        // transparent
        visible={showModal}
        onRequestClose={handleModalClose}>
        <ModalDelete onClose={handleModalClose} onSubmit={handleDelete} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
});

export {Contact};
