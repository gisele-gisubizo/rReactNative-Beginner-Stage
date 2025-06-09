import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, Button as RNButton, FlatList } from 'react-native';
import { useState } from 'react';
import { Colors } from '../constants/Colors';

const Crud = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] ?? Colors.light;
  const [pets, setPets] = useState([
    { id: '1', name: 'Dog', price: 100 },
    { id: '2', name: 'Cat', price: 80 },
  ]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const addPet = () => {
    if (name.trim() && price.trim()) {
      setPets([...pets, { id: Date.now().toString(), name, price: parseFloat(price) || 0 }]);
      setName('');
      setPrice('');
    }
  };

  const updatePet = (id, newName, newPrice) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, name: newName, price: newPrice } : pet));
  };

  const deletePet = (id) => {
    setPets(pets.filter(pet => pet.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Manage Pets</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Pet Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme.text}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          placeholderTextColor={theme.text}
          keyboardType="numeric"
        />
        <RNButton title="Add Pet" onPress={addPet} color={theme.text} />
        <FlatList
          data={pets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={[styles.text, { color: theme.text }]}>{item.name} - ${item.price}</Text>
              <RNButton title="Delete" onPress={() => deletePet(item.id)} color={theme.text} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Crud;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  color:'black',
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  text: { fontSize: 16 },
});