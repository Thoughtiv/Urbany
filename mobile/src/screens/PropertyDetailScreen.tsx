import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Property } from '../types';

interface PropertyDetailScreenProps {
  property: Property;
  onBack: () => void;
}

export const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  property,
  onBack,
}) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  return (
    <View style={styles.container}>
      {/* Top Image Banner */}
      <View style={styles.imageBanner}>
        <Image source={{ uri: property.thumbnail }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        {property.matchScore && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{property.matchScore}% Match</Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title & Price Header */}
        <View style={styles.headerRow}>
          <Text style={styles.price}>{formatPrice(property.price)}</Text>
          <Text style={styles.statusBadge}>{property.status.toUpperCase()}</Text>
        </View>

        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.address}>📍 {property.address}, {property.city}</Text>

        {/* Builder Rating */}
        {property.builderName && (
          <View style={styles.builderCard}>
            <View>
              <Text style={styles.builderName}>Builder: {property.builderName}</Text>
              <Text style={styles.builderRating}>⭐ {property.builderRating} / 5.0 Credibility Score</Text>
            </View>
            <View style={styles.verifiedChip}>
              <Text style={styles.verifiedText}>RERA Verified</Text>
            </View>
          </View>
        )}

        {/* Specs Grid */}
        <View style={styles.specsGrid}>
          <View style={styles.specBox}>
            <Text style={styles.specVal}>{property.bedrooms}</Text>
            <Text style={styles.specLbl}>Bedrooms</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specVal}>{property.bathrooms}</Text>
            <Text style={styles.specLbl}>Bathrooms</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specVal}>{property.area}</Text>
            <Text style={styles.specLbl}>Sqft Area</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specVal}>{property.yearBuilt}</Text>
            <Text style={styles.specLbl}>Built Year</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionHeader}>Overview</Text>
        <Text style={styles.description}>{property.description}</Text>

        {/* Amenities */}
        <Text style={styles.sectionHeader}>Amenities & Highlights</Text>
        <View style={styles.amenitiesContainer}>
          {property.amenities.map((amenity, idx) => (
            <View key={idx} style={styles.amenityChip}>
              <Text style={styles.amenityText}>✔ {amenity}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footerActionRow}>
        <TouchableOpacity style={styles.chatBtn}>
          <Text style={styles.chatBtnText}>💬 Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn}>
          <Text style={styles.contactBtnText}>Contact Builder / Broker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageBanner: {
    height: 260,
    position: 'relative',
    backgroundColor: '#0f172a',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  matchBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#0284c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  matchText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },
  statusBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontWeight: '700',
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  builderCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  builderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  builderRating: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  verifiedChip: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verifiedText: {
    color: '#15803d',
    fontSize: 11,
    fontWeight: '700',
  },
  specsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  specBox: {
    backgroundColor: '#f1f5f9',
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  specVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  specLbl: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  amenityChip: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  footerActionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  chatBtn: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  contactBtn: {
    flex: 1,
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
});
