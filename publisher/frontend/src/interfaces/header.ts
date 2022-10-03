export interface HeaderProps {
  tab?: {
    index: number
    onSelectTab: (index: number) => void
  }
  onSearch: (query: string) => void
}
