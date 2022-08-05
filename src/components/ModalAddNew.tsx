import React, {useId} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {IContact} from '../@types';

interface Props {
  onSubmit: (body: IContact, error?: boolean) => void;
}

const ModalAddNew: React.FC<Props> = ({onSubmit}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const id = useId();

  const validateEmail = (text: string) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    setEmail(text);
    if (!reg.test(text)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handleSubmit = () => {
    if (emailError) {
      return;
    }
    onSubmit({name, email, phone, id}, emailError);
  };

  return (
    <View style={styles.container}>
      <Text>Add New Contact</Text>
      <View>
        <View style={styles.blockContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        </View>
        <View style={styles.blockContainer}>
          <TextInput
            style={{
              ...styles.input,
              ...{borderColor: emailError ? 'red' : 'gray'},
            }}
            value={email}
            onChangeText={validateEmail}
            placeholder="Email"
          />
        </View>
        <View style={styles.blockContainer}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            placeholder="Phone"
          />
        </View>
        <Button title="Add" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  inputError: {
    borderColor: 'red',
  },
});

export default ModalAddNew;
