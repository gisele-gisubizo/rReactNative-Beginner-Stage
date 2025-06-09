import { Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

const Button = ({ title, onPress, style }) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#888' : theme.primary },
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
  button: { padding: 10, borderRadius: 5, alignItems: 'center', marginVertical: 10, width: '80%' },
  text: { fontSize: 16 },
});