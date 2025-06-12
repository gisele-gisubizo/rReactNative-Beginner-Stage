import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const Crud = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState([
    { id: '1', name: 'Dog', price: 100 },
    { id: '2', name: 'Cat', price: 80 },
  ]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const addOrUpdatePet = () => {
    if (!name.trim() || !price.trim()) return;
    if (editingPet) {
      setPets(pets.map((pet) =>
        pet.id === editingPet.id ? { ...pet, name, price: parseFloat(price) || 0 } : pet
      ));
      setEditingPet(null);
    } else {
      setPets([...pets, { id: Date.now().toString(), name, price: parseFloat(price) || 0 }]);
    }
    setName('');
    setPrice('');
  };

  const editPet = (pet) => {
    setEditingPet(pet);
    setName(pet.name);
    setPrice(pet.price.toString());
  };

  const deletePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Manage Pets</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Pet Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme.text + '80'}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          placeholderTextColor={theme.text + '80'}
          keyboardType="numeric"
        />
        <Button title={editingPet ? 'Update Pet' : 'Add Pet'} onPress={addOrUpdatePet} />
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: theme.background, borderColor: theme.text + '33' }]}>
              <Text style={[styles.text, { color: theme.text }]}>{item.name} - ${item.price}</Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => editPet(item)} style={styles.actionButton} />
                <Button title="Delete" onPress={() => deletePet(item.id)} style={[styles.actionButton, { backgroundColor: '#FF3B30' }]} />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Crud;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginHorizontal: 5,
    padding: 8,
    width: 80,
  },
});