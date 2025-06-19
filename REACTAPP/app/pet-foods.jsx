import { SafeAreaView, StyleSheet, Text, View, useColorScheme, FlatList, Image, Alert } from 'react-native';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

// Static image mapping
const imageMap = {
  'pet-food-1.webp': require('../assets/images/pet-food-1.webp'),
  'pet-food-2.webp': require('../assets/images/pet-food-2.webp'),
  'pet-food-3.webp': require('../assets/images/pet-food-3.webp'),
  'pet-food-4.webp': require('../assets/images/pet-food-4.webp'),
};

const PetFoods = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, petFoods, signOut } = useAuth();
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

  const renderFoodItem = ({ item }) => {
    console.log('Rendering item:', item); // Debug log
    const imageSource = item.imagePath ? imageMap[item.imagePath] : null;
    return (
      <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            onError={() => {
              console.log('Image load failed for:', item.name);
              Alert.alert('Error', 'Image not found: ' + item.name);
            }}
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
          onPress={() => router.push({
            pathname: '/food-details',
            params: {
              name: item.name,
              price: item.price,
              description: item.description,
              imagePath: item.imagePath,
              postedBy: item.postedBy
            }
          })}
          style={styles.readMoreButton}
        />
      </View>
    );
  };

  if (!user) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Pet Foods</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Welcome, {user.name}!</Text>
        <FlatList
          data={petFoods || []}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={[styles.text, { color: theme.text }]}>No pet foods available.</Text>}
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
    elevation: 2,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
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
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});