import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Dot animations
  const dot1Translate = useRef(new Animated.Value(0)).current;
  const dot2Translate = useRef(new Animated.Value(0)).current;
  const dot3Translate = useRef(new Animated.Value(0)).current;

  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Dot appearance delay
    Animated.sequence([
      Animated.timing(dot1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(500),
      Animated.timing(dot2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(500),
      Animated.timing(dot3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      // Start bounce loop after all dots are visible
      bounce(dot1Translate, 0);
      bounce(dot2Translate, 150);
      bounce(dot3Translate, 300);
    });

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const bounce = (animatedValue, delay) => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: -10,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ])
    ).start();
  };

  return (
    <LinearGradient
      colors={['#007BFF', 'rgb(178, 200, 224)', 'rgb(225, 229, 233)']}
      start={{ x: 0.5, y: 1 }} // gradient starts from bottom center
      end={{ x: 0.5, y: 0 }}   // and ends at top center
      style={styles.container}
    >
      <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
        <View style={{ height: 50 }} /> {/* top spacing */}

        <View style={styles.header}>
          <Image
            source={require('../assets/poll3.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>PollMaster</Text>
        </View>

        <View style={styles.loaderContainer}>
          <Animated.View style={[styles.dot, {
            opacity: dot1Opacity,
            transform: [{ translateY: dot1Translate }],
          }]} />
          <Animated.View style={[styles.dot, {
            opacity: dot2Opacity,
            transform: [{ translateY: dot2Translate }],
          }]} />
          <Animated.View style={[styles.dot, {
            opacity: dot3Opacity,
            transform: [{ translateY: dot3Translate }],
          }]} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.subtitle}>Engage. Vote. See Results Instantly.</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#007BFF',  // blue color
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 30,
  },
  loaderContainer: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 40,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 10,
  },
  footerText: {
    color: '#f2f2f2',
    fontSize: 14,
    textAlign: 'center',
  },
});