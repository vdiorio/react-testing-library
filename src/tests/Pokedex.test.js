import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Verifica se existe um heading com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(heading).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon da lista', () => {
  renderWithRouter(<App />);
  // clicar em Proximo pokemon e verifica o nome
  const clickNext = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(clickNext).toHaveTextContent('Próximo pokémon');
  userEvent.click(clickNext);
  // verificar se alterou
  const diferentePokemon = screen.getByText(/charmander/i);
  expect(diferentePokemon).toBeInTheDocument();
});

test('Testa se é exibido o primeiro Pokémon da lista', () => {
  renderWithRouter(<App />);
  const numeroMaximo = 7;
  for (let i = 0; i < numeroMaximo; i += 1) {
    const clickNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(clickNext);
  }
});

test('Testa se só mostra um por um', () => {
  renderWithRouter(<App />);
  // Verificar se mostra um a um
  const cardNaTela = screen.getAllByTestId('pokemon-name');
  expect(cardNaTela).toHaveLength(1);
});

test('Testa se tem os filtros', () => {
  renderWithRouter(<App />);
  const numeroDeFiltros = 7;
  const filtros = screen.getAllByTestId('pokemon-type-button');
  expect(filtros).toHaveLength(numeroDeFiltros);
  const tipos = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  filtros.forEach((botao, i) => {
    expect(botao).toHaveTextContent(tipos[i]);
  });
  const botaoAll = screen.getByRole('button', { name: /all/i });
  expect(botaoAll).toBeVisible();
  const buttonTypePokemon = screen.getByRole('button',
    { name: 'Fire' });
  expect(buttonTypePokemon).toBeInTheDocument();
  userEvent.click(buttonTypePokemon);
  const cardTypePokemon = screen.getByTestId('pokemon-type');
  expect(cardTypePokemon).toHaveTextContent('Fire');
});

test('Testa se tem botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  expect(allButton).toHaveTextContent('All');
  userEvent.click(allButton);

  const cardTypePokemon = screen.getByTestId('pokemon-type');
  userEvent.click(allButton);
  expect(cardTypePokemon).toBeInTheDocument();
});
