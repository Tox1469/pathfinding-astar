export interface Point {
  x: number;
  y: number;
}

export interface AStarOptions {
  grid: number[][];
  start: Point;
  goal: Point;
  diagonal?: boolean;
  walkable?: (value: number) => boolean;
}

interface Node {
  x: number;
  y: number;
  g: number;
  f: number;
  parent: Node | null;
}

const DIRS4 = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const DIRS8 = [
  ...DIRS4,
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function heuristic(a: Point, b: Point, diagonal: boolean): number {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  if (diagonal) return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy);
  return dx + dy;
}

export function findPath(opts: AStarOptions): Point[] | null {
  const { grid, start, goal } = opts;
  const diagonal = opts.diagonal ?? false;
  const walkable = opts.walkable ?? ((v) => v === 0);
  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const inB = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h;
  if (!inB(start.x, start.y) || !inB(goal.x, goal.y)) return null;
  if (!walkable(grid[goal.y][goal.x])) return null;

  const open: Node[] = [];
  const key = (x: number, y: number) => y * w + x;
  const visited = new Map<number, Node>();
  const startNode: Node = {
    x: start.x,
    y: start.y,
    g: 0,
    f: heuristic(start, goal, diagonal),
    parent: null,
  };
  open.push(startNode);
  visited.set(key(start.x, start.y), startNode);

  const dirs = diagonal ? DIRS8 : DIRS4;

  while (open.length) {
    let bestIdx = 0;
    for (let i = 1; i < open.length; i++) if (open[i].f < open[bestIdx].f) bestIdx = i;
    const cur = open.splice(bestIdx, 1)[0];

    if (cur.x === goal.x && cur.y === goal.y) {
      const path: Point[] = [];
      let n: Node | null = cur;
      while (n) {
        path.unshift({ x: n.x, y: n.y });
        n = n.parent;
      }
      return path;
    }

    for (const [dx, dy] of dirs) {
      const nx = cur.x + dx;
      const ny = cur.y + dy;
      if (!inB(nx, ny) || !walkable(grid[ny][nx])) continue;
      const step = dx !== 0 && dy !== 0 ? Math.SQRT2 : 1;
      const ng = cur.g + step;
      const k = key(nx, ny);
      const existing = visited.get(k);
      if (existing && ng >= existing.g) continue;
      const node: Node = {
        x: nx,
        y: ny,
        g: ng,
        f: ng + heuristic({ x: nx, y: ny }, goal, diagonal),
        parent: cur,
      };
      visited.set(k, node);
      open.push(node);
    }
  }
  return null;
}
