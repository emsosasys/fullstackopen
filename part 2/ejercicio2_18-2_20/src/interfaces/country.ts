interface Country {
  name: {
    common: string
    official: string
  }
  capital: string[]
  languages: {
    [key: string]: string
  }
  area: number
  flags: {
    png: string
    alt: string
  }
}