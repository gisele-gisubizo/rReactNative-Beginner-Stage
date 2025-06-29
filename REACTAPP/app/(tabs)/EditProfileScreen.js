import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Anderson');
  const [email, setEmail] = useState('john.anderson@company.com');
  const [phone, setPhone] = useState('+1555 123-4567');
  const [jobTitle, setJobTitle] = useState('Senior Poll Administrator');
  const [bio, setBio] = useState('Experienced poll administrator with 5 years in managing live polling systems and user engagement strategies.');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for toggle notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const ToggleButton = ({ value, onToggle }) => (
    <TouchableOpacity
      style={[styles.toggle, value ? styles.toggleActive : styles.toggleInactive]}
      onPress={() => onToggle(!value)}
    >
      <View style={[styles.toggleCircle, value ? styles.toggleCircleActive : styles.toggleCircleInactive]} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.innerContainer} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.header}>Edit Profile</Text>
          <Text style={styles.subtitle}>Manage your account settings and preferences</Text>
          <View style={styles.profileHeader}>
            <Image
              style={styles.avatar}
              source={{ uri: 'https://via.placeholder.com/80' }}
            />
            <View>
              <Text style={styles.name}>John Anderson</Text>
              <Text style={styles.status}>Poll Administrator <Text style={styles.active}>● Active</Text> (Last login: 2 hours ago)</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Personal Information</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
              />
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
              />
            </View>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              editable={false}
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
            />
            <TextInput
              style={styles.input}
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder="Job Title"
            />
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              multiline
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Change Password</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
            />
          </View>
          <View style={styles.sidebar}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Account Statistics</Text>
              <Text>Polls Created: 142</Text>
              <Text>Total Responses: 8,547</Text>
              <Text>Active Polls: 12</Text>
              <Text>Member Since: Jan 2022</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Notification Settings</Text>
              <View style={styles.setting}>
                <Text style={styles.label}>Email Notifications</Text>
                <ToggleButton value={emailNotifications} onToggle={setEmailNotifications} />
              </View>
              <View style={styles.setting}>
                <Text style={styles.label}>SMS Alerts</Text>
                <ToggleButton value={smsAlerts} onToggle={setSmsAlerts} />
              </View>
              <View style={styles.setting}>
                <Text style={styles.label}>Push Notifications</Text>
                <ToggleButton value={pushNotifications} onToggle={setPushNotifications} />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Danger Zone</Text>
              <Text style={styles.dangerText}>Please proceed with caution.</Text>
              <Text>These actions cannot be undone.</Text>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
  contentContainer: { paddingBottom: 20 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: -98,
  },
  status: {
    fontSize: 14,
    color: '#666666',
    marginLeft: -98,
  },
  active: { color: '#28a745' },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  sidebar: { flexDirection: 'column', marginBottom: 20 },
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
  dangerText: { color: '#dc3545', fontSize: 12, marginBottom: 5 },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: { color: '#FFFFFF', fontSize: 14 },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cancelButton: { padding: 10, marginRight: 10 },
  cancelButtonText: { color: '#666666' },
  saveButton: {
    backgroundColor: '#6A0DAD',
    padding: 10,
    borderRadius: 4,
  },
  saveButtonText: { color: '#FFFFFF', textAlign: 'center' },
  toggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
  },
  toggleActive: { backgroundColor: '#6A0DAD' },
  toggleInactive: { backgroundColor: '#E0E0E0' },
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
  toggleCircleInactive: { marginLeft: 1 },
});

export default EditProfileScreen;