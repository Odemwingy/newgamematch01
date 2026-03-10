import React from 'react';
import { View, Text } from 'react-native';

interface IconProps {
  color: string;
  size?: number;
}

export function Home({ color, size = 24 }: IconProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size * 0.8, color }}>🏠</Text>
    </View>
  );
}

export function History({ color, size = 24 }: IconProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size * 0.8, color }}>📜</Text>
    </View>
  );
}

export function User({ color, size = 24 }: IconProps) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: size * 0.8, color }}>👤</Text>
    </View>
  );
}
