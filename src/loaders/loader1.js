module.exports = function (source) {
  return source.replace(/(let|const)/g, "var").replace(/(\d+)px/g, (match, p1) => {
    return (parseFloat(p1) / 100).toFixed(3) + 'rem'
  })
}
