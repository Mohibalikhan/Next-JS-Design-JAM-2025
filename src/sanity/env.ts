export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-17'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "sknA8SOcAleXHurlAcI9IPEyhb7yEUrKXrG1UkDFL6LkSOzRPJv73MIBfgObC4KbGR08Jl4InHrS9d2eD2AxJ1ykpnOATcyTYcyEVf9azXUn5upSNrTllcQtXX4216dRY9wybUnAb34UrBFZb93ioySkH426G4kR2Nr7FVvAKojf2eNQT6uN",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
