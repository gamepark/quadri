import { OptionsSpec } from '@gamepark/rules-api'

export type QuadriOptions = {
  cooperative: boolean
  discoveryMode: boolean
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
  cooperative: {
    label: (t) => t('option.cooperative')
  },
  discoveryMode: {
    label: (t) => t('option.discovery')
  }
}
