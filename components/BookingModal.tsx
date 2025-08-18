import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { TherapyService } from '../types';

interface BookingModalProps {
  visible: boolean;
  service: TherapyService | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ visible, service, onClose }) => {
  const { t } = useLanguage();

  const handleBooking = () => {
    const phoneNumber = '+251938348728';
    const message = `Hello! I would like to book a session for ${service?.name}. Please let me know your availability.`;
    
    Alert.alert(
      'Book Session',
      'Choose how you would like to book your session:',
      [
        {
          text: 'Call',
          onPress: () => Linking.openURL(`tel:${phoneNumber}`),
        },
        {
          text: 'WhatsApp',
          onPress: () => Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`),
        },
        {
          text: 'SMS',
          onPress: () => Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  if (!service) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('booking.title')}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={[styles.serviceHeader, { backgroundColor: service.color + '20' }]}>
            <View style={[styles.serviceIcon, { backgroundColor: service.color + '40' }]}>
              <Ionicons name={service.icon as any} size={32} color={service.color} />
            </View>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color="#6b7280" />
              <Text style={styles.detailText}>Duration: {service.duration}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="star" size={20} color="#fbbf24" />
              <Text style={styles.detailText}>
                {service.rating} ({service.reviewCount} reviews)
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="pricetag" size={20} color="#6b7280" />
              <Text style={styles.detailText}>Flexible pricing available</Text>
            </View>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Contact Information</Text>
            <View style={styles.contactRow}>
              <Ionicons name="call" size={20} color="#3b82f6" />
              <Text style={styles.contactText}>+251938348728</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="call" size={20} color="#3b82f6" />
              <Text style={styles.contactText}>+251932520157</Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons name="mail" size={20} color="#3b82f6" />
              <Text style={styles.contactText}>jemedo1988@gmail.com</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>{t('booking.book')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  serviceHeader: {
    padding: 24,
    alignItems: 'center',
    margin: 16,
    borderRadius: 16,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#374151',
  },
  contactInfo: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#3b82f6',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bookButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingModal;