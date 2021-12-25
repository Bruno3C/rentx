import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { 
  Alert,
  Keyboard, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback 
} from 'react-native';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { BackButton } from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import { Button } from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

export function Profile(){
  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: "Sair",
          onPress: () => signOut()
        }
      ]
    )
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [4,4],
     quality: 1,
    });

    if(result.cancelled){
      return;
    }

    if(result.uri){
      setAvatar(result.uri);
    }

  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
        name: Yup.string()
        .required('Nome é obrigatório')
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        ...user,
        driver_license: driverLicense,
        name,
        avatar
      });

      Alert.alert('Perfil atualizado!');
    } catch (error) {
      console.log('update user error =>', error)
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil.');
      }
    }
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton 
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            
            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} resizeMode="contain" />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          {/* removido marginBottom: useBottomTabBarHeight() do content por causa do scroll view*/}
          <Content> 
            <Options>
              <Option 
                active={option === 'dataEdit'}
                onPress={() => setOption('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option 
                active={option === 'passwordEdit'}
                onPress={() => setOption('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>
            { option === 'dataEdit'? 
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section> : 

              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repetir senha"
                />
              </Section>}
            <Button 
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}