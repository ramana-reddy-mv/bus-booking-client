import { mockBuses } from '../data/mockBuses.js'

export async function searchBuses({ from, to }) {
  return mockBuses.filter((bus) => bus.from === from && bus.to === to)
}
