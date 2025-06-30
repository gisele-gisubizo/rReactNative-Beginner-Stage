import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

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
  const colors = ['#6a11cb', '#2575fc', '#5a33d1', '#3f5cd6'];
  const keys = Object.keys(initialCommunicationPoll);
  const index = keys.indexOf(key) % colors.length;
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVote = (pollType, option) => {
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
    // Basic validation example
    if (!formData.firstName || !formData.email) {
      Alert.alert('Missing Information', 'Please fill in your first name and email.');
      return;
    }
    Alert.alert('Survey submitted!', 'Thank you for your response.');
    console.log('Survey Data:', formData);
  };

  const renderPoll = (poll, pollType) => {
    return Object.entries(poll).map(([key, value]) => {
      if (key === 'totalVotes') return null;
      return (
        <View key={key} style={styles.pollItem}>
          <Text style={styles.pollText}>{key}</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  width: `${value}%`,
                  backgroundColor: getColorForIndex(key),
                },
              ]}
            />
          </View>
          <Text style={styles.percent}>{value}%</Text>
          <Pressable
            android_ripple={{ color: '#4444' }}
            style={({ pressed }) => [
              styles.voteButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => handleVote(pollType, key)}
          >
            <Text style={styles.voteButtonText}>Vote</Text>
          </Pressable>
        </View>
      );
    });
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Community Poll Survey</Text>
            <Text style={styles.subheader}>
              Share your info and vote on important community topics
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Personal Information</Text>
              {['firstName', 'lastName', 'email', 'phone', 'ageRange', 'city'].map((field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={`Enter your ${field === 'ageRange' ? 'age range' : field}`}
                  value={formData[field]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  keyboardType={
                    field === 'email'
                      ? 'email-address'
                      : field === 'phone'
                      ? 'phone-pad'
                      : 'default'
                  }
                  placeholderTextColor="#d6d6d6"
                  autoCapitalize="none"
                  clearButtonMode="while-editing"
                  returnKeyType="done"
                />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Community Polls</Text>

              <Text style={styles.question}>
                Preferred method of community communication?
              </Text>
              {renderPoll(communicationPoll, 'communicationPoll')}
              <Text style={styles.totalVotes}>Total votes: {communicationPoll.totalVotes}</Text>

              <Text style={styles.question}>
                Which community improvement project should we prioritize?
              </Text>
              {renderPoll(projectPoll, 'projectPoll')}
              <Text style={styles.totalVotes}>Total votes: {projectPoll.totalVotes}</Text>

              <Text style={styles.question}>How often would you like community events?</Text>
              {renderPoll(frequencyPoll, 'frequencyPoll')}
              <Text style={styles.totalVotes}>Total votes: {frequencyPoll.totalVotes}</Text>
            </View>

            <Pressable
              android_ripple={{ color: '#5321b9' }}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && { opacity: 0.85 },
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Survey</Text>
            </Pressable>

            <Text style={styles.footer}>
              Your response will be kept confidential and used for community planning
              purposes only.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 28,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#6a11cb',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1.4,
  },
  subheader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2575fc',
    borderBottomWidth: 3,
    borderBottomColor: '#6a11cb',
    paddingBottom: 8,
    marginBottom: 20,
  },
  input: {
    height: 52,
    borderColor: '#6a11cb',
    borderWidth: 1.8,
    borderRadius: 22,
    marginBottom: 16,
    paddingHorizontal: 22,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#f5f6fa',
    shadowColor: '#6a11cb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 18,
  },
  pollItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pollText: {
    flex: 2.5,
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
  barContainer: {
    flex: 3,
    height: 18,
    backgroundColor: '#d9e2ff',
    borderRadius: 18,
    marginHorizontal: 12,
    overflow: 'hidden',
    shadowColor: '#2575fc',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
  },
  bar: {
    height: '100%',
    borderRadius: 18,
  },
  percent: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    textAlign: 'right',
    fontWeight: '700',
  },
  voteButton: {
    backgroundColor: '#2575fc',
    paddingVertical: 9,
    paddingHorizontal: 22,
    borderRadius: 28,
    shadowColor: '#2575fc',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.48,
    shadowRadius: 11,
  },
  voteButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.6,
  },
  totalVotes: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6a11cb',
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#6a11cb',
    borderRadius: 34,
    paddingVertical: 20,
    marginHorizontal: 70,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#6a11cb',
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.55,
    shadowRadius: 19,
    elevation: 18,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  footer: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6a11cb',
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
});
