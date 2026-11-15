import './style.css'
import { MUTATION_INFORMATION } from './data.js'
import { analyzeSequence, cleanSequence } from './sequence-analysis.js'

function showInput() {
  const app = document.querySelector('#app')
  app.classList.remove('processing-state', 'result-state')
  app.innerHTML = `
  <main class="page-content">
    <header class="page-header">
      <h1>H3K27M</h1>
      <p class="subtitle">Check a histone H3.3 sequence for the H3 K27M mutation</p>
      <p class="reference-note">Your sequence is compared with the built-in normal human histone H3.3 reference.</p>
    </header>

    <section class="sequence-form" aria-label="Sequence input">
      <label for="sequence-input">Paste histone H3.3 sequence</label>
      <textarea
        id="sequence-input"
        rows="9"
        placeholder="Paste your sequence here"
      ></textarea>
      <p id="sequence-error" class="sequence-error" role="alert" hidden></p>
      <p class="sequence-note">
        This tool checks histone H3.3 (H3-3A) only. H3 K27M can also occur in histone H3.1, which is not analyzed.
      </p>
      <div class="action-row">
        <button id="analyze-button" type="button">Analyze sequence</button>
      </div>
    </section>
  </main>

  <footer class="page-footer">
    <p>Educational demo – not for clinical use.</p>
  </footer>
`

  const sequenceInput = document.querySelector('#sequence-input')
  const sequenceError = document.querySelector('#sequence-error')
  const analyzeButton = document.querySelector('#analyze-button')

  analyzeButton.addEventListener('click', () => {
    const sequence = cleanSequence(sequenceInput.value)
    let errorMessage = ''

    if (!sequence) {
      errorMessage = 'Paste a sequence to analyze.'
    } else if (sequence.length < 28) {
      errorMessage = 'Sequence too short: at least 28 amino acids are needed.'
    }

    sequenceError.textContent = errorMessage
    sequenceError.hidden = !errorMessage

    if (!errorMessage) {
      app.classList.add('processing-state')
      app.innerHTML = `
      <main class="processing-view">
        <h1>H3K27M</h1>
        <div class="processing-indicator" role="status" aria-live="polite">
          <svg class="loading-spinner" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" class="spinner-track"></circle>
            <path d="M 24 4 A 20 20 0 0 1 44 24" class="spinner-arc"></path>
          </svg>
          <p>Analyzing sequence...</p>
        </div>
      </main>
      <footer class="page-footer">
        <p>Educational demo – not for clinical use.</p>
      </footer>
    `

      window.setTimeout(() => {
        const result = analyzeSequence(sequence)
        const resultContent = {
          normal: {
            className: 'normal',
            message: 'No H3 K27M detected (position 28 is K).',
          },
          mutated: {
            className: 'mutated',
            message: 'H3 K27M detected.',
          },
          other: {
            className: 'other',
            message: 'Position 28 is neither K nor M. Check that this is a histone H3.3 sequence.',
          },
        }[result.status]

        app.classList.remove('processing-state')
        app.classList.add('result-state')
        app.innerHTML = `
        <main class="result-view">
          <h1>H3K27M</h1>
          <section class="result-card" aria-labelledby="result-message">
            <div class="result-status">
              <span class="result-label">Variant Status</span>
              <h2 id="result-message" class="result-message result-message--${resultContent.className}" role="status">
                ${resultContent.message}
              </h2>
            </div>
            ${
              result.status === 'mutated'
                ? `
                  <div class="result-details">
                    <div class="result-detail">
                      <span class="result-label">Associated Tumor</span>
                      <p>${MUTATION_INFORMATION.associatedTumor}</p>
                    </div>
                    <div class="result-divider"></div>
                    <div class="result-detail">
                      <span class="result-label">Targeted Treatment</span>
                      <p>${MUTATION_INFORMATION.targetedTreatment}</p>
                    </div>
                  </div>
                `
                : ''
            }
          </section>
          <div class="action-row">
            <button id="new-analysis-button" type="button">Start new analysis</button>
          </div>
        </main>
        <footer class="page-footer">
          <p>Educational demo – not for clinical use.</p>
        </footer>
      `
        document.querySelector('#new-analysis-button').addEventListener('click', showInput)
      }, 1500)
    }
  })
}

showInput()
