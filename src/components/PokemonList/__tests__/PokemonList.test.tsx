import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PokemonList } from '../PokemonList';
import { GET_POKEMONS } from '../../../hooks/useGetPokemons';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockPokemons = [
  {
    id: '1',
    number: '001',
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: '2',
    number: '002',
    name: 'ivysaur',
    types: ['grass', 'poison'],
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  },
  {
    id: '3',
    number: '003',
    name: 'venusaur',
    types: ['grass', 'poison'],
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  },
];

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: { first: 151 },
    },
    result: {
      data: {
        pokemons: mockPokemons,
      },
    },
  },
];

describe('PokemonList', () => {
  it('renders loading state while fetching data', () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders all pokemons when data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      mockPokemons.forEach((pokemon) => {
        expect(
          screen.getByText(`#${pokemon.number}: ${pokemon.name}`)
        ).toBeInTheDocument();
      });
    });
  });

  it('filters pokemons based on search text', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Enter Pokemon Name...');
    fireEvent.change(searchInput, { target: { value: 'bul' } });

    // Only Bulbasaur should be visible
    expect(screen.getByText('#001: bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('#002: ivysaur')).not.toBeInTheDocument();
    expect(screen.queryByText('#003: venusaur')).not.toBeInTheDocument();
  });

  it('shows no results message when no pokemons match search', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Enter Pokemon Name...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No Pokemon Found')).toBeInTheDocument();
  });
});
