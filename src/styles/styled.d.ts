import 'styled-components'
import type { Theme } from './theme'

declare module 'styled-components' {
  // Interface de fusão exigida pelo styled-components para tipar `theme` em styled().
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- apenas espelha Theme
  export interface DefaultTheme extends Theme {}
}
