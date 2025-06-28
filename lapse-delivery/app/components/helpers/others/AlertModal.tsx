import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "@/app/components/helpers/others/StyledText";
import { useThemeColor } from "@/hooks/useThemeColor";

const AlertModal = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  type = "error",
}: {
  isVisible: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}) => {
  const textColor = useThemeColor({}, "text");
  const buttonColor = useThemeColor({}, "buttons");
  const cardColor = useThemeColor({}, "cards");
  // Function to determine title color based on type
  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "#4CAF50"; // Green color for success
      case "error":
        return "#FF3B30"; // Red color for error
      default:
        return "#FF3B30"; // Default to red
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: cardColor }]}>
          <StyledText
            style={[styles.title, { color: getTitleColor() }]}
            variant="titleMedium"
            children={title}
          />
          <StyledText style={styles.message} children={message} />

          {/* Dislplay the button given if the props is passed */}
          <View style={styles.buttonContainer}>
            {/* Display the cancel button if the onClose prop is passed */}
            {onClose && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <StyledText
                  style={{ color: textColor }}
                  children="Cancel"
                  variant="labelMedium"
                />
              </TouchableOpacity>
            )}
            {/* Display the confirm button if the onConfirm prop is passed */}
            {onConfirm && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.confirmButton,
                  { backgroundColor: buttonColor },
                ]}
                onPress={() => {
                  onConfirm?.();
                  onClose?.();
                }}
              >
                <StyledText
                  style={{ color: textColor }}
                  children="OK"
                  variant="labelMedium"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingVertical: 30,
    width: "80%",
    maxWidth: 500,
    minWidth: 200,
  },
  title: {
    marginBottom: 10,
  },
  message: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
});

export default AlertModal;
