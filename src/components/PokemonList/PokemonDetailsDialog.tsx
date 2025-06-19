import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Dialog } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useGetPokemon } from 'src/hooks/useGetPokemon';
import clsx from 'clsx';

export interface PokemonDetailsDialogProps {
  open: boolean;
  pokemonId: string;
}

export const PokemonDetailsDialog = (props: PokemonDetailsDialogProps) => {
  const { open, pokemonId } = props;
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const { pokemon, loading, error } = useGetPokemon(pokemonId);

  const handleClose = () => {
    setSearchParams({});
  };

  useEffect(() => {
    if (!loading && !pokemon) {
      console.error(
        'API error: Unable to fetch Pokemon Data with supplied ID: ' +
          searchParams.get('id')
      );
      handleClose();
    }
  }, [loading, error]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            //MUI does not appear to be compatible with JSS (https://mui.com/material-ui/integrations/interoperability/#jss-tss),
            //breaking conventions of ReadMe to set more appropriate default background color and size for dialog in place of upgrading to tss
            backgroundColor: '#2e3540',
            maxWidth: 'unset',
          },
        },
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.dialogContent}>
          <div className={classes.dialogHeader}>
            <h1>
              {pokemon
                ? `#${pokemon.number}: ${pokemon.name}`
                : 'Fetching Pokemon Data'}
            </h1>
            <span
              className={clsx(classes.closeButton, 'material-icons')} //Also not strictly JSS but following pattern shown in NavOption.tsx
              onClick={handleClose}
            >
              close
            </span>
          </div>

          {pokemon && (
            <div className={classes.dialogBody}>
              <img src={pokemon.image} className={classes.pokemonImage} />
              <div className={classes.pokemonDetails}>
                <span>
                  <b>Type(s): </b>
                  {pokemon.types.join(', ')}
                </span>
                <span>
                  <b>Weight: </b>
                  {`${pokemon.weight.minimum} - ${pokemon.weight.maximum}`}
                </span>
                <span>
                  <b>Height: </b>
                  {`${pokemon.height.minimum} - ${pokemon.height.maximum}`}
                </span>
                <span>
                  <b>Classification: </b>
                  {pokemon.classification}
                </span>
                <span>
                  <b>Resistance(s): </b>
                  {pokemon.resistant.join(', ')}
                </span>
                <span>
                  <b>Weakness(es): </b>
                  {pokemon.weaknesses.join(', ')}
                </span>
                <span>
                  <b>Flee Rate: </b>
                  {pokemon.fleeRate}
                </span>
                <span>
                  <b>Max CP: </b>
                  {pokemon.maxCP}
                </span>
                <span>
                  <b>Max HP: </b>
                  {pokemon.maxHP}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
};

const useStyles = createUseStyles(
  {
    closeButton: {
      '&:hover': {
        filter: 'brightness(120%)',
      },
      cursor: 'pointer',
      marginBottom: 'auto',
    },
    dialogContent: {
      padding: '20px',
    },
    dialogHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dialogBody: {
      display: 'flex',
      flexDirection: 'row',
      gap: '32px',
    },
    pokemonImage: {
      borderRadius: '10px',
      maxWidth: '75%',
      maxHeight: '75%',
      margin: 'auto',
    },
    pokemonDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
  },
  { name: 'PokemonDetailsDialog' }
);
