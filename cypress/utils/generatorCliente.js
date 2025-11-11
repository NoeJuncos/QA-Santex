export function generarCuitValido() {
  const prefix = ['20', '23', '24', '27']
  const baseNumber = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000
  const selectedPrefix = prefix[Math.floor(Math.random() * prefix.length)]
  const partialCuit = `${selectedPrefix}${baseNumber}`

  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  let sum = 0

  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(partialCuit[i]) * weights[i]
  }

  let remainder = sum % 11
  let verifier = 11 - remainder

  if (verifier === 11) verifier = 0
  if (verifier === 10) verifier = 9

  return `${partialCuit}${verifier}`
}

export function generarEmailRandom() {
  return `test${Date.now()}@gmail.com`
}