import { OptionsSpec } from '@gamepark/rules-api'

export type QuadriOptions = {
  discoveryMode: boolean
}

export const QuadriOptionsSpec: OptionsSpec<QuadriOptions> = {
  discoveryMode: {
    label: (t) => t('option.discovery')
  }
}
