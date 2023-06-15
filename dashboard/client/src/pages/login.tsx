import { useLogin } from '@refinedev/core'
import { useEffect, useRef } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { CredentialResponse } from '../interfaces/google'
import { yariga } from '../assets'

// Todo: Update your Google Client ID here
// const GOOGLE_CLIENT_ID = '1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>()

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res)
            }
          },
        })
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        })
      } catch (error) {
        console.log(error)
      }
    }, [])

    return <div ref={divRef} />
  }

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box display="flex" gap="36px" justifyContent="center" flexDirection="column">
        <img src={yariga} alt="Logo" />

        <GoogleButton />

        <Typography align="center" color={'text.secondary'} fontSize="12px">
          Powered by
          <img
            style={{ padding: '0 5px' }}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography>
      </Box>
    </Container>
  )
}
