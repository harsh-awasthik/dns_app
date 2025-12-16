import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  NativeModules,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';

const ShieldIcon = ({ color }: { color: string }) => (
  <View style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 4, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
     <View style={{ width: 20, height: 20, backgroundColor: color }} />
  </View>
);

const DNSModule = NativeModules?.DNSModule;

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const toggleDNS = async () => {
    setLoading(true);
    
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();

    try {
      if (isEnabled) {
        if (DNSModule) {
           await DNSModule.disablePrivateDNS();
        } else {
           console.log("Native Module not found - simulating OFF");
           await new Promise(r => setTimeout(r, 500));
        }
        setIsEnabled(false);
      } else {
        if (DNSModule) {
           await DNSModule.setPrivateDNS("dns.adguard.com");
        } else {
           console.log("Native Module not found - simulating ON");
           await new Promise(r => setTimeout(r, 500));
        }
        setIsEnabled(true);
      }
    } catch (error: any) {
      if (error.code === 'PERMISSION_DENIED') {
        Alert.alert(
          "Permission Required", 
          "Run this ADB command via USB Debugging to enable functionality:\n\nadb shell pm grant com.dnsmanager android.permission.WRITE_SECURE_SETTINGS"
        );
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>DNS_MANAGER_V1</Text>
        <View style={styles.statusDot} />
      </View>

      <View style={styles.content}>
        <View style={[styles.statusRing, isEnabled ? styles.ringActive : styles.ringInactive]}>
           <ShieldIcon color={isEnabled ? '#4ade80' : '#475569'} />
        </View>

        <Text style={styles.statusText}>
          {isEnabled ? 'PROTECTION :: ACTIVE' : 'SYSTEM :: VULNERABLE'}
        </Text>
        <Text style={styles.subText}>
          {isEnabled ? 'Target: dns.adguard.com' : 'Standard ISP traffic'}
        </Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, isEnabled ? styles.btnActive : styles.btnInactive]}
          onPress={toggleDNS}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={isEnabled ? "#ef4444" : "#0f172a"} />
          ) : (
            <Text style={[styles.btnText, isEnabled ? styles.btnTextActive : styles.btnTextInactive]}>
              {isEnabled ? 'DEACTIVATE' : 'INITIALIZE'}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.devLabel}>ARCHITECT</Text>
        <Text style={styles.devName}>HARSH AWASTHI</Text>
        <View style={styles.terminalLine} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 20,
  },
  headerText: {
    color: '#64748b',
    fontFamily: 'Courier',
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '700',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  statusRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 1,
  },
  ringActive: {
    borderColor: '#4ade80',
    shadowColor: '#4ade80',
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 10,
  },
  ringInactive: {
    borderColor: '#334155',
  },
  statusText: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subText: {
    color: '#64748b',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
  },
  btnInactive: {
    backgroundColor: '#3b82f6',
    borderColor: '#60a5fa',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  btnActive: {
    backgroundColor: 'transparent',
    borderColor: '#ef4444',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  btnTextInactive: {
    color: '#ffffff',
  },
  btnTextActive: {
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    opacity: 0.5,
  },
  devLabel: {
    color: '#64748b',
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: 4,
  },
  devName: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  terminalLine: {
    width: 40,
    height: 2,
    backgroundColor: '#3b82f6',
    marginTop: 10,
  },
});