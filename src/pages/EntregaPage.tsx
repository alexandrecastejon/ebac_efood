import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { theme } from '../styles/theme'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`

const Box = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl} ${theme.spacing.containerPaddingX};
  font-family: ${theme.font.family};
  color: ${theme.colors.primary};
  text-align: center;
`

const Title = styled.h1`
  margin: 0 0 ${theme.spacing.sm};
  font-size: 24px;
  font-weight: 700;
`

const Back = styled(Link)`
  font-weight: 700;
  color: inherit;
`

export function EntregaPage() {
  return (
    <Page>
      <Header variant="restaurant" />
      <Box>
        <Title>Entrega</Title>
        <p>Esta etapa será implementada na próxima fase do projeto.</p>
        <p>
          <Back to="/">Voltar à home</Back>
        </p>
      </Box>
      <Footer />
    </Page>
  )
}
