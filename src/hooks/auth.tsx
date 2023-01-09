import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';
import { api } from '../services/api';
import { User as ModelUser} from '../database/model/User';
import { database } from '../database';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps ) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {email, password});
      const { token, user } = response.data;

      console.log('user api', user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userDB = await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = token
        });

        console.log('userDb id', userDB.user_id);
        
        if(userDB.user_id) {
          setData({ token, ...user, id: userDB.user_id });
        }
      });

    } catch (error:any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });
      setData({} as User);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    console.log('user update', user);
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        console.log('user selected', userSelected._raw);
        
        await userSelected.update(( userData ) => {
          userData.name = user.name,
          userData.driver_license = user.driver_license,
          userData.avatar = user.avatar
        });
      });

      setData(user);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();
      
      if(response.length > 0) {
        const userData = response[0]._raw as unknown as User;
  
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        setData(userData);
      }
      setLoading(false);
    }
    loadUserData();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updateUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };