import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon } from '../../hooks/useGetPokemons';

export interface SearchBoxProps {
  pokemons: Pokemon[];
  setFilteredPokemons: Dispatch<SetStateAction<Pokemon[]>>;
}

export const SearchBox = (props: SearchBoxProps) => {
  const { pokemons, setFilteredPokemons } = props;
  const classes = useStyles();

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchText?.toLowerCase())
      )
    );
  }, [searchText]);

  return (
    <div className={classes.searchBoxContainer}>
      <h3 className={classes.searchBoxLabel}>Search:</h3>
      <input
        value={searchText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value);
        }}
        placeholder="Enter Pokemon Name..."
        className={classes.searchBox}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    searchBox: {
      backgroundColor: 'unset',
      border: '2px solid white',
      borderRadius: '10px',
      padding: '10px',
      margin: '20px',
      '&:focus': {
        backgroundColor: '#454b55',
        outline: 'none',
      },
    },
    searchBoxLabel: {
      display: 'flex',
      alignItems: 'center',
    },
    searchBoxContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  { name: 'SearchBox' }
);
