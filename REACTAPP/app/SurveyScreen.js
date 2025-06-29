import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SurveyScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ageRange: '',
    city: '',
    communicationMethod: '',
    priorityProject: '',
    eventFrequency: '',
  });

  const ageRanges = ['Under 18', '18-25', '26-35', '36-50', '50+'];
  const communicationMethods = ['Social media', 'Newsletters', 'Mobile apps', 'SMS (text message)'];
  const priorityProjects = ['Park improvement', 'Library renovation', 'Road improvements', 'Community center renovation'];
  const eventFrequencies = ['Monthly', 'Quarterly', 'Annually'];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Survey Data:', formData);
    alert('Survey submitted! Thank you for your response.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Personal Information</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
          keyboardType="phone-pad"
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select your age range</Text>
          {ageRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.option,
                formData.ageRange === range && styles.selectedOption,
              ]}
              onPress={() => handleInputChange('ageRange', range)}
            >
              <Text style={styles.optionText}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={formData.city}
          onChangeText={(value) => handleInputChange('city', value)}
        />

        <Text style={styles.header}>What is your preferred method of community communication?</Text>
        <View style={styles.pickerContainer}>
          {communicationMethods.map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.option,
                formData.communicationMethod === method && styles.selectedOption,
              ]}
              onPress={() => handleInputChange('communicationMethod', method)}
            >
              <Text style={styles.optionText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.header}>Which community project should we prioritize?</Text>
        <View style={styles.pickerContainer}>
          {priorityProjects.map((project) => (
            <TouchableOpacity
              key={project}
              style={[
                styles.option,
                formData.priorityProject === project && styles.selectedOption,
              ]}
              onPress={() => handleInputChange('priorityProject', project)}
            >
              <Text style={styles.optionText}>{project}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.header}>How often would you like community events?</Text>
        <View style={styles.pickerContainer}>
          {eventFrequencies.map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.option,
                formData.eventFrequency === freq && styles.selectedOption,
              ]}
              onPress={() => handleInputChange('eventFrequency', freq)}
            >
              <Text style={styles.optionText}>{freq}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Submit Survey" onPress={handleSubmit} color="#6A0DAD" />
        <Text style={styles.footer}>Your response will be confidential and used for community planning purposes only.</Text>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082', // Dark purple background
  },
  innerContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF', // White card background
    borderRadius: 10,
    margin: 20,
    elevation: 5, // Adds a shadow for card effect
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#6A0DAD',
    borderColor: '#6A0DAD',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  footer: {
    fontSize: 12,
    color: '#9370DB',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
});