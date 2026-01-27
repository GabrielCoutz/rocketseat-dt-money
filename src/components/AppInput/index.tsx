import { Control, Controller, FieldValue, FieldValues, Path } from 'react-hook-form';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';
import { useRef, useState } from 'react';
import clsx from 'clsx';

interface IAppInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export const AppInput = <T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  secureTextEntry,
  ...rest
}: IAppInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const checkFocus = () => {
    if (!inputRef.current) return;

    setIsFocused(inputRef.current.isFocused());
  };

  const inputRef = useRef<TextInput>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View className="mt-4 w-full">
          {label && (
            <Text className={clsx('text-white', { 'text-accent-brand': isFocused })}>{label}</Text>
          )}

          <TouchableOpacity className="h-16 flex-row items-center justify-between border-b border-gray-600 px-3 py-2">
            {leftIconName && (
              <MaterialIcons
                name={leftIconName}
                size={24}
                color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                className="mr-2"
              />
            )}

            <TextInput
              value={value}
              onChangeText={onChange}
              placeholderTextColor={colors.gray[700]}
              className="flex-1 text-base text-gray-500"
              ref={inputRef}
              onFocus={checkFocus}
              onEndEditing={checkFocus}
              secureTextEntry={secureTextEntry && !showPassword}
              {...rest}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color={colors.gray[600]}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
