import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditPollScreen = () => {
  const navigation = useNavigation();
  const [question, setQuestion] = useState("What's your favorite programming language for web development?");
  const [description, setDescription] = useState("Help us understand the community's preference for web development technologies in 2024.");
  const [options, setOptions] = useState(['JavaScript', 'Python', 'PHP', 'Java']);
  const [category, setCategory] = useState('Technology');
  const [duration, setDuration] = useState('7 days');
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const addOption = () => {
    setOptions([...options, '']);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>PollMaster</Text>
      <View style={styles.nav}>
        <Text style={styles.navItem}>Dashboard</Text>
        <Text style={styles.navItem}>Polls</Text>
        <Text style={styles.navItem}>Analytics</Text>
        <Text style={styles.user}>Admin</Text>
      </View>
      <Text style={styles.title}>Edit Poll</Text>
      <Text style={styles.subtitle}>Modify your poll settings and content</Text>
      <View style={styles.pollCard}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="Poll Question"
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description (Optional)"
          multiline
        />
        <Text style={styles.label}>Poll Options</Text>
        {options.map((option, index) => (
          <TextInput
            key={index}
            style={styles.optionInput}
            value={option}
            onChangeText={(text) => {
              const newOptions = [...options];
              newOptions[index] = text;
              setOptions(newOptions);
            }}
          />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addOption}>
          <Text style={styles.addButtonText}>+ Add Option</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />
        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
        />
      </View>
      <View style={styles.sidebar}>
        <View style={styles.settings}>
          <View style={styles.settingRow}>
            <Text>Multiple Choice</Text>
            <Switch value={isMultipleChoice} onValueChange={setIsMultipleChoice} />
          </View>
          <View style={styles.settingRow}>
            <Text>Anonymous Voting</Text>
            <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
         </View>
          <View style={styles.settingRow}>
            <Text>Show Results After Voting</Text>
            <Switch value={showResults} onValueChange={setShowResults} />
          </View>
        </View>
        <View style={styles.info}>
          <Text>Poll Information</Text>
          <Text>Poll ID: #PL-2024-001</Text>
          <Text>Status: Draft</Text>
          <Text>Created: Dec 28, 2024</Text>
          <Text>Last Modified: Just now</Text>
          <Text style={styles.autoSave}>* Auto save enabled - your changes are automatically saved if you leave</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.previewButton}>
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  navItem: { color: '#666' },
  user: { color: '#666' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 10 },
  pollCard: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginVertical: 5 },
  optionInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginVertical: 2 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  addButton: { padding: 5, marginTop: 5 },
  addButtonText: { color: '#007bff' },
  sidebar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  settings: { width: '48%', padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  info: { width: '48%', padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  autoSave: { fontSize: 12, color: '#999', marginTop: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  cancelButton: { padding: 10, marginRight: 10 },
  cancelButtonText: { color: '#d9534f' },
  previewButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginRight: 10 },
  previewButtonText: { color: '#fff', textAlign: 'center' },
  saveButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5 },
  saveButtonText: { color: '#fff', textAlign: 'center' },
});

export default EditPollScreen;