[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/pathfinding-astar/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/pathfinding-astar/actions)
[![License](https://img.shields.io/github/license/Tox1469/pathfinding-astar?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/pathfinding-astar?style=flat-square)](https://github.com/Tox1469/pathfinding-astar/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/pathfinding-astar?style=flat-square)](https://github.com/Tox1469/pathfinding-astar/stargazers)

---

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