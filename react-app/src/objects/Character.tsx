interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  location: Location;
  episode: string[];
  species: string;
  gender: string;
}

interface Location {
  name: string;
}
