import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'Relief Therapy',
    'header.contact': 'Contact Us',
    
    // Welcome Section
    'welcome.badge': 'Your journey to healing starts here',
    'welcome.title': 'Welcome to Your Safe Space for',
    'welcome.subtitle': 'Emotional Healing',
    'welcome.description': 'Professional therapy services to support your emotional healing and wellbeing journey. We provide compassionate care in a safe environment.',
    
    // Services
    'services.title': 'Our Healing Services',
    'services.description': 'Choose the therapy that resonates with your heart.',
    
    // Service Names and Descriptions
    'service.art.name': 'Art Therapy',
    'service.art.short': 'Healing through creative expression',
    'service.art.description': 'Express your emotions through creative art forms with our compassionate art therapists.',
    
    'service.speech.name': 'Speech Therapy',
    'service.speech.short': 'Finding your voice with confidence',
    'service.speech.description': 'Improve communication skills with our experienced speech therapists.',
    
    'service.adult.name': 'Adult Therapy',
    'service.adult.short': 'Professional support for life\'s challenges',
    'service.adult.description': 'Navigate life\'s challenges with professional support in a safe environment.',
    
    'service.child.name': 'Child Behavioral Therapy',
    'service.child.short': 'Nurturing growth through play',
    'service.child.description': 'Gentle, play-based therapy to help children develop emotional regulation.',
    
    'service.pregnancy.name': 'Pregnancy Support',
    'service.pregnancy.short': 'Support for your journey to motherhood',
    'service.pregnancy.description': 'Specialized support during your beautiful journey to motherhood.',
    
    'service.music.name': 'Music Therapy',
    'service.music.short': 'Harmony for the heart and soul',
    'service.music.description': 'Heal through the power of music with our specialized therapists.',
    
    'service.movement.name': 'Movement Therapy',
    'service.movement.short': 'Finding peace through movement',
    'service.movement.description': 'Connect with your body and emotions through therapeutic movement.',
    
    'service.group.name': 'Group Training',
    'service.group.short': 'Healing together in community',
    'service.group.description': 'Experience the power of shared healing in supportive group sessions.',
    
    'service.age.name': 'Age Therapy',
    'service.age.short': 'Care for every life stage',
    'service.age.description': 'Tailored therapeutic support for different life stages.',
    
    'service.online.name': 'Online Therapy',
    'service.online.short': 'Professional therapy from home',
    'service.online.description': 'Access professional therapy sessions from anywhere through secure video calls.',
    
    // Booking
    'booking.title': 'Book Session',
    'booking.book': 'Book Now',
    'booking.close': 'Close',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.cancel': 'Cancel',
  },
  am: {
    // Header - CORRECTED AMHARIC
    'header.title': 'ሪሊፍ ሳይኮሎጂካል ሰርቪስ',
    'header.contact': 'ያግኙን',
    
    // Welcome Section - CORRECTED AMHARIC
    'welcome.badge': 'የፈውስ ጉዞዎ እዚህ ይጀምራል',
    'welcome.title': 'ወደ ደህንነቱ የተጠበቀ የፈውስ ቦታዎ እንኳን በደህና መጡ',
    'welcome.subtitle': 'ስሜታዊ ፈውስ',
    'welcome.description': 'የስሜታዊ ፈውስ እና ደህንነት ጉዞዎን ለመደገፍ ባለሙያ የሳይኮሎጂ አገልግሎቶች። በደህንነቱ የተጠበቀ አካባቢ ውስጥ ርህራሄ ያለ እንክብካቤ እንሰጣለን።',
    
    // Services - CORRECTED AMHARIC
    'services.title': 'የእኛ የፈውስ አገልግሎቶች',
    'services.description': 'ከልብዎ ጋር የሚስማማውን ሕክምና ይምረጡ።',
    
    // Service Names and Descriptions - CORRECTED AMHARIC
    'service.art.name': 'የጥበብ ሕክምና',
    'service.art.short': 'በፈጠራ አገላለጽ ፈውስ',
    'service.art.description': 'ስሜቶችዎን በፈጠራ የጥበብ ቅርጾች ከርህራሄ ያላቸው የጥበብ ሐኪሞች ጋር ይግለጹ።',
    
    'service.speech.name': 'የንግግር ሕክምና',
    'service.speech.short': 'በራስ መተማመን ድምጽዎን ማግኘት',
    'service.speech.description': 'ከልምድ ያላቸው የንግግር ሐኪሞች ጋር የመግባቢያ ክህሎቶችን ያሻሽሉ።',
    
    'service.adult.name': 'የአዋቂዎች ሕክምና',
    'service.adult.short': 'ለሕይወት ተግዳሮቶች ባለሙያ ድጋፍ',
    'service.adult.description': 'በደህንነቱ የተጠበቀ አካባቢ ውስጥ በባለሙያ ድጋፍ የሕይወት ተግዳሮቶችን ይዳስሱ።',
    
    'service.child.name': 'የልጆች ባህሪ ሕክምና',
    'service.child.short': 'በጨዋታ እድገትን መንከባከብ',
    'service.child.description': 'ልጆች ስሜታዊ ቁጥጥር እንዲያዳብሩ ለመርዳት ረጋ ያለ፣ በጨዋታ ላይ የተመሰረተ ሕክምና።',
    
    'service.pregnancy.name': 'የእርግዝና ድጋፍ',
    'service.pregnancy.short': 'ወደ እናትነት ለሚወስደው ጉዞ ድጋፍ',
    'service.pregnancy.description': 'ወደ እናትነት በሚወስደው ውብ ጉዞ ወቅት ልዩ ድጋፍ።',
    
    'service.music.name': 'የሙዚቃ ሕክምና',
    'service.music.short': 'ለልብ እና ለነፍስ ስምምነት',
    'service.music.description': 'ከልዩ ባለሙያ ሐኪሞች ጋር በሙዚቃ ኃይል ይፈወሱ።',
    
    'service.movement.name': 'የእንቅስቃሴ ሕክምና',
    'service.movement.short': 'በእንቅስቃሴ ሰላምን ማግኘት',
    'service.movement.description': 'በሕክምናዊ እንቅስቃሴ ከሰውነትዎ እና ከስሜቶችዎ ጋር ይገናኙ።',
    
    'service.group.name': 'የቡድን ስልጠና',
    'service.group.short': 'በማህበረሰብ ውስጥ አብረን መፈወስ',
    'service.group.description': 'በደጋፊ የቡድን ክፍለ ጊዜዎች ውስጥ የጋራ ፈውስ ኃይልን ይለማመዱ።',
    
    'service.age.name': 'የእድሜ ሕክምና',
    'service.age.short': 'ለእያንዳንዱ የሕይወት ደረጃ እንክብካቤ',
    'service.age.description': 'ለተለያዩ የሕይወት ደረጃዎች የተዘጋጀ የሕክምና ድጋፍ።',
    
    'service.online.name': 'የመስመር ላይ ሕክምና',
    'service.online.short': 'ከቤት ባለሙያ ሕክምና',
    'service.online.description': 'በደህንነቱ የተጠበቁ የቪዲዮ ጥሪዎች በኩል ከየትኛውም ቦታ ባለሙያ የሕክምና ክፍለ ጊዜዎችን ይድረሱ።',
    
    // Booking - CORRECTED AMHARIC
    'booking.title': 'ክፍለ ጊዜ ይመዝግቡ',
    'booking.book': 'አሁን ይመዝግቡ',
    'booking.close': 'ዝጋ',
    
    // Contact - CORRECTED AMHARIC
    'contact.title': 'ያግኙን',
    'contact.name': 'ሙሉ ስም',
    'contact.email': 'የኢሜል አድራሻ',
    'contact.phone': 'የስልክ ቁጥር',
    'contact.message': 'መልእክት',
    'contact.send': 'መልእክት ላክ',
    'contact.cancel': 'ሰርዝ',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};