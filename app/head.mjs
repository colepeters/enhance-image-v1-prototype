import { getStyles }  from '@enhance/arc-plugin-styles'

const { linkTag } = getStyles

export default function Head (state) {
  if (state.store?.enhance === undefined) {
    state.store.enhance = {
      image: {
        widths: [2400, 1200, 800],
        quality: 80,
        format: 'webp',
      }
    }
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Enhance Starter Project</title>
      ${linkTag()}
      <link rel="icon" href="/_public/favicon.svg">
      <meta name="description" content="The HTML first full stack web framework.">
    </head>
    <body class="p4 font-sans">
`
}
