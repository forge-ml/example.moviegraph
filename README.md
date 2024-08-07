# Movie Character Relationship Graph

This application takes a movie as input and generates a graph representing the relationships between characters in the story.

## What is Forge and how is it used?

Forge is a dev tool for building AI-powered applications. In this case, it is used to generate a graph representing the relationships between characters in a movie. Traditionally, this would be done by parsing the story of a movie and building relationships between characters. Then, those relationships would be stored in a graph and used to generate a graph.

With Forge, we can use AI to generate the relationships between characters in any movie with one function:

```typescript
async function generateRelationships(movie: string) {
  const relations = await forge.relations.query(
    `describe the relationships between the characters in the movie ${movie}`
  );
  return relations;
}
```

## Features

- **Character Nodes**:

  - Green nodes represent good characters.
  - Red nodes represent bad characters.

- **Relationships**:
  - Paths between nodes illustrate the relationships between characters.

## Usage

1. Input the movie title.
2. The app will process the movie and display the character relationship graph.

## Installation

1. Clone the repository with `git clone`
2. Install the required dependencies with `npm install`
3. Run the application with `npm run dev`

Link to live site: https://forge-charactergraph.netlify.app/
