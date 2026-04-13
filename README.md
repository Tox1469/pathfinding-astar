# pathfinding-astar

Pathfinding A* em grid 2D, com suporte opcional a movimento diagonal.

## Instalacao

```bash
npm install pathfinding-astar
```

## Uso

```ts
import { findPath } from "pathfinding-astar";

const grid = [
  [0, 0, 0],
  [1, 1, 0],
  [0, 0, 0],
];
const path = findPath({ grid, start: { x: 0, y: 0 }, goal: { x: 2, y: 2 } });
```

## API

- `findPath({ grid, start, goal, diagonal?, walkable? })` retorna `Point[] | null`

## Licenca

MIT
