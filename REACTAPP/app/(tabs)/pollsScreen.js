import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Spacer from '../../components/Spacer';

const { width } = Dimensions.get('window');

const pollsData = [
  {
    question: "What's your favorite programming language?",
    votes: [
      { option: 'JavaScript', percent: 45 },
      { option: 'Python', percent: 35 },
      { option: 'Java', percent: 20 },
    ],
  },
  {
    question: 'Best time for team meetings?',
    votes: [
      { option: 'Morning', percent: 52 },
      { option: 'Afternoon', percent: 31 },
      { option: 'Evening', percent: 17 },
    ],
  },
  {
    question: 'Preferred work location?',
    votes: [
      { option: 'Remote', percent: 68 },
      { option: 'Office', percent: 32 },
    ],
  },
  {
    question: 'Coffee or Tea preference?',
    votes: [
      { option: 'Coffee', percent: 72 },
      { option: 'Tea', percent: 28 },
    ],
  },
];

const cardWidth = (width - 48) / 3;

const PollsScreen = () => {
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    { id: 1, label: 'Total Polls', value: 24 },
    { id: 2, label: 'Active', value: 12 },
    { id: 3, label: 'Inactive', value: 20 },
  ];

  const getVoteColor = (index) => {
    switch (index) {
      case 0:
        return '#28a745'; // green
      case 1:
        return '#007bff'; // blue
      case 2:
        return '#fd7e14'; // orange
      default:
        return '#6c757d'; // gray
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Spacer />

      {/* Header Stats as cards */}
      <View style={styles.headerStats}>
        {stats.map(({ id, label, value }) => {
          const isSelected = selectedStat === id;
          return (
            <TouchableOpacity
              key={id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelectedStat(id)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.cardText,
                  isSelected && styles.cardTextSelected,
                ]}
              >
                {label}: {value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Polls List */}
      <FlatList
        data={pollsData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => {
          const sortedVotes = [...item.votes].sort(
            (a, b) => b.percent - a.percent
          );

          return (
            <View style={styles.pollCard}>
              <Text style={styles.question}>{item.question}</Text>
              {sortedVotes.map((vote, index) => (
                <View key={index} style={styles.voteWrapper}>
                  <View style={styles.voteBarBackground}>
                    <View
                      style={[
                        styles.voteBarFill,
                        {
                          width: vote.percent + '%',
                          backgroundColor: getVoteColor(index),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.voteText}>
                    {vote.option} — {vote.percent}%
                  </Text>
                </View>
              ))}
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default PollsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: '#6a11cb',
    borderColor: '#6a11cb',
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardTextSelected: {
    color: '#fff',
  },
  pollCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  voteWrapper: {
    marginBottom: 12,
  },
  voteBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  voteBarFill: {
    height: 10,
    borderRadius: 5,
  },
  voteText: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
});