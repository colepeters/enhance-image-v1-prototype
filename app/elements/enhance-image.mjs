function formatPath ({
  path,
  width,
  quality,
  format,
}) {
  const widthParam = `width_${width}`
  const qualityParam = quality ? `quality_${quality}` : ''
  const formatParam = format ? `format_${format}` : ''

  // Build the full transform path
  const transforms =
    [widthParam, qualityParam, formatParam]
      .reduce((result, opt) => {
        return opt ? `${result},${opt}` : result
      }, '')
      .replace(',', '') // Strip the leading comma

  return `/transform/${transforms}${path} ${width}w`
}

export default function EnhanceImage({ html, state }) {
  const { attrs, store } = state
  const { enhance: { image: {
    widths,
    quality,
    format,
  } } } = store
  const {
    alt = '',
    src,
    sizes = '100vw',
    height,
    width,
  } = attrs

  const loadingStrategy = Object.keys(attrs).includes('priority') ? 'fetchpriority="high"' : 'loading="lazy"'

  const formatted = widths.map(width => {
    return formatPath({
      path: src,
      width,
      quality,
      format,
    })
  }).join(', ')

  return html`
    <style>
      img {
        max-inline-size: 100%;
        block-size: auto;
      }
    </style>
    <img
      alt='${alt}'
      srcset='${formatted}'
      sizes='${sizes}'
      width='${width}'
      height='${height}'
      ${loadingStrategy}
    />
  `
}
