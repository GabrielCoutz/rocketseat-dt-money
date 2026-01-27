import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { colors } from '@/shared/colors';

export type IAppButtonMode = 'fill' | 'outline';

interface IAppButtonProps extends TouchableOpacityProps {
  mode?: IAppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export const AppButton = ({ mode = 'fill', iconName, ...rest }: IAppButtonProps) => {
  const isFill = mode === 'fill';

  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        'h-button w-full flex-row items-center rounded-xl px-5',
        iconName ? 'justify-between' : 'justify-center',
        {
          'bg-accent-brand': isFill,
          'border border-accent-brand bg-none': !isFill,
        }
      )}>
      <Text
        className={clsx('text-base font-semibold', {
          'text-white': isFill,
          'text-accent-brand': !isFill,
        })}>
        {rest.children}
      </Text>

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors['accent-brand']}
        />
      )}
    </TouchableOpacity>
  );
};
