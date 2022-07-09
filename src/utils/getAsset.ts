const assetCtx = require.context('../asset', true)

export function getAsset(path) {
  return assetCtx[path]
}
