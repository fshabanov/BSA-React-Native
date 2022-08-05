import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {imagePlaceholder} from '../data';

interface Props {
  name: string;
  email: string;
  onClick: () => void;
}

const ContactBlock: React.FC<Props> = ({name, email, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <Image
          source={{
            uri: imagePlaceholder,
          }}
          style={styles.image}
        />
        <View style={styles.data}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  data: {
    flexDirection: 'column',
    flex: 2,
  },
  text: {
    color: 'white',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});

export {ContactBlock};
