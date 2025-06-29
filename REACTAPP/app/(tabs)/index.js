import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Spacer from '../../components/Spacer';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const PollMasterHome = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Spacer />
      {/* Welcome Banner */}
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.banner}>
        <Text style={styles.bannerTitle}>Welcome back, Sarah! 👋</Text>
        <Text style={styles.bannerSubtitle}>Let’s create something amazing today.</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>🔥 5-day streak</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>🏆 Top creator</Text></View>
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
        <Pressable style={styles.statCardTouchable}>
          <Text style={styles.statAction}>📋 Copy Poll Code</Text>
        </Pressable>
      </View>

      {/* Live Polls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Live Polls</Text>
        {[
          { label: 'JavaScript', percent: '45%' },
          { label: 'Python', percent: '35%' },
          { label: 'Java', percent: '20%' },
        ].map((item, index) => (
          <View key={index} style={styles.pollItem}>
            <Text style={styles.pollLabel}>{item.label}</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBar, { width: item.percent }]} />
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
            <Icon name="checkmark-circle-outline" size={20} color="#6a11cb" />
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
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
  },
  banner: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 16,
    elevation: 4,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginVertical: 10,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#ffffff33',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  createPollBtn: {
    backgroundColor: '#6a11cb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
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
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  statCardTouchable: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a11cb',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  statAction: {
    fontWeight: '600',
    color: '#6a11cb',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  pollItem: {
    marginBottom: 12,
  },
  pollLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBarBg: {
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: 14,
    backgroundColor: '#6a11cb',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  activityText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#444',
  },
});
