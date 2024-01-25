const LANGUAGE: string = 'language'
const THEMEMODE: string = 'themeMode'
const DRAWEROPEN: string = 'drawerOpen'
const HEADERNAME: string = 'headerName'

export function setLanguageStorage(language: 'EN' | 'AR' | 'TR'): void {
  sessionStorage.setItem(LANGUAGE, language ?? 'tr')
}

export function setThemeModeStorage(themeMode: 'light' | 'dark'): void {
  sessionStorage.setItem(THEMEMODE, themeMode ?? 'light')
}

export function setHeaderName(name: string): void {
  sessionStorage.setItem(HEADERNAME, name)
}
export function getHeaderName(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const name: any = sessionStorage.getItem(HEADERNAME)
  return name
}

export function getLanguageStorage(): 'EN' | 'AR' | 'TR' {
  const language: 'EN' | 'AR' | 'TR' | undefined = sessionStorage.getItem(LANGUAGE) as 'EN' | 'AR' | 'TR' | undefined
  return language === undefined ? 'EN' : language
}

export function setDrawerStatusStorage(drawerOpen: boolean): void {
  sessionStorage.setItem(DRAWEROPEN, JSON.stringify(drawerOpen))
}

export function getDrawerStatusStorage(): boolean {
  const storedValue = sessionStorage.getItem(DRAWEROPEN)
  return storedValue ? Boolean(JSON.parse(storedValue)) : false
}

export function getThemeModeStorage(): 'light' | 'dark' {
  const themeMode = sessionStorage.getItem(THEMEMODE) as 'light' | 'dark'
  return themeMode
}
