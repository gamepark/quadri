import { OptionsSpec } from '@gamepark/rules-api'

export type QuadriOptions = {
  cooperative: boolean
  balltrap: boolean
  discoveryMode: boolean
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
  cooperative: {
    label: (t) => t('option.cooperative')
  },
  balltrap: {
    label: (t) => t('option.balltrap')
  },
  discoveryMode: {
    label: (t) => t('option.discovery')
  }
}
