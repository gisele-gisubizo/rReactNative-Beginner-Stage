import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [petFoods, setPetFoods] = useState([]); // Store all pet foods globally

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedPetFoods = await AsyncStorage.getItem('petFoods');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedPetFoods) {
          const parsedPetFoods = JSON.parse(storedPetFoods);
          setPetFoods(Array.isArray(parsedPetFoods) ? parsedPetFoods : []);
        } else {
          // Default pet foods with local images only if no data exists
          const defaultPetFoods = [
            {
              id: '1',
              name: 'Pet Food 1',
              price: 10.99,
              description: 'Delicious food for pets.',
              localImage: require('../assets/images/pet-food-1.webp'),
              postedBy: 'admin@example.com',
            },
            {
              id: '2',
              name: 'Pet Food 2',
              price: 15.99,
              description: 'Nutritious meal for dogs.',
              localImage: require('../assets/images/pet-food-2.webp'),
              postedBy: 'admin@example.com',
            },
            {
              id: '3',
              name: 'Pet Food 3',
              price: 12.99,
              description: 'Healthy cat food.',
              localImage: require('../assets/images/pet-food-3.webp'),
              postedBy: 'admin@example.com',
            },
            {
              id: '4',
              name: 'Pet Food 4',
              price: 8.99,
              description: 'Treats for pets.',
              localImage: require('../assets/images/pet-food-4.webp'),
              postedBy: 'admin@example.com',
            },
          ];
          setPetFoods(defaultPetFoods);
          await AsyncStorage.setItem('petFoods', JSON.stringify(defaultPetFoods));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setPetFoods([]);
      }
    };
    loadData();
  }, []);

  const signIn = async (email, password, role) => {
    if (email && password) {
      const userData = { email, role };
      setUser(userData);
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };

  const signUp = async (email, password, role) => {
    if (email && password) {
      const userData = { email, role };
      setUser(userData);
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };

  const signOut = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing user:', error);
    }
  };

  const addPetFood = async (petFood) => {
    if (!user || user.role !== 'Admin') return;
    const updatedPetFoods = [...petFoods, { ...petFood, id: Date.now().toString(), postedBy: user.email }];
    setPetFoods(updatedPetFoods);
    try {
      await AsyncStorage.setItem('petFoods', JSON.stringify(updatedPetFoods));
    } catch (error) {
      console.error('Error saving pet food:', error);
    }
  };

  const updatePetFood = async (id, updatedPetFood) => {
    if (!user || user.role !== 'Admin') return;
    const updatedPetFoods = petFoods.map((food) =>
      food.id === id ? { ...food, ...updatedPetFood } : food
    );
    setPetFoods(updatedPetFoods);
    try {
      await AsyncStorage.setItem('petFoods', JSON.stringify(updatedPetFoods));
    } catch (error) {
      console.error('Error updating pet food:', error);
    }
  };

  const deletePetFood = async (id) => {
    if (!user || user.role !== 'Admin') return;
    const updatedPetFoods = petFoods.filter((food) => food.id !== id);
    setPetFoods(updatedPetFoods);
    try {
      await AsyncStorage.setItem('petFoods', JSON.stringify(updatedPetFoods));
    } catch (error) {
      console.error('Error deleting pet food:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, petFoods, signIn, signUp, signOut, addPetFood, updatePetFood, deletePetFood }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}