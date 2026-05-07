import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { getRestaurantById } from '../data/restaurants'
import { Banner } from '../components/Banner'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import { theme } from '../styles/theme'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${theme.spacing.gridGapRestaurant};
  padding-top: ${theme.spacing.restaurantSectionPaddingTop};
  padding-bottom: ${theme.spacing.sectionPaddingBottom};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const NotFoundBox = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.containerPaddingX}
    ${theme.spacing.sectionPaddingBottom};
  text-align: center;
`

const NotFoundTitle = styled.h1`
  margin: 0 0 ${theme.spacing.sm};
  font-family: ${theme.font.family};
  font-size: 24px;
  font-weight: 700;
`

const BackLink = styled(Link)`
  font-family: ${theme.font.family};
  font-weight: 700;
  color: inherit;
`

export function RestaurantPage() {
  const { id } = useParams<{ id: string }>()
  const restaurant = id ? getRestaurantById(id) : undefined

  if (!restaurant) {
    return (
      <Page>
        <Header variant="restaurant" />
        <NotFoundBox>
          <NotFoundTitle>Restaurante não encontrado</NotFoundTitle>
          <p>
            <BackLink to="/">Voltar para a lista</BackLink>
          </p>
        </NotFoundBox>
        <Footer />
      </Page>
    )
  }

  return (
    <Page>
      <Header variant="restaurant" />
      <Banner
        category={restaurant.category}
        name={restaurant.name}
        image={restaurant.bannerImage}
      />
      <Container>
        <Grid>
          {restaurant.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      </Container>
      <Footer />
    </Page>
  )
}
