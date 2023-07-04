import { AuthBindings, Authenticated, GitHubBanner, Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from '@refinedev/mui'
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  DashboardOutlined,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material'

import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import dataProvider from '@refinedev/simple-rest'
import axios, { AxiosRequestConfig } from 'axios'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Header, Title } from './components'
import { ColorModeContextProvider } from './contexts/color-mode'
import { CredentialResponse } from './interfaces/google'
import { DashboardPage } from './pages/dashboard'
import { PropertyCreate, PropertyEdit, PropertyList, PropertyShow } from './pages/properties'
import { Login } from './pages/login'
import { parseJwt } from './utils/parse-jwt'
import { AgentProfile } from './pages/agents'
import { ProfilePage } from './pages/profile'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  return request
})

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null

      // Save user to mongoDB
      if (profileObj) {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        })

        const data = await response.json()
        if (response.status === 200) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          )
        } else {
          return {
            success: false,
            redirectTo: '/login'
          }
        }

        localStorage.setItem('token', `${credential}`)

        return {
          success: true,
          redirectTo: '/',
        }
      }

      return {
        success: false,
      }
    },
    logout: async () => {
      const token = localStorage.getItem('token')

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common = {}
        window.google?.accounts.id.revoke(token, () => {
          return {}
        })
      }

      return {
        success: true,
        redirectTo: '/login',
      }
    },
    onError: async (error) => {
      console.error(error)
      return { error }
    },
    check: async () => {
      const token = localStorage.getItem('token')

      if (token) {
        return {
          authenticated: true,
        }
      }

      return {
        authenticated: false,
        error: {
          message: 'Check failed',
          name: 'Token not found',
        },
        logout: true,
        redirectTo: '/login',
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem('user')
      if (user) {
        return JSON.parse(user)
      }

      return null
    },
  }

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(import.meta.env.VITE_BACKEND_API)}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: {
                    icon: <DashboardOutlined />,
                  },
                },
                {
                  name: 'properties',
                  list: '/properties',
                  create: '/properties/create',
                  edit: '/properties/edit/:id',
                  show: '/properties/show/:id',
                  meta: {
                    canDelete: true,
                    icon: <VillaOutlined />,
                  },
                },
                {
                  name: 'agents',
                  list: '/agents',
                  meta: {
                    canDelete: true,
                    icon: <PeopleAltOutlined />,
                  },
                },
                {
                  name: 'reviews',
                  list: '/reviews',
                  meta: {
                    icon: <StarOutlineRounded />,
                  },
                },
                {
                  name: 'messages',
                  list: '/messages',
                  meta: {
                    icon: <ChatBubbleOutline />,
                  },
                },
                {
                  name: 'my_profile',
                  list: '/profile',
                  meta: {
                    label: 'My Profile',
                    icon: <AccountCircleOutlined />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={() => <Header sticky />} Title={Title}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="/properties">
                    <Route index element={<PropertyList />} />
                    <Route path="create" element={<PropertyCreate />} />
                    <Route path="edit/:id" element={<PropertyEdit />} />
                    <Route path="show/:id" element={<PropertyShow />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<AgentProfile />} />
                  </Route>
                  <Route path="/reviews" element={<DashboardPage />} />
                  <Route path="/messages" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
