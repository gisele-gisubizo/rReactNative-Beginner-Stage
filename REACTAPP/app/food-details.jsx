import { SafeAreaView, StyleSheet, Text, View, useColorScheme, Image, Alert } from 'react-native';
import { useEffect } from 'react';
import { Colors } from '../constants/Colors';
import { useAuth } from '../context/AuthContext';
import { useLocalSearchParams } from 'expo-router';

// Static image mapping
const imageMap = {
  'pet-food-1.webp': require('../assets/images/pet-food-1.webp'),
  'pet-food-2.webp': require('../assets/images/pet-food-2.webp'),
  'pet-food-3.webp': require('../assets/images/pet-food-3.webp'),
  'pet-food-4.webp': require('../assets/images/pet-food-4.webp'),
};

const FoodDetails = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user } = useAuth();
  const { name, price, description, imagePath, postedBy } = useLocalSearchParams();

  useEffect(() => {
    if (!user) {
      console.log('User not authenticated, redirecting to /login');
    }
    console.log('Received params:', { name, price, description, imagePath, postedBy }); // Debug log
  }, [user]);

  if (!user || !name) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>No details available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageSource = imagePath ? imageMap[imagePath] : null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>{name}</Text>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            onError={() => {
              console.log('Image load failed for:', name);
              Alert.alert('Error', 'Image not found: ' + name);
            }}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: theme.text + '20' }]}>
            <Text style={{ color: theme.text }}>No Image</Text>
          </View>
        )}
        <View style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Price</Text>
          <Text style={[styles.text, { color: theme.text }]}>${price || 'N/A'}</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
          <Text style={[styles.text, { color: theme.text }]}>{description || 'N/A'}</Text>
          {user.role === 'Admin' && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Posted By</Text>
              <Text style={[styles.text, { color: theme.text }]}>{postedBy || 'Unknown'}</Text>
            </>
          )}
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
    width: 300,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
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