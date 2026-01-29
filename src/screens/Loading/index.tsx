import { useAuthContext } from '@/context/auth.context';
import { colors } from '@/shared/colors';
import { useEffect } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ILoadingProps {
  setLoading: (value: boolean) => void;
}

export const Loading = ({ setLoading }: ILoadingProps) => {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        if (!restoreUserSession) return;

        const user = await restoreUserSession();

        if (!user) await handleLogout();
      } catch (error) {
        console.log(error);

        await handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, [restoreUserSession, handleLogout, setLoading]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <>
        <Image className="h-[48px] w-[255px]" source={require('@/assets/logo.png')} />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  );
};
