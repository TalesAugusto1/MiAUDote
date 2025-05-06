import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type DimensionValue = number | string | undefined;

interface DummyImageProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  text?: string;
  borderRadius?: number;
}

export const DummyImage: React.FC<DummyImageProps> = ({
  width = 100,
  height = 100,
  backgroundColor = "#cccccc",
  text,
  borderRadius = 8,
}) => {
  const containerStyle: ViewStyle = {
    width,
    height,
    backgroundColor,
    borderRadius,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <View style={containerStyle}>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
