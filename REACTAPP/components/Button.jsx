import { Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const Button = ({ title, onPress, style }) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? theme.primary + '80' : theme.primary },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.title }]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});