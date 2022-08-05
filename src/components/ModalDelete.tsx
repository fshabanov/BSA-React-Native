import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
}

const ModalDelete: React.FC<Props> = ({onClose, onSubmit}) => {
  return (
    <View style={styles.container}>
      <Text>Are you sure you want to delete this contact?</Text>
      <View style={styles.buttons}>
        <Button title="Delete" onPress={onSubmit} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30,
  },
});

export {ModalDelete};
