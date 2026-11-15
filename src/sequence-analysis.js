import { HISTONE_H3_3_REFERENCE } from './data.js'

const MUTATION_POSITION = 28

export function cleanSequence(sequence) {
  return sequence
    .replace(/^>[^\r\n]*(?:\r?\n|$)/, '')
    .replace(/\s/g, '')
    .toUpperCase()
}

export function analyzeSequence(sequence) {
  const normalizedSequence = cleanSequence(sequence)
  const positionIndex = MUTATION_POSITION - 1
  const residue = normalizedSequence[positionIndex]
  const referenceResidue = HISTONE_H3_3_REFERENCE[positionIndex]

  if (residue === referenceResidue) {
    return { status: 'normal', residue }
  }

  if (residue === 'M') {
    return { status: 'mutated', residue }
  }

  return { status: 'other', residue }
}
