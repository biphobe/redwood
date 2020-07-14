export type MockName = string

let MOCK_DATA: Record<MockName, any> = {}

export const resetMockData = () => {
  MOCK_DATA = {}
}

/**
 * Save mock data in a global store.
 *
 * `mockData` can be a bit magical because it's supported by a Redwood babel-plugin
 * that automatically determines the name from the named export and file location.
 *
 * @example: Magical-mock-data
 * ```js
 * // ComponentName/ComponentName.mock.js
 * export const standard = mockData({ answer: 42 })
 *
 * // ComponentName/ComponentName.stories.js
 * export const generated = () => {
 *    return <ComponentName {...mockData('standard')} />
 * }
 * ```
 */
export const mockData = (data: any, name?: MockName) => {
  console.log('----------> ', name, data)

  if (!name) {
    return data
  }

  if (MOCK_DATA[name]) {
    throw new Error(`A mock with "${name}" already exists.`)
  }

  console.log('name', name)

  MOCK_DATA[name] = data
  return data
}

/**
 * Get the mock data associated to `name`
 */
export const getMockData = (name: MockName) => {
  if (!MOCK_DATA[name]) {
    // The user might be trying to retrieve a key that they've set themselves.
    const originalName = name.split(':')[1]
    if (MOCK_DATA[originalName]) {
      return MOCK_DATA[originalName]
    }
    throw new Error(`A mock with "${name}" does not exist.`)
  }
  return MOCK_DATA[name]
}