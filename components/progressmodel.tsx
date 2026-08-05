import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});


export default function ProgressModel({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" backdropColor="#000000">
      <View style={styles.container}>
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="small" color="#438883" />
        </View>
      </View>
    </Modal>
  );
}