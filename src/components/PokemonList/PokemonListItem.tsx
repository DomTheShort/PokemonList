import React from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';
import { useSearchParams } from 'react-router-dom';

export interface PokemonListItemProps {
  pokemon: Pokemon;
}

export const PokemonListItem = (props: PokemonListItemProps) => {
  const { pokemon } = props;
  const classes = useStyles();
  const [_searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className={classes.root}
      onClick={() => {
        setSearchParams({ id: pokemon.id });
      }}
    >
      <img src={pokemon.image} className={classes.pokemonImage} />
      <div
        className={classes.pokemonName}
      >{`#${pokemon.number}: ${pokemon.name}`}</div>
      <div>{`Type(s): ${pokemon.types.join(', ')}`}</div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      //Stretches the card of the pokemon to full width, looks a bit awkward with few search results in a row,
      // but I preferred the responsiveness to different screen sizes as opposed to leaving excess whitespace at breakpoints,
      // as well as opposed to percentage based sizing, due to differing aspect ratios of images,
      // I would likely bring this to a designer or other team mebers for second opinions
      justifyContent: 'center',
      padding: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#2e3540',
      borderRadius: '10px',
      '&:hover': {
        backgroundColor: '#747880',
        cursor: 'pointer',
      },
    },
    pokemonImage: {
      borderRadius: '10px',
      maxWidth: '75%',
      maxHeight: '75%',
      margin: 'auto',
    },
    pokemonName: {
      fontWeight: 'bold',
      fontSize: '1.5em',
    },
  },
  { name: 'PokemonListItem' }
);
