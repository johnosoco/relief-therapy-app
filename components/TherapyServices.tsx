import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { TherapyService } from '../types';

interface TherapyServicesProps {
  onServiceSelect: (service: TherapyService) => void;
}

const TherapyServices: React.FC<TherapyServicesProps> = ({ onServiceSelect }) => {
  const { t } = useLanguage();

  const therapyServices: TherapyService[] = [
    {
      id: 'art-therapy',
      name: t('service.art.name'),
      description: t('service.art.description'),
      shortDescription: t('service.art.short'),
      icon: 'brush',
      color: '#a855f7',
      duration: '60 minutes',
      price: 'Flexible',
      category: 'Creative Therapy',
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 'speech-therapy',
      name: t('service.speech.name'),
      description: t('service.speech.description'),
      shortDescription: t('service.speech.short'),
      icon: 'chatbubble',
      color: '#3b82f6',
      duration: '45 minutes',
      price: 'Flexible',
      category: 'Communication',
      rating: 4.9,
      reviewCount: 89
    },
    {
      id: 'adult-therapy',
      name: t('service.adult.name'),
      description: t('service.adult.description'),
      shortDescription: t('service.adult.short'),
      icon: 'person',
      color: '#10b981',
      duration: '50 minutes',
      price: 'Flexible',
      category: 'Individual Therapy',
      rating: 4.7,
      reviewCount: 203
    },
    {
      id: 'child-behavioral',
      name: t('service.child.name'),
      description: t('service.child.description'),
      shortDescription: t('service.child.short'),
      icon: 'happy',
      color: '#f59e0b',
      duration: '45 minutes',
      price: 'Flexible',
      category: 'Child Therapy',
      rating: 4.9,
      reviewCount: 156
    },
    {
      id: 'pregnancy-therapy',
      name: t('service.pregnancy.name'),
      description: t('service.pregnancy.description'),
      shortDescription: t('service.pregnancy.short'),
      icon: 'heart',
      color: '#ec4899',
      duration: '55 minutes',
      price: 'Flexible',
      category: 'Specialized Care',
      rating: 4.8,
      reviewCount: 67
    },
    {
      id: 'music-therapy',
      name: t('service.music.name'),
      description: t('service.music.description'),
      shortDescription: t('service.music.short'),
      icon: 'musical-notes',
      color: '#8b5cf6',
      duration: '50 minutes',
      price: 'Flexible',
      category: 'Creative Therapy',
      rating: 4.6,
      reviewCount: 92
    },
    {
      id: 'movement-therapy',
      name: t('service.movement.name'),
      description: t('service.movement.description'),
      shortDescription: t('service.movement.short'),
      icon: 'fitness',
      color: '#06b6d4',
      duration: '60 minutes',
      price: 'Flexible',
      category: 'Physical Therapy',
      rating: 4.7,
      reviewCount: 78
    },
    {
      id: 'group-training',
      name: t('service.group.name'),
      description: t('service.group.description'),
      shortDescription: t('service.group.short'),
      icon: 'people',
      color: '#f97316',
      duration: '90 minutes',
      price: 'Flexible',
      category: 'Group Therapy',
      rating: 4.5,
      reviewCount: 45
    },
    {
      id: 'age-therapy',
      name: t('service.age.name'),
      description: t('service.age.description'),
      shortDescription: t('service.age.short'),
      icon: 'time',
      color: '#6b7280',
      duration: '60 minutes',
      price: 'Flexible',
      category: 'Specialized Care',
      rating: 4.6,
      reviewCount: 34
    },
    {
      id: 'online-therapy',
      name: t('service.online.name'),
      description: t('service.online.description'),
      shortDescription: t('service.online.short'),
      icon: 'videocam',
      color: '#059669',
      duration: '50 minutes',
      price: 'Flexible',
      category: 'Online Services',
      rating: 4.8,
      reviewCount: 187
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('services.title')}</Text>
      <Text style={styles.description}>{t('services.description')}</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {therapyServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.serviceCard, { borderLeftColor: service.color }]}
            onPress={() => onServiceSelect(service)}
          >
            <View style={[styles.iconContainer, { backgroundColor: service.color + '20' }]}>
              <Ionicons 
                name={service.icon as any} 
                size={24} 
                color={service.color} 
              />
            </View>
            
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceShort}>{service.shortDescription}</Text>
            
            <View style={styles.serviceFooter}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text style={styles.rating}>{service.rating}</Text>
              </View>
              <Text style={styles.duration}>{service.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  servicesContainer: {
    paddingHorizontal: 10,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    width: 280,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  serviceShort: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  duration: {
    fontSize: 12,
    color: '#9ca3af',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default TherapyServices;