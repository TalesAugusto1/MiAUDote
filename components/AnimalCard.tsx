import React from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

export interface Animal {
  id: number;
  name: string;
  type: string;
  image: ImageSourcePropType;
  age?: string;
  gender?: string;
  breed?: string;
  size?: string;
  ongId?: number;
}

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => (
  <TouchableOpacity style={styles.card}>
    <Text style={styles.animalName}>{animal.name}</Text>
    <Text style={styles.animalType}>{animal.type}</Text>
    <Image source={animal.image} style={styles.animalImage} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FAD7B8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  animalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  animalType: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  animalImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
});
