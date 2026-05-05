import styled from 'styled-components'
import { restaurants } from '../data/restaurants'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { RestaurantCard } from '../components/RestaurantCard'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 80px;
  padding-bottom: 120px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
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
