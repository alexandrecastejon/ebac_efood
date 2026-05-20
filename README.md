# efood (Projeto 6 — EBAC)

Frontend inspirado no iFood, desenvolvido como atividade de conclusão de curso (Projeto 6) da EBAC.

## Stack

- React + TypeScript + Vite
- Styled Components
- React Router
- Redux Toolkit + React Redux
- Deploy: Vercel

## Funcionalidades

- Listagem de restaurantes consumindo a [API EBAC](https://api-ebac.vercel.app/api/efood/restaurantes)
- Página do restaurante com cardápio em grid
- Modal de produto (“Mais detalhes”) com opção de adicionar ao carrinho
- Carrinho lateral (drawer) com itens, remoção por linha, valor total calculado e contador no header
- Checkout em etapas no mesmo drawer: **entrega** → **pagamento** → **confirmação**
- Finalização do pedido via POST na [API de checkout](https://api-ebac.vercel.app/api/efood/checkout), exibindo o `orderId` retornado

## Links

- **Produção (Vercel)**: https://ebac-efood-delta.vercel.app/
- **Repositório (GitHub)**: https://github.com/alexandrecastejon/ebac_efood

## Como rodar localmente

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra no navegador o endereço exibido no terminal (em geral `http://localhost:5173`).

Build de produção:

```bash
npm run build
```

Pré-visualização do build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Lista de restaurantes |
| `/restaurante/:id` | Página do restaurante e cardápio (ex.: `/restaurante/1`) |

O fluxo de entrega, pagamento e confirmação ocorre no **drawer lateral** (não em rotas separadas).

## Fluxo de checkout

1. Adicionar produtos e abrir o carrinho no header
2. **Continuar com a entrega** — formulário de endereço
3. **Continuar com o pagamento** — dados do cartão
4. **Finalizar pagamento** — envia o pedido à API e exibe a confirmação com o ID
5. **Concluir** — limpa o carrinho e fecha o drawer

## Estrutura principal

```
src/
├── components/
│   ├── checkout/   # Etapas do drawer (Cart, Delivery, Payment, Confirmation)
│   └── CartDrawer.tsx
├── pages/          # HomePage, RestaurantPage
├── store/          # cartSlice, checkoutSlice, store, hooks
├── services/       # restaurantsApi, checkoutApi
├── styles/         # Theme e estilos globais
└── types/          # Tipos TypeScript
```
