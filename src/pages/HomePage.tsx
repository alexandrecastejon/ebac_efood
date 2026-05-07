import styled from 'styled-components'
import { restaurants } from '../data/restaurants'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { RestaurantCard } from '../components/RestaurantCard'
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

export function HomePage() {
  return (
    <Page>
      <Header variant="home" />
      <Hero />
      <Container>
        <Grid>
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </Page>
  )
}
