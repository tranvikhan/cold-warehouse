
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
      return jsonValue;
    } catch (e) {
        return e;
    }
  }

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }
    } catch(e) {
        return e;
    }
}