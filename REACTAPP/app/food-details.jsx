import { SafeAreaView, StyleSheet, Text, View, useColorScheme, Image, Alert } from 'react-native';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter, useSearchParams } from 'expo-router'; // Explicitly import useSearchParams

const petFoods = [
  {
    id: '1',
    name: 'Premium Dog Kibble',
    description: 'Nutritious kibble for adult dogs.',
    image: '../assets/images/pet-food-1.webp',
    ingredients: ['Chicken', 'Rice', 'Vegetables', 'Vitamins'],
    composition: 'Protein: 25%, Fat: 15%, Fiber: 3%',
  },
  {
    id: '2',
    name: 'Cat Wet Food',
    description: 'Tasty wet food for cats.',
    image: '../assets/images/pet-food-2.webp',
    ingredients: ['Tuna', 'Chicken', 'Water', 'Minerals'],
    composition: 'Protein: 20%, Fat: 10%, Moisture: 75%',
  },
  {
    id: '3',
    name: 'Puppy Formula',
    description: 'Special formula for growing puppies.',
    image: '../assets/images/pet-food-3.webp',
    ingredients: ['Beef', 'Oats', 'Milk', 'Calcium'],
    composition: 'Protein: 28%, Fat: 18%, Fiber: 2%',
  },
];

const FoodDetails = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useSearchParams(); // Using useSearchParams to get the id parameter

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const food = petFoods.find((item) => item.id === id);

  if (!user || !food) {
    return null; // Return null if food is not found to avoid rendering errors
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>{food.name}</Text>
        {food.image ? (
          <Image
            source={{ uri: food.image }}
            style={styles.image}
            onError={() => Alert.alert('Error', 'Image not found: ' + food.image)}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: theme.text + '20' }]}>
            <Text style={{ color: theme.text }}>No Image</Text>
          </View>
        )}
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
          <Text style={[styles.text, { color: theme.text }]}>{food.description}</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Ingredients</Text>
          {food.ingredients.map((ingredient, index) => (
            <Text key={index} style={[styles.text, { color: theme.text }]}>• {ingredient}</Text>
          ))}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Composition</Text>
          <Text style={[styles.text, { color: theme.text }]}>{food.composition}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetails;

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
  image: {
    width: '100%',
    height: 200,
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
  card: {
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
});