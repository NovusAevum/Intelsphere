import React from 'react';

interface ExampleComponentProps {
  name?: string;
}

interface ExampleComponentProps {
  name?: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ name }) => {
  return <div>{name ? name.toUpperCase() : 'No name provided'}</div>;
};
  return <div>{name ? name.toUpperCase() : 'No name provided'}</div>;
};
interface ExampleComponentProps {
  name?: string;
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({ name }) => {
  return <div>{name ? name.toUpperCase() : 'No name provided'}</div>;
};