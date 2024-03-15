export async function fetchCharacters(): Promise<Character[]> {
  let AllCharacters: Character[] = [];
  let page = 1;
  let totalPages = 0;

  do {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    AllCharacters = AllCharacters.concat(data.results);
    totalPages = data.info.pages;
    page++;
  } while (page <= totalPages);

  return AllCharacters;
}
