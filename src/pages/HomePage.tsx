import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { RestaurantCard } from '../components/RestaurantCard'
import {
  fetchRestaurants,
  mapApiRestaurantToListItem,
} from '../services/restaurantsApi'
import { theme } from '../styles/theme'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: ${theme.spacing.gridGapHomeCol};
  row-gap: ${theme.spacing.gridGapHomeRow};
  padding-bottom: ${theme.spacing.sectionPaddingBottom};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    column-gap: ${theme.spacing.lg};
    row-gap: ${theme.spacing.lg};
  }
`

const MessageBox = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.containerPaddingX}
    ${theme.spacing.sectionPaddingBottom};
  text-align: center;
  font-family: ${theme.font.family};
  color: ${theme.colors.primary};
`

export function HomePage() {
  const [items, setItems] = useState<ReturnType<
    typeof mapApiRestaurantToListItem
  >[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchRestaurants()
      .then((list) => {
        if (!cancelled) setItems(list.map(mapApiRestaurantToListItem))
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Erro ao carregar dados.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Page>
      <Hero />
      <Container>
        {error && <MessageBox role="alert">{error}</MessageBox>}
        {!error && items === null && (
          <MessageBox aria-live="polite">Carregando restaurantes…</MessageBox>
        )}
        {!error && items !== null && (
          <Grid>
            {items.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Page>
  )
}
