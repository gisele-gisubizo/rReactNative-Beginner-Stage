import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { v4 as uuidv4 } from 'uuid'; // For generating unique poll codes

export default function CreatePollScreen() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollDuration, setPollDuration] = useState('');
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hideVoterIdentities, setHideVoterIdentities] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [pollCode, setPollCode] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handlePreviewPoll = () => {
    if (!question || options.every(opt => !opt.trim())) {
      Alert.alert('Error', 'Please enter a question and at least one option.');
      return;
    }
    const newPollCode = uuidv4().split('-')[0]; // Generate a short unique code
    setPollCode(newPollCode);
    console.log('Generated Poll Code:', newPollCode);
    console.log('Poll Details:', { question, options, pollDuration, isMultipleChoice, isAnonymous, hideVoterIdentities, displayResults });
    Alert.alert('Poll Created', `Poll code: ${newPollCode}. Copy and share with selected users.`);
  };

  const handleCopyCode = () => {
    if (pollCode) {
      // Note: React Native doesn't have a direct clipboard API in core, so you'd typically use 'expo-clipboard'
      // For this example, we'll simulate it with an alert
      Alert.alert('Copied', `Code ${pollCode} has been copied to clipboard.`);
      console.log('Copied Poll Code:', pollCode);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create a Poll</Text>
          <Button title="Publish" onPress={handlePreviewPoll} color="#6A0DAD" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Question</Text>
          <TextInput
            style={styles.input}
            placeholder="What would you like to ask?"
            value={question}
            onChangeText={setQuestion}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Poll Options</Text>
          {options.map((option, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChangeText={(value) => handleOptionChange(index, value)}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
            <Text style={styles.addButtonText}>+ Add Option</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Poll Settings</Text>
          <View style={styles.setting}>
            <Text style={styles.label}>Poll Duration</Text>
            <TextInput
              style={styles.input}
              value={pollDuration}
              onChangeText={setPollDuration}
              placeholder="e.g., 2 days, 1 week"
            />
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>Multiple Choice</Text>
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setIsMultipleChoice(!isMultipleChoice)}
            >
              <View style={[styles.toggleCircle, isMultipleChoice && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>Anonymous Voting</Text>
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View style={[styles.toggleCircle, isAnonymous && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>Hide Voter Identities</Text>
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setHideVoterIdentities(!hideVoterIdentities)}
            >
              <View style={[styles.toggleCircle, hideVoterIdentities && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>Display Results While Poll is Active</Text>
            <TouchableOpacity
              style={styles.toggle}
              onPress={() => setDisplayResults(!displayResults)}
            >
              <View style={[styles.toggleCircle, displayResults && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
        </View>

        {pollCode && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Poll Code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{pollCode}</Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Button title="Preview Poll" onPress={handlePreviewPoll} color="#6A0DAD" />
          <Text style={styles.footerText}>Help your team find a poll</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background to match the image
  },
  innerContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 10,
    elevation: 2, // Slight elevation for card effect
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#6A0DAD',
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  toggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    marginLeft: 1,
  },
  toggleCircleActive: {
    marginLeft: 21,
    backgroundColor: '#6A0DAD',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  codeText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  copyButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#6A0DAD',
    borderRadius: 4,
    marginLeft: 10,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 10,
  },
});