import axios from 'axios';

const fetchFilmData = async () => {
  const url = "https://swapi-graphql.netlify.app/.netlify/functions/index/";
  const query = `
    {
      allFilms {
        films {
          title
          releaseDate
          id
          planetConnection {
            totalCount
          }
          openingCrawl
          speciesConnection {
            totalCount
          }
          starshipConnection {
            totalCount
          }
          vehicleConnection {
            totalCount
          }
          characterConnection {
            characters {
              name
              birthYear
              height
              mass
              filmConnection {
                films {
                  id
                  title
                  openingCrawl
                }
              }
              homeworld {
                id
                name
              }
              id
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(url, { query }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data.allFilms.films;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default fetchFilmData;