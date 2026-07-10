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
import { QuadriScoring } from './scoring/QuadriScoring'
import { theme } from './theme'
import { Tutorial } from './tutorial/Tutorial'
import { ai } from './tutorial/TutorialAI'

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
      scoring={new QuadriScoring()}
      theme={theme}
      tutorial={new Tutorial()}
      ai={ai}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
