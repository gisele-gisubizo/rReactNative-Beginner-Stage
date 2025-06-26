import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Alert } from 'react-native';
import Spacer from '../../components/Spacer';

const PollPreviewScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['JavaScript', 'Python', 'Java']; // Example options
  const question = "What's your favorite programming language?"; // Example question

  const toggleOption = (index) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter((i) => i !== index));
    } else {
      setSelectedOptions([...selectedOptions, index]);
    }
  };

  const submitVote = () => {
    if (selectedOptions.length === 0) {
      Alert.alert('Error', 'Please select at least one option.');
      return;
    }
    // Here you can handle submitting the vote
    Alert.alert('Vote submitted!', `You voted for option(s): ${selectedOptions.map(i => options[i]).join(', ')}`);
  };

  return (
    <View style={styles.container}>
      <Spacer />
      <Text style={styles.question}>{question}</Text>
      <FlatList
        data={options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedOptions.includes(index) && styles.optionSelected,
            ]}
            onPress={() => toggleOption(index)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Submit Vote" onPress={submitVote} color="#6A0DAD" />
    </View>
  );
};

export default PollPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  question: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  option: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionSelected: {
    backgroundColor: '#6a11cb',
    borderColor: '#6a11cb',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});