import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../constants/Colors.jsx';
import { useTheme } from '../app/utils/useTheme';

const Button = ({ title, onPress, style, disabled }) => {
  const colorScheme = useTheme();
  const theme = Colors[colorScheme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: disabled ? theme.text + '33' : theme.primary },
        pressed && !disabled && styles.pressed,
        style,
      ]}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;