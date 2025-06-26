import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PollsPreviewScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poll Preview</Text>
      <Text style={styles.subtitle}>Review your poll before publishing it live</Text>
      <View style={styles.pollCard}>
        <Text style={styles.question}>What's your favorite programming language for web development?</Text>
        <Text style={styles.description}>Help us understand the community's preference for web development technologies in 2024.</Text>
        <Text style={styles.endsIn}>Ends in 7 days | 0 votes</Text>
        <TouchableOpacity style={styles.voteButton}>
          <Text style={styles.voteButtonText}>Vote (Preview Mode)</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settings}>
        <Text>Duration: 7 days</Text>
        <Text>Multiple Choice: No</Text>
        <Text>Anonymous Voting: Yes</Text>
        <Text>Results Visibility: After voting</Text>
        <Text>Category: Technology</Text>
      </View>
      <View style={styles.stats}>
        <Text>Total Options: 4</Text>
        <Text>Current Votes: 0</Text>
        <Text>Status: Draft</Text>
        <Text>Created on: Dec 26, 2024 at 2:37 PM</Text>
        <Text>Last modified: Just now</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
        <Text style={styles.editButtonText}>Edit Poll</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.publishButton}>
        <Text style={styles.publishButtonText}>Publish Poll</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666' },
  pollCard: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, marginVertical: 10 },
  question: { fontSize: 18, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginVertical: 5 },
  endsIn: { fontSize: 12, color: '#999' },
  voteButton: { backgroundColor: '#e0f7fa', padding: 10, borderRadius: 5, marginTop: 10 },
  voteButtonText: { textAlign: 'center', color: '#007bff' },
  settings: { marginVertical: 10 },
  stats: { marginVertical: 10 },
  editButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginTop: 10 },
  editButtonText: { color: '#fff', textAlign: 'center' },
  publishButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginTop: 10 },
  publishButtonText: { color: '#fff', textAlign: 'center' },
});

export default PollsPreviewScreen;