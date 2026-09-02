import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onPress,
  onFavoritePress,
}) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.thumbnail }} style={styles.image} resizeMode="cover" />
        <View style={styles.topBadges}>
          {property.matchScore && (
            <View style={styles.matchBadge}>
              <Text style={styles.matchText}>{property.matchScore}% Match</Text>
            </View>
          )}
          <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.locationBadge}>
          <Text style={styles.locationBadgeText}>{property.locationTag || property.city}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(property.price)}</Text>
          {property.builderRating && (
            <View style={styles.ratingBadge}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>{property.builderRating}</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          📍 {property.address}
        </Text>

        <View style={styles.divider} />

        <View style={styles.specsRow}>
          <Text style={styles.specItem}>🛏️ {property.bedrooms} Beds</Text>
          <Text style={styles.specDot}>•</Text>
          <Text style={styles.specItem}>🚿 {property.bathrooms} Baths</Text>
          <Text style={styles.specDot}>•</Text>
          <Text style={styles.specItem}>📐 {property.area} sqft</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
    backgroundColor: '#e2e8f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchBadge: {
    backgroundColor: 'rgba(2, 132, 199, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  matchText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
  },
  locationBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  locationBadgeText: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 8,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  specItem: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  specDot: {
    marginHorizontal: 8,
    color: '#cbd5e1',
  },
});
