import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from '../../config'; // Adjust path if config.js is in src/

export default function CreatePollScreen() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Default to tomorrow
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1); // Default to 1 day after startTime

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [startTime, setStartTime] = useState(tomorrow);
  const [endTime, setEndTime] = useState(dayAfterTomorrow);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [pollCode, setPollCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddOption = () => {
    if (options.length >= 10) {
      Alert.alert('Error', 'Maximum 10 options allowed.');
      return;
    }
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartPicker(Platform.OS === 'ios'); // Keep picker open on iOS
    setStartTime(currentDate);
    // Ensure endTime is after startTime
    if (currentDate >= endTime) {
      setEndTime(new Date(currentDate.getTime() + 60 * 60 * 1000)); // Set endTime 1 hour later
    }
  };

  const handleEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndPicker(Platform.OS === 'ios');
    setEndTime(currentDate);
  };

  const handleCreatePoll = async () => {
    setIsLoading(true);
    try {
      // Validation
      if (!title.trim()) {
        throw new Error('Please enter a poll title.');
      }
      const validOptions = options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        throw new Error('Please provide at least two non-empty options.');
      }
      const now = new Date();
      if (startTime <= now) {
        throw new Error('Start time must be in the future.');
      }
      if (endTime <= startTime) {
        throw new Error('End time must be after start time.');
      }

      // Get JWT token
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('You must be logged in to create a poll.');
      }

      // Format options as { name: string, voteCount: number }[]
      const formattedOptions = validOptions.map(name => ({ name, voteCount: 0 }));

      const payload = {
        title: title.trim(),
        description: description.trim() || '',
        options: formattedOptions,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        isAnonymous,
        isActive: true,
      };

      console.log('Creating poll at:', `${API_URL}/auth/createPoll`);
      console.log('Payload:', payload);

      const response = await axios.post(`${API_URL}/auth/createPoll`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', { status: response.status, data: response.data });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create poll.');
      }

      // Use backend-provided pollCode
      const newPollCode = response.data.data?.pollCode;
      if (!newPollCode) {
        throw new Error('No poll code returned by the server.');
      }
      setPollCode(newPollCode);

      Alert.alert(
        'Success',
        `Poll created successfully! Code: ${newPollCode}. Copy and share with users.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Create poll error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || error.message || 'Failed to create poll. Please check date and time inputs.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (!pollCode) {
      Alert.alert('Error', 'No poll code available to copy.');
      return;
    }
    await Clipboard.setStringAsync(pollCode);
    Alert.alert('Success', `Poll code ${pollCode} copied to clipboard.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create a Poll</Text>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleCreatePoll}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Creating...' : 'Publish'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="What would you like to ask?"
            value={title}
            onChangeText={setTitle}
            multiline
            placeholderTextColor="#6a11cb"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Description (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Add a description for your poll"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#6a11cb"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Poll Options</Text>
          {options.map((option, index) => (
            <View key={index} style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChangeText={(value) => handleOptionChange(index, value)}
                placeholderTextColor="#6a11cb"
              />
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddOption}>
            <Text style={styles.addButtonText}>+ Add Option</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Poll Settings</Text>
          <View style={styles.setting}>
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateText}>
                {startTime.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startTime}
                mode="datetime"
                display="default"
                onChange={handleStartTimeChange}
                minimumDate={new Date()} // Restrict to future dates
              />
            )}
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateText}>
                {endTime.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endTime}
                mode="datetime"
                display="default"
                onChange={handleEndTimeChange}
                minimumDate={new Date(startTime.getTime() + 60 * 1000)} // 1 minute after startTime
              />
            )}
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
        </View>

        {pollCode && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Poll Code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{pollCode}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyCode}
              >
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleCreatePoll}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? 'Creating...' : 'Create Poll'}</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>Share the poll code with your team</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#895ccf',
  },
  innerContainer: {
    padding: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    margin: 10,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '00000',
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 12,
    backgroundColor: '#6a11cb',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  toggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  toggleCircleActive: {
    marginLeft: 20,
    backgroundColor: '#6a11cb',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  codeText: {
    flex: 1,
    fontSize: 16,
    color: '#6a11cb',
    fontWeight: 'bold',
  },
  copyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#6a11cb',
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: 120,
  },
  buttonDisabled: {
    backgroundColor: '#a688e2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateButton: {
    flex: 1,
    paddingVertical: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#6a11cb',
    fontWeight: 'bold',
  },
});