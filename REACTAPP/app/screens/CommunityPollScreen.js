import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Initial poll data with total votes
const initialCommunicationPoll = {
  'Social media updates': 30,
  'Newsletters': 25,
  'Mobile app notifications': 20,
  'SMS/text messages': 15,
  totalVotes: 1247,
};
const initialProjectPoll = {
  'New community park': 42,
  'Library expansion': 28,
  'Road improvements': 20,
  'Community center renovation': 10,
  totalVotes: 850,
};
const initialFrequencyPoll = {
  'Weekly': 18,
  'Monthly': 45,
  'Quarterly': 27,
  'Annually': 10,
  totalVotes: 654,
};

const getColorForIndex = (key) => {
  const colors = ['#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const index = Object.keys(initialCommunicationPoll).indexOf(key) % colors.length;
  return colors[index];
};

export default function CommunityPollScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ageRange: '',
    city: '',
  });
  const [communicationPoll, setCommunicationPoll] = useState(initialCommunicationPoll);
  const [projectPoll, setProjectPoll] = useState(initialProjectPoll);
  const [frequencyPoll, setFrequencyPoll] = useState(initialFrequencyPoll);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleVote = (pollType, option) => {
    // Local vote increment (simulated, not persisted without backend)
    const totalVotesKey = 'totalVotes';
    const currentPoll = { ...eval(pollType), [option]: eval(pollType)[option] + 1 };
    const totalVotes = currentPoll[totalVotesKey] + 1;
    const newPercentages = {};
    let sum = 0;
    for (let key in currentPoll) {
      if (key !== totalVotesKey) sum += currentPoll[key];
    }
    for (let key in currentPoll) {
      if (key !== totalVotesKey) {
        newPercentages[key] = Math.round((currentPoll[key] / sum) * 100);
      }
    }
    newPercentages[totalVotesKey] = totalVotes;
    eval(`set${pollType.charAt(0).toUpperCase() + pollType.slice(1)}Poll`)(newPercentages);
  };

  const handleSubmit = () => {
    console.log('Survey Data:', formData);
    alert('Survey submitted! Thank you for your response.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Community Poll Survey</Text>
        <Text style={styles.subheader}>Share your information and cast your vote on important community topics</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Select age range"
              value={formData.ageRange}
              onChangeText={(value) => handleInputChange('ageRange', value)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            value={formData.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Community Polls</Text>
          <Text style={styles.question}>What is your preferred method of community communication?</Text>
          {Object.entries(communicationPoll).map(([key, value]) => {
            if (key !== 'totalVotes') {
              return (
                <View key={key} style={styles.pollItem}>
                  <Text style={styles.pollText}>{key}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, { width: `${value}%`, backgroundColor: getColorForIndex(key) }]} />
                  </View>
                  <Text style={styles.percent}>{value}%</Text>
                  <TouchableOpacity style={styles.voteButton} onPress={() => handleVote('communicationPoll', key)}>
                    <Text style={styles.voteButtonText}>Vote</Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          })}
          <Text style={styles.totalVotes}>Total vote: {communicationPoll.totalVotes}</Text>

          <Text style={styles.question}>Which community improvement project should we prioritize?</Text>
          {Object.entries(projectPoll).map(([key, value]) => {
            if (key !== 'totalVotes') {
              return (
                <View key={key} style={styles.pollItem}>
                  <Text style={styles.pollText}>{key}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, { width: `${value}%`, backgroundColor: getColorForIndex(key) }]} />
                  </View>
                  <Text style={styles.percent}>{value}%</Text>
                  <TouchableOpacity style={styles.voteButton} onPress={() => handleVote('projectPoll', key)}>
                    <Text style={styles.voteButtonText}>Vote</Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          })}
          <Text style={styles.totalVotes}>Total vote: {projectPoll.totalVotes}</Text>

          <Text style={styles.question}>How often would you like community events?</Text>
          {Object.entries(frequencyPoll).map(([key, value]) => {
            if (key !== 'totalVotes') {
              return (
                <View key={key} style={styles.pollItem}>
                  <Text style={styles.pollText}>{key}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, { width: `${value}%`, backgroundColor: getColorForIndex(key) }]} />
                  </View>
                  <Text style={styles.percent}>{value}%</Text>
                  <TouchableOpacity style={styles.voteButton} onPress={() => handleVote('frequencyPoll', key)}>
                    <Text style={styles.voteButtonText}>Vote</Text>
                  </TouchableOpacity>
                </View>
              );
            }
            return null;
          })}
          <Text style={styles.totalVotes}>Total vote: {frequencyPoll.totalVotes}</Text>
        </View>

        <Button title="Submit Survey" onPress={handleSubmit} color="#6A0DAD" />
        <Text style={styles.footer}>Your response will be kept confidential and used for community planning purposes only.</Text>
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
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333333',
  },
  subheader: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  pollItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pollText: {
    flex: 2,
    fontSize: 14,
    color: '#333333',
  },
  barContainer: {
    flex: 3,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  bar: {
    height: '100%',
    borderRadius: 5,
  },
  percent: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
  },
  totalVotes: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
  },
  voteButton: {
    padding: 5,
    backgroundColor: '#6A0DAD',
    borderRadius: 5,
    marginLeft: 10,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    fontSize: 12,
    color: '#9370DB',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
});