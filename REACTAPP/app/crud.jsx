import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '../constants/Colors.jsx';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { useTheme } from './utils/useTheme';

const Crud = () => {
  const colorScheme = useTheme();
  const theme = Colors[colorScheme];
  const { user, articles, isLoading, addArticle, updateArticle, deleteArticle } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    if (!user || user.role.toLowerCase() !== 'admin') {
      console.log('Crud: Unauthorized, redirecting to /articles');
      router.push('/articles');
    }
  }, [user, router]);

  const addOrUpdateArticle = async () => {
    if (!title.trim() || !summary.trim() || !body.trim()) {
      Alert.alert('Error', 'Title, summary, and body are required');
      return;
    }
    const articleData = {
      title: title.trim(),
      summary: summary.trim(),
      body: body.trim(),
      date: date || new Date().toISOString(),
    };
    try {
      if (editingArticle) {
        const success = await updateArticle(editingArticle.id, articleData);
        if (success) {
          setEditingArticle(null);
        }
      } else {
        await addArticle(articleData);
      }
      setTitle('');
      setSummary('');
      setBody('');
      setDate(new Date().toISOString());
    } catch (error) {
      console.error('addOrUpdateArticle: Error:', error.message);
      if (error.message.includes('Not authorized')) {
        Alert.alert('Error', 'You can only update articles you created.');
      } else {
        Alert.alert('Error', error.message || 'Failed to save article');
      }
    }
  };

  const editArticle = (article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setSummary(article.summary);
    setBody(article.body);
    setDate(article.date);
  };

  const handleDeleteArticle = async (id) => {
    try {
      const success = await deleteArticle(id);
      if (!success) {
        Alert.alert('Error', 'Failed to delete article');
      }
    } catch (error) {
      console.error('handleDeleteArticle: Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to delete article');
    }
  };

  if (!user || user.role.toLowerCase() !== 'admin') {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.title }]}>Manage Articles</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Article Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={theme.text + '80'}
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Summary"
          value={summary}
          onChangeText={setSummary}
          placeholderTextColor={theme.text + '80'}
          multiline
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Full Article"
          value={body}
          onChangeText={setBody}
          placeholderTextColor={theme.text + '80'}
          multiline
        />
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]}
          placeholder="Date (YYYY-MM-DD)"
          value={new Date(date).toISOString().split('T')[0]}
          onChangeText={(text) => setDate(new Date(text).toISOString())}
          placeholderTextColor={theme.text + '80'}
        />
        <Button
          title={editingArticle ? 'Update Article' : 'Add Article'}
          onPress={addOrUpdateArticle}
          disabled={isLoading}
        />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.text, { color: theme.text }]}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.item, { backgroundColor: theme.background, borderColor: theme.text + '33' }]}>
                <View style={styles.itemContent}>
                  <Text style={[styles.text, { color: theme.text }]}>{item.title}</Text>
                  <Text style={[styles.subText, { color: theme.text + '80' }]}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                  <Text style={[styles.subText, { color: theme.text + '80' }]}>By: {item.postedBy}</Text>
                </View>
                <View style={styles.actions}>
                  <Button
                    title="Edit"
                    onPress={() => editArticle(item)}
                    style={styles.actionButton}
                    disabled={isLoading}
                  />
                  <Button
                    title="Delete"
                    onPress={() => handleDeleteArticle(item.id)}
                    style={[styles.actionButton, { backgroundColor: '#FF3B30' }]}
                    disabled={isLoading}
                  />
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={[styles.text, { color: theme.text }]}>No articles available.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  subText: {
    fontSize: 14,
    marginVertical: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
    padding: 8,
    width: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Crud;