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
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>PollMaster</Text>
          
        </View>
        <Text style={styles.title}>Edit Poll</Text>
        <Text style={styles.subtitle}>Modify your poll settings and content</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Question</Text>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
            placeholder="Poll Question"
            multiline
          />
          <Text style={styles.sectionHeader}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description (Optional)"
            multiline
          />
          <Text style={styles.sectionHeader}>Poll Options</Text>
          {options.map((option, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={option}
              onChangeText={(text) => {
                const newOptions = [...options];
                newOptions[index] = text;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addOption}>
            <Text style={styles.addButtonText}>+ Add Option</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeader}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Category"
          />
          <Text style={styles.sectionHeader}>Duration</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g., 7 days"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Poll Settings</Text>
          <View style={styles.setting}>
            <Text style={styles.label}>Multiple Choice</Text>
            <Switch value={isMultipleChoice} onValueChange={setIsMultipleChoice} />
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>Anonymous Voting</Text>
            <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
          </View>
          <View style={styles.setting}>
            <Text style={styles.label}>Show Results After Voting</Text>
            <Switch value={showResults} onValueChange={setShowResults} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Poll Information</Text>
          <View style={styles.info}>
            <Text>Poll ID: #PL-2024-001</Text>
            <Text>Status: Draft</Text>
            <Text>Created: Dec 28, 2024</Text>
            <Text>Last Modified: Just now</Text>
            <Text style={styles.autoSave}>* Auto save enabled - your changes are automatically saved if you leave</Text>
          </View>
        </View>
        <View style={styles.footer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 10,
    elevation: 2,
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
  nav: { flexDirection: 'row', justifyContent: 'flex-end' },
  navItem: { color: '#666666', marginLeft: 10 },
  user: { color: '#666666' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333333' },
  subtitle: { fontSize: 14, color: '#666666', marginBottom: 10 },
  section: { marginBottom: 20 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#333333' },
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
  addButtonText: { color: '#FFFFFF', fontSize: 14 },
  setting: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { flex: 1, fontSize: 14, color: '#333333' },
  info: { padding: 10, backgroundColor: '#F9F9F9', borderRadius: 4 },
  autoSave: { fontSize: 12, color: '#999999', marginTop: 5 },
  footer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  cancelButton: { padding: 10, marginRight: 10 },
  cancelButtonText: { color: '#d9534f' },
  previewButton: { backgroundColor: '#6A0DAD', padding: 10, borderRadius: 4, marginRight: 10 },
  previewButtonText: { color: '#FFFFFF', textAlign: 'center' },
  saveButton: { backgroundColor: '#6A0DAD', padding: 10, borderRadius: 4 },
  saveButtonText: { color: '#FFFFFF', textAlign: 'center' },
});

export default EditPollScreen;