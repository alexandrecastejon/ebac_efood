import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Banner } from '../components/Banner'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import { ProductModal } from '../components/ProductModal'
import { useCart } from '../hooks/useCart'
import {
  fetchRestaurants,
  findRestaurantByRouteId,
  mapMenuItemToProduct,
} from '../services/restaurantsApi'
import { theme } from '../styles/theme'
import type { ApiRestaurant } from '../types/restaurantApi'
import type { MenuProduct } from '../types/restaurant'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
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

const ProductCell = styled.div`
  display: flex;
  min-height: 0;
  height: 100%;
  justify-content: center;
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

const MessageBox = styled(Container)`
  padding: ${theme.spacing.xl} ${theme.spacing.containerPaddingX}
    ${theme.spacing.sectionPaddingBottom};
  text-align: center;
  font-family: ${theme.font.family};
  color: ${theme.colors.primary};
`

function formatCategoryLabel(tipo: string): string {
  if (!tipo) return tipo
  return tipo.charAt(0).toUpperCase() + tipo.slice(1)
}

export function RestaurantPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()

  const [apiList, setApiList] = useState<ApiRestaurant[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(
    null,
  )

  useEffect(() => {
    let cancelled = false
    fetchRestaurants()
      .then((list) => {
        if (!cancelled) setApiList(list)
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setLoadError(
            e instanceof Error ? e.message : 'Erro ao carregar dados.',
          )
      })
    return () => {
      cancelled = true
    }
  }, [])

  const restaurant =
    apiList !== null ? findRestaurantByRouteId(apiList, id) : undefined

  const handleOpenProduct = useCallback((product: MenuProduct) => {
    setSelectedProduct(product)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  const handleConfirmAdd = useCallback(() => {
    addItem()
  }, [addItem])

  if (loadError) {
    return (
      <Page>
        <Header variant="restaurant" />
        <MessageBox role="alert">{loadError}</MessageBox>
        <Footer />
      </Page>
    )
  }

  if (apiList === null) {
    return (
      <Page>
        <Header variant="restaurant" />
        <MessageBox aria-live="polite">Carregando…</MessageBox>
        <Footer />
      </Page>
    )
  }

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

  const products = restaurant.cardapio.map(mapMenuItemToProduct)

  return (
    <Page>
      <Header variant="restaurant" />
      <Banner
        category={formatCategoryLabel(restaurant.tipo)}
        name={restaurant.titulo}
        image={restaurant.capa}
      />
      <Container>
        <Grid>
          {products.map((p) => (
            <ProductCell key={p.id}>
              <ProductCard
                product={p}
                onMoreDetails={() => handleOpenProduct(p)}
              />
            </ProductCell>
          ))}
        </Grid>
      </Container>
      <Footer />
      <ProductModal
        isOpen={selectedProduct !== null}
        product={selectedProduct}
        onClose={handleCloseModal}
        onConfirmAdd={handleConfirmAdd}
      />
    </Page>
  )
}
