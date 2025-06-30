import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../../components/Spacer';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

// Colors matching EnterCodeScreen gradient and variants
const progressColors = ['#6a11cb', '#2575fc', '#4b2db9', '#3a56cc'];

const PollMasterHome = () => {
  const livePolls = [
    { label: 'JavaScript', percent: '45%' },
    { label: 'Python', percent: '35%' },
    { label: 'Java', percent: '20%' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Spacer />

      {/* Welcome Banner */}
      <LinearGradient colors={['#6a11cb', '#4632a8']} style={styles.banner}>
        <Text style={styles.bannerTitle}>Welcome back, Sarah! 👋</Text>
        <Text style={styles.bannerSubtitle}>Let’s create something amazing today.</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>🔥 5-day streak</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>🏆 Top creator</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Create Poll CTA */}
      <View style={styles.section}>
        <Link href="/CreatePollScreen" asChild>
          <Pressable style={styles.createPollBtn}>
            <Text style={styles.createPollText}>+ Create New Poll</Text>
          </Pressable>
        </Link>
      </View>

      {/* Stats */}
      <View style={styles.statRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Active Polls</Text>
        </View>
        <Link href="/(tabs)/EnterCodeScreen" asChild>
          <Pressable style={styles.statCardTouchable}>
            <Ionicons name="key-outline" size={20} color="#6a11cb" />
            <Text style={styles.statAction}>Enter Code</Text>
          </Pressable>
        </Link>
      </View>

      {/* Live Polls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Live Polls</Text>
        {livePolls.map((item, index) => (
          <View key={index} style={styles.pollItem}>
            <Text style={styles.pollLabel}>{item.label}</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: item.percent,
                    backgroundColor: progressColors[index % progressColors.length],
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🕒 Recent Activity</Text>
        {[
          'New vote on "Best time for meetings"',
          'Poll "Favorite IDE" created',
          'Poll "Work from home" ended',
        ].map((activity, i) => (
          <View key={i} style={styles.activityCard}>
            <Ionicons name="checkmark-done-outline" size={22} color="#6a11cb" />
            <Text style={styles.activityText}>{activity}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PollMasterHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8ff',
    paddingHorizontal: 16,
  },
  banner: {
    borderRadius: 24,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#6a11cb',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#e8e6fc',
    marginTop: 6,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  tag: {
    backgroundColor: '#ffffff40',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  createPollBtn: {
    backgroundColor: '#6a11cb',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#6a11cb',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { height: 2 },
  },
  createPollText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#ddd',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  statCardTouchable: {
    flex: 1,
    backgroundColor: '#f0eaff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  statAction: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6a11cb',
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  pollItem: {
    marginBottom: 14,
  },
  pollLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#444',
  },
  progressBarBg: {
    height: 14,
    backgroundColor: '#e6dcfb', // Light purple background for bars
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: 14,
    borderRadius: 8,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#ddd',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  activityText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#444',
  },
});
