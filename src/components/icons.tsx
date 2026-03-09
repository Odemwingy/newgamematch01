import { View, Text } from 'react-native';
import { theme } from '../theme';

interface IconProps {
  color?: string;
  size?: number;
}

export function Home({ color = theme.colors.textSecondary, size = 24 }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.7, color }}>🏠</Text>
    </View>
  );
}

export function History({ color = theme.colors.textSecondary, size = 24 }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.7, color }}>📜</Text>
    </View>
  );
}

export function User({ color = theme.colors.textSecondary, size = 24 }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.7, color }}>👤</Text>
    </View>
  );
}
