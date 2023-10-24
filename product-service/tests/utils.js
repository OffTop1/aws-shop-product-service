
const getMockEvent = productId => ({
  pathParameters: { productId }
})

const getTargetItemBySourceItemId = (target, sourceItemId) => {
  return target.find(item => item.id === sourceItemId) || [];
}

const merge = (source, target) => {
  return source.map(item => ({
    ...item,
    ...getTargetItemBySourceItemId(target, item.id)
  }));
}

export {
  merge,
  getMockEvent
}
