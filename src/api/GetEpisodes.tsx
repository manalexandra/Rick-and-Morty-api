export async function fetchEpisodes(): Promise<Episode[]> {
  let allEpisodes: Episode[] = [];
  let page = 1;
  let totalPages = 0;

  do {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
    const data = await response.json();
    allEpisodes = allEpisodes.concat(data.results);
    totalPages = data.info.pages;
    page++;
  } while (page <= totalPages);

  return allEpisodes;
}
