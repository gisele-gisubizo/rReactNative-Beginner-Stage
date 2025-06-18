import { SafeAreaView, StyleSheet, Text, TextInput, View, useColorScheme, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const Crud = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, petFoods, addPetFood, updatePetFood, deletePetFood } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingFood, setEditingFood] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      router.push('/pet-foods');
    }
  }, [user, router]);

  const addOrUpdatePetFood = () => {
    if (!name.trim() || !price.trim() || !description.trim()) return;
    const petFoodData = {
      name,
      price: parseFloat(price) || 0,
      description,
      imageUrl: imageUrl.trim() || null,
    };
    if (editingFood) {
      updatePetFood(editingFood.id, petFoodData);
      setEditingFood(null);
    } else {
      addPetFood(petFoodData);
    }
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  const editPetFood = (food) => {
    setEditingFood(food);
    setName(food.name);
    setPrice(food.price.toString());
    setDescription(food.description);
    setImageUrl(food.imageUrl || '');
  };

  const handleDeletePetFood = (id) => {
    deletePetFood(id);
  };

  if (!user || user.role !== 'Admin') return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Manage Pet Foods</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Pet Food Name"
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
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={theme.text + '80'}
          multiline
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholderTextColor={theme.text + '80'}
          keyboardType="url"
        />
        <Button title={editingFood ? 'Update Pet Food' : 'Add Pet Food'} onPress={addOrUpdatePetFood} />
        <FlatList
          data={petFoods || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: theme.background, borderColor: theme.text + '33' }]}>
              <Text style={[styles.text, { color: theme.text }]}>{item.name} - ${item.price}</Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => editPetFood(item)} style={styles.actionButton} />
                <Button title="Delete" onPress={() => handleDeletePetFood(item.id)} style={[styles.actionButton, { backgroundColor: '#FF3B30' }]} />
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