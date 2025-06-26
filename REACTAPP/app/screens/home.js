import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Spacer from "../../components/Spacer";
import { Link, useRouter } from "expo-router";

const { width } = Dimensions.get('window');

const PollMasterHome = () => {
  return (
    <ScrollView 
      style={styles.container}  
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
    >
      <Spacer />
      {/* Welcome Banner */}
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.banner}
      >
        <Text style={styles.bannerTitle}>Welcome back, Sarah!</Text>
        <Text style={styles.bannerSubtitle}>Ready to create engaging polls?</Text>
        <View style={styles.tagsRow}>
          <Text style={styles.tag}>🔥 5 day streak</Text>
          <Text style={styles.tag}>🏆 Top creator</Text>
        </View>
      </LinearGradient>

      <Link href="../screens/SurveyScreen"><Text>survey screen</Text></Link>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Link href="screens/CreatePollScreen">
            <Text style={styles.actionText}>+ Create Poll</Text>
          </Link>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Active Polls</Text>
        </View>

        <TouchableOpacity style={styles.actionButtonSecondary}>
          <Text style={styles.actionText}>Copy Code</Text>
        </TouchableOpacity>
      </View>

      {/* Live Polls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Polls</Text>
        <Text style={styles.pollQuestion}>your favorite programming language?</Text>
        <View style={styles.pollOption}><Text>JavaScript</Text><View style={[styles.pollBar, { width: '45%', height: 30 }]} /></View>
        <View style={styles.pollOption}><Text>Python</Text><View style={[styles.pollBar, { width: '35%' }]} /></View>
        <View style={styles.pollOption}><Text>Java</Text><View style={[styles.pollBar, { width: '20%' }]} /></View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.activityItem}>✅ New vote on "Best time for meetings"</Text>
        <Text style={styles.activityItem}>✅ Poll "Favorite IDE" created</Text>
        <Text style={styles.activityItem}>✅ Poll "Work from home" ended</Text>
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
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#eee',
    marginVertical: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#ffffff33',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 12,
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: (width - 48) / 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  actionButton: {
    backgroundColor: '#6a11cb',
    flex: 1,
    marginRight: 8,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '98%',
  },
  actionButtonSecondary: {
    backgroundColor: '#eee',
    flex: 1,
    marginLeft: 8,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pollQuestion: {
    fontSize: 16,
    marginBottom: 8,
  },
  pollOption: {
    backgroundColor: '#eee',
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  pollBar: {
    height: 30,
    backgroundColor: '#6a11cb',
  },
  activityItem: {
    fontSize: 14,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  trendingTag: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
    fontSize: 12,
  },
});