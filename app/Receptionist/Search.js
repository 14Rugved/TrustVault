import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Search({
  query,
  onQueryChange,
  orderBy,
  onOrderByChange,
  sortBy,
  onSortBYChange,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
        </View>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search appointments..."
          placeholderTextColor="#9CA3AF"
        />
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Sort by:</Text>
          <View style={styles.selectContainer}>
            <TextInput
              style={styles.select}
              value={sortBy}
              onChangeText={onSortBYChange}
              placeholder="Select sort field"
            />
          </View>
        </View>
        
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Order:</Text>
          <View style={styles.selectContainer}>
            <TextInput
              style={styles.select}
              value={orderBy}
              onChangeText={onOrderByChange}
              placeholder="Select order"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    marginBottom: 16,
  },
  searchIconContainer: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#D1D5DB',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterGroup: {
    flex: 1,
    marginRight: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
  },
  select: {
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
});

export default Search; 