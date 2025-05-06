import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export type ModalType = "success" | "error" | "info" | "confirm";

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  type?: ModalType;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

// Map icon names to proper Ionicons types
type IconName = React.ComponentProps<typeof Ionicons>["name"];

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  type = "info",
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancelar",
}) => {
  // Animation values
  const [animation] = React.useState(new Animated.Value(0));
  const [contentAnimation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      // Animate background opacity
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Animate modal scale with a slight delay for a nice effect
      Animated.sequence([
        Animated.delay(100),
        Animated.spring(contentAnimation, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(contentAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Modal icon and color based on type
  const getModalConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "checkmark-circle-outline" as IconName,
          color: "#4CC9F0",
          backgroundColor: "rgba(76, 201, 240, 0.1)",
        };
      case "error":
        return {
          icon: "alert-circle-outline" as IconName,
          color: "#FF6B6B",
          backgroundColor: "rgba(255, 107, 107, 0.1)",
        };
      case "confirm":
        return {
          icon: "help-circle-outline" as IconName,
          color: "#FFD166",
          backgroundColor: "rgba(255, 209, 102, 0.1)",
        };
      default:
        return {
          icon: "information-circle-outline" as IconName,
          color: "#4CC9F0",
          backgroundColor: "rgba(76, 201, 240, 0.1)",
        };
    }
  };

  const { icon, color, backgroundColor } = getModalConfig();

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback
        onPress={type !== "confirm" ? onClose : undefined}
      >
        <Animated.View style={[styles.overlay, { opacity: animation }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  opacity: contentAnimation,
                  transform: [
                    {
                      scale: contentAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name={icon} size={40} color={color} />
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              <View
                style={
                  type === "confirm" ? styles.buttonRow : styles.buttonSingle
                }
              >
                {type === "confirm" && (
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>{cancelText}</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: color },
                    type === "confirm"
                      ? styles.confirmButton
                      : styles.singleButton,
                  ]}
                  onPress={type === "confirm" ? onConfirm : onClose}
                >
                  <Text style={styles.buttonText}>
                    {type === "confirm" ? confirmText : "OK"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
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
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonSingle: {
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
  },
  singleButton: {
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomModal;
