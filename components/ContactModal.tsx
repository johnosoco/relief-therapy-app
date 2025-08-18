import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactModalProps {
  visible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ visible, onClose }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name || !message) {
      Alert.alert('Error', 'Please fill in your name and message');
      return;
    }

    const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    
    Alert.alert(
      'Send Message',
      'Choose how you would like to send your message:',
      [
        {
          text: 'Email',
          onPress: () => Linking.openURL(`mailto:jemedo1988@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(emailBody)}`),
        },
        {
          text: 'WhatsApp',
          onPress: () => Linking.openURL(`whatsapp://send?phone=+251938348728&text=${encodeURIComponent(emailBody)}`),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

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
          <Text style={styles.headerTitle}>{t('contact.title')}</Text>
          <TouchableOpacity onPress={clearForm} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('contact.name')} *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('contact.email')}</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('contact.phone')}</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+251938348728"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('contact.message')} *</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="How can we help you today?"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Our Contact Information</Text>
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
            <View style={styles.contactRow}>
              <Ionicons name="location" size={20} color="#3b82f6" />
              <Text style={styles.contactText}>Ayat Mall 4th Floor, Addis Ababa</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="white" />
            <Text style={styles.sendButtonText}>{t('contact.send')}</Text>
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
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  form: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
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
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactModal;