export type Product = {
  id: string
  name: string
  description: string
  image: string
}

export type Restaurant = {
  id: string
  name: string
  category: string
  rating: number
  description: string
  cardImage: string
  bannerImage: string
  tags: string[]
  products: Product[]
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Hioki Sushi',
    category: 'Japonesa',
    rating: 4.9,
    description:
      'Peixes frescos, combinados criativos e um ambiente intimista. Ideal para quem busca sabores autênticos da culinária japonesa.',
    cardImage:
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
    bannerImage:
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1600&q=80',
    tags: ['Destaque da semana', 'Japonesa'],
    products: [
      {
        id: 'p1-1',
        name: 'Combinado Premium',
        description:
          '12 peças variadas com salmão, atum e camarão, acompanha wasabi e gengibre.',
        image:
          'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80',
      },
      {
        id: 'p1-2',
        name: 'Temaki Salmão',
        description: 'Cone crocante recheado com salmão fresco e cream cheese.',
        image:
          'https://images.unsplash.com/photo-1758779527927-56c21385ffce?w=400&q=80',
      },
      {
        id: 'p1-3',
        name: 'Yakisoba',
        description:
          'Macarrão salteado com legumes, molho oriental e proteína à escolha.',
        image:
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
      },
    ],
  },
  {
    id: '2',
    name: 'La Dolce Vita Trattoria',
    category: 'Italiana',
    rating: 4.8,
    description:
      'Massas artesanais, pizzas no forno a lenha e vinhos selecionados. A Itália no seu delivery.',
    cardImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    bannerImage:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80',
    tags: ['Italiana'],
    products: [
      {
        id: 'p2-1',
        name: 'Pizza Marguerita',
        description:
          'Molho de tomate artesanal, mussarela de búfala e manjericão fresco.',
        image:
          'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
      },
      {
        id: 'p2-2',
        name: 'Spaghetti Carbonara',
        description:
          'Massa al dente com molho cremoso, pancetta crocante e parmesão.',
        image:
          'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
      },
      {
        id: 'p2-3',
        name: 'Risotto de Funghi',
        description: 'Arroz arbório com cogumelos porcini e trufa negra.',
        image:
          'https://images.unsplash.com/photo-1609770424775-39ec362f2d94?w=400&q=80',
      },
    ],
  },
]

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id)
}
