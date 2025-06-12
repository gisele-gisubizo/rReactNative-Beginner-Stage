import { SafeAreaView, StyleSheet, Text, View, useColorScheme, FlatList, Image, Alert } from 'react-native';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

const petFoods = [
  {
    id: '1',
    name: 'Premium Dog Kibble',
    description: 'Nutritious kibble for adult dogs.',
    image: '../assets/images/pet-food-1',
    ingredients: ['Chicken', 'Rice', 'Vegetables', 'Vitamins'],
    composition: 'Protein: 25%, Fat: 15%, Fiber: 3%',
  },
  {
    id: '2',
    name: 'Cat Wet Food',
    description: 'Tasty wet food for cats.',
    image: '../assets/images/pet-food-2',
    ingredients: ['Tuna', 'Chicken', 'Water', 'Minerals'],
    composition: 'Protein: 20%, Fat: 10%, Moisture: 75%',
  },
  {
    id: '3',
    name: 'Puppy Formula',
    description: 'Special formula for growing puppies.',
    image: '../assets/images/pet-food-3',
    ingredients: ['Beef', 'Oats', 'Milk', 'Calcium'],
    composition: 'Protein: 28%, Fat: 18%, Fiber: 2%',
  },
];

const PetFoods = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  const renderFoodItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={() => Alert.alert('Error', 'Image not found: ' + item.image)}
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: theme.text + '20' }]}>
          <Text style={{ color: theme.text }}>No Image</Text>
        </View>
      )}
      <Text style={[styles.foodName, { color: theme.text }]}>{item.name}</Text>
      <Text style={[styles.description, { color: theme.text }]}>{item.description}</Text>
      <Button
        title="Read More"
        onPress={() => router.push(`/food-details?id=${item.id}`)}
        style={styles.readMoreButton}
      />
    </View>
  );

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Pet Foods</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Welcome, {user.email}!</Text>
        <FlatList
          data={petFoods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
        <Button title="Log Out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

export default PetFoods;

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
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Elevation on the card (View), not Image
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  readMoreButton: {
    padding: 10,
    width: '50%',
    alignSelf: 'center',
  },
});