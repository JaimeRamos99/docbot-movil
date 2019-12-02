import {AsyncStorage} from 'react-native';

export async function save (key, value){
  try {
      await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data 
  }
};

export async function get (key){
  try {
    const value = await AsyncStorage.getItem(key);
    
    return value;
  } catch (error) {
    // Error retrieving data
  }
};

export async function deleteAll (){
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Error retrieving data
  }
};