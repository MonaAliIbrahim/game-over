interface Sort {
  name: string,
  id: number,
}

let SortBy: Sort[] = [
  {name: 'Release-date', id: 1}, 
  {name: 'Popularity', id: 2},
  {name: 'Alphabetical', id: 3}, 
  {name: 'Relevance', id: 4}
]

export default SortBy;
