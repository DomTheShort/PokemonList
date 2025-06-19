import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBox } from '../SearchBox';
import '@testing-library/jest-dom';

describe('SearchBox', () => {
  const mockPokemons = [
    {
      id: '1',
      name: 'bulbasaur',
      number: '1',
      weight: { minimum: '6.9kg', maximum: '8.9kg' },
      height: { minimum: '0.69m', maximum: '0.89m' },
      classification: 'Seed Pokémon',
      types: ['grass', 'poison'],
      resistant: ['water', 'electric', 'grass', 'fighting', 'fairy'],
      weaknesses: ['fire', 'ice', 'flying', 'psychic'],
      fleeRate: 0.1,
      maxCP: 118,
      maxHP: 80,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    {
      id: '2',
      name: 'ivysaur',
      number: '2',
      weight: { minimum: '13.0kg', maximum: '17.2kg' },
      height: { minimum: '0.99m', maximum: '1.29m' },
      classification: 'Seed Pokémon',
      types: ['grass', 'poison'],
      resistant: ['water', 'electric', 'grass', 'fighting', 'fairy'],
      weaknesses: ['fire', 'ice', 'flying', 'psychic'],
      fleeRate: 0.07,
      maxCP: 241,
      maxHP: 150,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    },
    {
      id: '3',
      name: 'venusaur',
      number: '3',
      weight: { minimum: '88.4kg', maximum: '110.8kg' },
      height: { minimum: '1.96m', maximum: '2.44m' },
      classification: 'Seed Pokémon',
      types: ['grass', 'poison'],
      resistant: ['water', 'electric', 'grass', 'fighting', 'fairy'],
      weaknesses: ['fire', 'ice', 'flying', 'psychic'],
      fleeRate: 0.05,
      maxCP: 3318,
      maxHP: 250,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    },
  ];

  it('renders search input with placeholder', () => {
    const mockSetFilteredPokemons = jest.fn();
    render(
      <SearchBox
        pokemons={mockPokemons}
        setFilteredPokemons={mockSetFilteredPokemons}
      />
    );

    const input = screen.getByPlaceholderText('Enter Pokemon Name...');
    expect(input).toBeInTheDocument();
  });

  it('calls setFilteredPokemons when search text changes', () => {
    const mockSetFilteredPokemons = jest.fn();
    render(
      <SearchBox
        pokemons={mockPokemons}
        setFilteredPokemons={mockSetFilteredPokemons}
      />
    );

    const input = screen.getByPlaceholderText('Enter Pokemon Name...');
    fireEvent.change(input, { target: { value: 'bul' } });

    expect(mockSetFilteredPokemons).toHaveBeenCalledWith(
      expect.arrayContaining([mockPokemons[0]])
    );
  });

  it('filters pokemons case-insensitively', () => {
    const mockSetFilteredPokemons = jest.fn();
    render(
      <SearchBox
        pokemons={mockPokemons}
        setFilteredPokemons={mockSetFilteredPokemons}
      />
    );

    const input = screen.getByPlaceholderText('Enter Pokemon Name...');
    fireEvent.change(input, { target: { value: 'BUL' } });

    expect(mockSetFilteredPokemons).toHaveBeenCalledWith(
      expect.arrayContaining([mockPokemons[0]])
    );
  });

  it('clears filter when search text is empty', () => {
    const mockSetFilteredPokemons = jest.fn();
    render(
      <SearchBox
        pokemons={mockPokemons}
        setFilteredPokemons={mockSetFilteredPokemons}
      />
    );

    const input = screen.getByPlaceholderText('Enter Pokemon Name...');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockSetFilteredPokemons).toHaveBeenCalledWith(mockPokemons);
  });
});
