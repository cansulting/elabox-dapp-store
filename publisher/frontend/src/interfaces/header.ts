export interface HeaderProps {
  tab: {
    index: number
    selectTab: (index: number) => void
  }
  onSearch: (query: string) => void
}
