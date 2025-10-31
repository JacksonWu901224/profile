document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');

  const rows = 30, cols = 30;
  const cellW = canvas.width / cols, cellH = canvas.height / rows;

  let start = [0,0];
  let goal = [rows-1, cols-1];
  let grid = createGrid();

  const speedInput = document.getElementById('speed');
  const speedVal = document.getElementById('speedVal');
  speedVal.textContent = speedInput.value;
  speedInput.addEventListener('input', () => {
    speedVal.textContent = speedInput.value;
  });

  // 重建地圖：只重置地圖，不跑算法
  document.getElementById('regen').addEventListener('click', () => {
    grid = createGrid();
    grid[start[0]][start[1]] = 0;
    grid[goal[0]][goal[1]] = 0;
    drawGrid();
  });

  // Start 按鈕：依選擇算法跑動畫
  document.getElementById('start').addEventListener('click', () => {
    searchAlgorithm();
  });

  function createGrid() {
    const g = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < 250; i++) {
      g[Math.floor(Math.random() * rows)][Math.floor(Math.random() * cols)] = 1;
    }
    return g;
  }

  function drawGrid(frontierSet = new Set(), visitedSet = new Set(), path = []) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const x = c*cellW, y = r*cellH;
        ctx.fillStyle = grid[r][c]===1?'#333':'#fff';
        ctx.fillRect(x,y,cellW,cellH);
        ctx.strokeRect(x,y,cellW,cellH);
      }
    }

    visitedSet.forEach(k=>{
      const [r,c] = k.split(',').map(Number);
      ctx.fillStyle='rgba(0, 106, 255, 0.5)';
      ctx.fillRect(c*cellW,r*cellH,cellW,cellH);
    });

    frontierSet.forEach(k=>{
      const [r,c] = k.split(',').map(Number);
      ctx.fillStyle='rgba(255, 166, 0, 0.62)';
      ctx.fillRect(c*cellW,r*cellH,cellW,cellH);
    });

    path.forEach(([r,c])=>{
      ctx.fillStyle='rgba(0, 255, 0, 0.65)';
      ctx.fillRect(c*cellW,r*cellH,cellW,cellH);
    });

    ctx.fillStyle='blue';
    ctx.fillRect(start[1]*cellW,start[0]*cellH,cellW,cellH);
    ctx.fillStyle='red';
    ctx.fillRect(goal[1]*cellW,goal[0]*cellH,cellW,cellH);
  }

  function neighbors(r,c){
    const res=[];
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      if(nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]===0) res.push([nr,nc]);
    });
    return res;
  }

  async function bfs(){
    const q=[[start[0],start[1]]];
    const parent={};
    const visited=new Set([start.join(',')]);
    const frontier=new Set([start.join(',')]);
    drawGrid(frontier,visited);

    while(q.length){
      const [r,c]=q.shift();
      frontier.delete([r,c].join(','));
      visited.add([r,c].join(','));
      drawGrid(frontier,visited);
      await new Promise(rp=>setTimeout(rp,Number(speedInput.value)));
      if(r===goal[0] && c===goal[1]) break;
      for(const [nr,nc] of neighbors(r,c)){
        const key=[nr,nc].join(',');
        if(!visited.has(key) && !frontier.has(key)){
          parent[key]=[r,c];
          q.push([nr,nc]);
          frontier.add(key);
        }
      }
    }
    reconstructPath(parent);
  }

  function heuristic(a,b){
    return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
  }
  async function astar(){
    const openSet=[[start[0],start[1]]];
    const parent={};
    const gScore={};
    gScore[start.join(',')]=0;
    const visited=new Set();
    const frontier=new Set([start.join(',')]);

    while(openSet.length){
      openSet.sort((a,b)=>(gScore[a.join(',')]+heuristic(a,goal))-(gScore[b.join(',')]+heuristic(b,goal)));
      const [r,c]=openSet.shift();
      frontier.delete([r,c].join(','));
      visited.add([r,c].join(','));
      drawGrid(frontier,visited);
      await new Promise(rp=>setTimeout(rp,Number(speedInput.value)));
      if(r===goal[0] && c===goal[1]) break;
      for(const [nr,nc] of neighbors(r,c)){
        const key=[nr,nc].join(',');
        const tentativeG=gScore[[r,c].join(',')]+1;
        if(!(key in gScore) || tentativeG<gScore[key]){
          gScore[key]=tentativeG;
          parent[key]=[r,c];
          if(!visited.has(key) && !frontier.has(key)){
            openSet.push([nr,nc]);
            frontier.add(key);
          }
        }
      }
    }
    reconstructPath(parent);
  }

  function reconstructPath(parent){
    let path=[];
    let cur=goal.join(',');
    if(parent[cur] || cur===start.join(',')){
      while(cur && cur!==start.join(',')){
        path.push(cur.split(',').map(Number));
        cur=parent[cur]?parent[cur].join(','):null;
      }
      path.push(start);
      path=path.reverse();
    }
    drawGrid(new Set(), new Set(), path);
  }

  let running = false;
  async function searchAlgorithm(){
    if(running) return;
    running = true;
    const algo=document.querySelector('input[name="algo"]:checked').value;
    if(algo==='bfs') await bfs();
    else if(algo==='astar') await astar();
    running = false;
  }

  // 初始只畫地圖，不跑算法
  drawGrid();
});
