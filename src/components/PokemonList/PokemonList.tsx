import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { SearchBox } from './SearchBox';
import { PokemonListItem } from './PokemonListItem';
import { PokemonDetailsDialog } from './PokemonDetailsDialog';
import { useSearchParams } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchParams] = useSearchParams();

  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setSelectedPokemonId(searchParams.get('id'));
  }, [searchParams]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <div className={classes.root}>
      <SearchBox
        pokemons={pokemons}
        setFilteredPokemons={setFilteredPokemons}
      />
      <div className={classes.listContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : filteredPokemons?.length ? (
          filteredPokemons.map((pokemon) => (
            <PokemonListItem key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div>No Pokemon Found</div>
        )}
      </div>
      {selectedPokemonId && (
        <PokemonDetailsDialog
          open={!!selectedPokemonId}
          pokemonId={selectedPokemonId}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '32px',
    },
  },
  { name: 'PokemonList' }
);
