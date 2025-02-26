import { StyleSheet } from 'react-native';

const lstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1D',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  filterButton: {
    padding: 10,
  },
  leadCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leadLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  leadName: {
    fontSize: 16,
    fontWeight: '600',
  },
  visits: {
    fontSize: 12,
    color: '#777',
  },
});

export default lstyles;
