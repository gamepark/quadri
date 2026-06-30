import { QuadriOptionsSpec } from '@gamepark/quadri/QuadriOptions'
import { QuadriRules } from '@gamepark/quadri/QuadriRules'
import { QuadriSetup } from '@gamepark/quadri/QuadriSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { QuadriLogs } from './history/QuadriLogs'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="quadri"
      Rules={QuadriRules}
      optionsSpec={QuadriOptionsSpec}
      GameSetup={QuadriSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      logs={new QuadriLogs()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
