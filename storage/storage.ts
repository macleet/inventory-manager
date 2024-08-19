import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';

export const createStorage = async (key: string) => {
    key = key.toLowerCase();
    try {
        const values = await AsyncStorage.getItem(key);
        if (!values) {
            await AsyncStorage.setItem(key, JSON.stringify([]));
        }
    } catch (error) {
        console.error(error);
    }
};

export const getFrom = async (key: string) => {
    key = key.toLowerCase();
    try {
        const values = await AsyncStorage.getItem(key);
        return values;
    } catch (error) {
        console.error(error);
    }
};

export const addTo = async (key: string, newValue: string) => {
    key = key.toLowerCase();
    try {
        const result = await AsyncStorage.getItem(key);
        if (result === null) {
            return;
        }
        const values: string[] = JSON.parse(result);
        values.push(newValue);
        await AsyncStorage.setItem(key, JSON.stringify(values));
    } catch (error) {
        console.error(error);
    }
};

export const deleteAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error(error);
    }
};
