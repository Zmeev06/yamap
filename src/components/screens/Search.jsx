import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../Layout';

const Search = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Все заправки</Text>
        <TextInput
          placeholder="Начните искать заправку"
          style={styles.input}></TextInput>
      </View>
      <View>
        <TouchableOpacity>
          <View>
            <Text>
                
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: '#f2f2f2',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 350,
    backgroundColor: '#f2f2f2',
    marginTop: 20,
    paddingLeft: 20,
  },
});

export default Search;
