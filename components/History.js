import React, { useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';

/**
 * Component for displaying a modal with history of investigated photos.
 * @param {Object} props - Component props.
 * @param {boolean} props.visible - Whether the history modal is visible.
 * @param {Array} props.data - Array of data for the history FlatList.
 * @param {Function} props.setHistoryVisible - Function to control visibility of the history modal.
 * @returns {JSX.Element} - History modal component.
 */
function History(props) {
  // State to manage the enlarged item
  const [itemEnlarged, setItemEnlarged] = useState(false);
  const [itemEnlargedURI, setItemEnlargedURI] = useState(null);

  /**
   * Function to go back by hiding the history modal.
   */
  const goBack = async () => {
    props.setHistoryVisible(false);
  };

  /**
   * Handle clicking an item in the FlatList to enlarge it.
   * @param {string} uri - URI of the clicked item.
   */
  const enlargeItem = (uri) => {
    setItemEnlarged(true);
    setItemEnlargedURI(uri);
  };

  /**
   * Handle minimizing the enlarged item.
   */
  const minimizeItem = () => {
    setItemEnlarged(false);
    setItemEnlargedURI(null);
  };

  return (
    <Modal visible={props.visible} animationType="fade">
      {/* Enlarged item modal */}
      <Modal visible={itemEnlarged} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={styles.enlargedModal} 
          onPress={minimizeItem}
        >
          <Image source={{ uri: itemEnlargedURI }} style={styles.enlargedItem} />
        </TouchableOpacity>
      </Modal>
      {/* Main container */}
      <View style={styles.container}>
        {/* Background for title */}
        <View style={styles.background}>
          <Text style={styles.pageText}>Investigated photos</Text>
        </View>
        {/* FlatList of history items */}
        <FlatList
          style={styles.flatList}
          data={props.data}
          keyExtractor={item => item.id.toString()}
          numColumns={Platform.OS === 'web' ? 4 : 2}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.historyItem} 
              onPress={() => enlargeItem(item.uri)}
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
              <Text style={styles.text}> Predicted: {item.predictedClass} </Text>
            </TouchableOpacity>
          )}
        />
        {/* Button to go back */}
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.text}> Go back </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default History;

const styles = StyleSheet.create({
  // Background style for title
  background: {
    width: Platform.OS === 'web' ? '50%' : '85%',
    backgroundColor: '#fb8500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10
  },
  // Container style for the modal
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffb703',
  },
  // FlatList style for the history items
  flatList: {
    paddingTop: 10,
    width: '100%',
  },
  // Style for each history item
  historyItem: {
    flexDirection: 'column',
    padding: 10,
    marginHorizontal: '2.5%',
    borderWidth: 3,
    borderColor: '#219ebc',
    justifyContent: 'center',
    alignItems: 'center',
    width: Platform.OS === 'web' ? '20%' : '45%',
    backgroundColor: '#8ecae6',
    borderRadius: 10,
    marginBottom: 20,
  },
  // Style for displayed images in history items
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#219ebc',
    borderWidth: 3
  },
  // Style for title text
  pageText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  // Style for the "Go back" button
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#023047',
    width: '70%',
  },
  // Style for text within the component
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  // Style for the enlarged item
  enlargedItem: {
    width: Platform.OS === 'web' ? '50%' : '80%',
    aspectRatio: 1,
    borderColor: '#219ebc',
    borderWidth: 3,
    borderRadius: 10,
  },
  // Style for the modal overlay
  enlargedModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
