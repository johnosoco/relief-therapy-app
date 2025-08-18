import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import TherapyServices from '../components/TherapyServices';
import BookingModal from '../components/BookingModal';
import ContactModal from '../components/ContactModal';
import { TherapyService } from '../types';

export default function HomeScreen() {
  const { t, language, setLanguage } = useLanguage();
  const [selectedService, setSelectedService] = useState<TherapyService | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleServiceSelect = (service: TherapyService) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{t('header.title')}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.languageButton} 
              onPress={toggleLanguage}
            >
              <Text style={styles.languageButtonText}>
                {language === 'en' ? 'አማ' : 'EN'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton} 
              onPress={() => setShowContact(true)}
            >
              <Ionicons name="mail" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.badge}>
            <Ionicons name="sparkles" size={16} color="#3b82f6" />
            <Text style={styles.badgeText}>{t('welcome.badge')}</Text>
          </View>
          
          <Text style={styles.welcomeTitle}>
            {t('welcome.title')}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {t('welcome.subtitle')}
          </Text>
          
          <Text style={styles.welcomeDescription}>
            {t('welcome.description')}
          </Text>
        </View>

        {/* Services */}
        <TherapyServices onServiceSelect={handleServiceSelect} />
      </ScrollView>

      {/* Modals */}
      <BookingModal
        visible={showBooking}
        service={selectedService}
        onClose={() => {
          setShowBooking(false);
          setSelectedService(null);
        }}
      />

      <ContactModal
        visible={showContact}
        onClose={() => setShowContact(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  contactButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    gap: 8,
  },
  badgeText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 14,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea580c',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
});