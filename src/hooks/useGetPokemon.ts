import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon } from './useGetPokemons';

export const GET_POKEMONS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (id: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      id,
    },
  });

  const pokemon: Pokemon | undefined = useMemo(() => data?.pokemon, [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
