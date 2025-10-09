(() => {
  const numbersEl = document.getElementById('numbers');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const sizeInput = document.getElementById('size');
  const sizeVal = document.getElementById('sizeVal');
  const speedInput = document.getElementById('speed');
  const speedVal = document.getElementById('speedVal');
  const algoSelect = document.getElementById('algorithm');

  let arr = [];
  let running = false;
  let stopRequested = false;

  const delay = ms => new Promise(res => setTimeout(res, ms));

  sizeInput.oninput = () => {
    sizeVal.textContent = sizeInput.value;
    if (!running) buildArray(+sizeInput.value);
  };
  speedInput.oninput = () => speedVal.textContent = `${speedInput.value} ms`;
  sizeVal.textContent = sizeInput.value;
  speedVal.textContent = `${speedInput.value} ms`;

  function buildArray(n = +sizeInput.value) {
    arr = Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 1);
    renderNumbers();
  }

  function swap(i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  function renderNumbers(
  active = [],       // 正在操作的元素（如插入中）
  compare = [],      // 比較元素（紅色）
  sorted = [],       // 已排序（綠色）
  swapped = [],      // 交換（橘＋黃）
  mergingLeft = [],  // 左子陣列（藍色）
  mergingRight = [], // 右子陣列（紅色）
  merged = []        // 放回主陣列（黃色）
) {
  numbersEl.innerHTML = '';
  arr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'number';
    div.textContent = val;

    // 顏色優先順序（最上層狀態放前面）
    if (sorted.includes(i)) div.style.backgroundColor = '#019f1b';        // 🟩 已排序
    else if (merged.includes(i)) div.style.backgroundColor = '#ffeb3b';   // 🟨 正在放回主陣列
    else if (swapped.includes(i)) div.style.backgroundColor = '#ff9800';  // 🟧 交換中
    else if (active.includes(i)) div.style.backgroundColor = '#ff00ff';   // 🟪 正在操作的元素（如插入）
    else if (compare.includes(i)) div.style.backgroundColor = '#ff0000';  // 🟥 比較元素
    else if (mergingLeft.includes(i)) div.style.backgroundColor = '#2196f3';  // 🟦 左子陣列
    else if (mergingRight.includes(i)) div.style.backgroundColor = '#e91e63'; // 🟥 右子陣列
    else div.style.backgroundColor = '#ffffff';                           // ⚪ 普通元素

    numbersEl.appendChild(div);
  });
}

  /*function renderNumbers(active = [], compare = [], sorted = [], swapped = []) {
    numbersEl.innerHTML = '';
    arr.forEach((val, i) => {
      const div = document.createElement('div');
      div.className = 'number';
      div.textContent = val;

      if (sorted.includes(i)) div.style.backgroundColor = '#019f1bff'; // 已排序
      else if (swapped.includes(i)) div.style.backgroundColor = i === swapped[0] ? '#ff6600' : '#ffcc00'; // swap 大小不同顏色
      else if (active.includes(i)) div.style.backgroundColor = '#ff00ff'; // 正在操作元素
      else if (compare.includes(i)) div.style.backgroundColor = '#ff0000'; // 比較元素
      else div.style.backgroundColor = '#ffffffff'; // 普通元素

      numbersEl.appendChild(div);
    });
  }*/

  // ---------------- 排序演算法 ----------------

  async function bubbleSort() {
    const n = arr.length;
    let swapped = false;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        while (paused) await delay(50);
        if (stopRequested) return;
        renderNumbers([], [j, j + 1], Array.from({ length: i }, (_, k) => n - 1 - k));
        await delay(+speedInput.value);
        if (arr[j] > arr[j + 1]) {
          swap(j, j + 1);
          swapped = true;
          renderNumbers([], [j, j + 1], Array.from({ length: i }, (_, k) => n - 1 - k));
          await delay(+speedInput.value);
        }
      }
      if (!swapped) break;
    }
    renderNumbers([], [], Array.from({ length: n }, (_, k) => k));
  }

  async function selectionSort() {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        while (paused) await delay(50);
        if (stopRequested) return;
        renderNumbers([], [min, j], Array.from({ length: i }, (_, k) => k));
        await delay(+speedInput.value);
        if (arr[j] < arr[min]) min = j;
      }
      if (min !== i) {
        swap(i, min);
        renderNumbers([], [], Array.from({ length: i }, (_, k) => k), [i, min]);
        await delay(+speedInput.value);
      }
    }
    renderNumbers([], [], Array.from({ length: n }, (_, k) => k));
  }

  async function insertionSort() {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      // 標示要插入的 key
      renderNumbers([i], [], Array.from({ length: i }, (_, k) => k));
      await delay(+speedInput.value);

      while (j >= 0 && arr[j] > key) {
        while (paused) await delay(50);
        if (stopRequested) return;

        arr[j + 1] = arr[j];
        renderNumbers([j + 1], [j], Array.from({ length: i }, (_, k) => k));
        await delay(+speedInput.value);
        j--;
      }
      arr[j + 1] = key;
      renderNumbers([], [], Array.from({ length: i + 1 }, (_, k) => k));
      await delay(+speedInput.value);
    }
    renderNumbers([], [], Array.from({ length: n }, (_, k) => k));
  }


  
  async function mergeSort(start = 0, end = arr.length - 1) {
  if (stopRequested) return;
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  // 顯示左右子陣列（藍色 & 粉紅色）
  renderNumbers([], [], [], [],
    Array.from({ length: mid - start + 1 }, (_, i) => start + i),      // 左
    Array.from({ length: end - mid }, (_, i) => mid + 1 + i)           // 右
  );
  await delay(+speedInput.value * 2);

  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);

  await merge(start, mid, end);

  // 合併完成後顯示綠色（已排序）
  renderNumbers([], [], Array.from({ length: end - start + 1 }, (_, i) => start + i));
  await delay(+speedInput.value);
}


  async function merge(start, mid, end) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      while (paused) await delay(50);
      if (stopRequested) return;
      renderNumbers([k], [], []);
      await delay(+speedInput.value);
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
    }
    while (i < left.length) {
      while (paused) await delay(50);
      if (stopRequested) return;
      arr[k++] = left[i++];
      renderNumbers([k - 1]);
      await delay(+speedInput.value);
    }
    while (j < right.length) {
      while (paused) await delay(50);
      if (stopRequested) return;
      arr[k++] = right[j++];
      renderNumbers([k - 1]);
      await delay(+speedInput.value);
    }
  }

function renderQuickSort(left = [], right = [], pivot = [], swapped = [], sorted = []) {
  numbersEl.innerHTML = '';
  arr.forEach((val, i) => {
    const div = document.createElement('div');
    div.className = 'number';
    div.textContent = val;

    if (sorted.includes(i)) div.style.backgroundColor = '#4CAF50';     // 🟩 確定位置
    else if (swapped.includes(i)) div.style.backgroundColor = '#FF9800'; // 🟧 交換中
    else if (pivot.includes(i)) div.style.backgroundColor = '#2196F3'; // 🟦 pivot
    else if (left.includes(i)) div.style.backgroundColor = '#E91E63';  // 🟥 左指標 i
    else if (right.includes(i)) div.style.backgroundColor = '#9C27B0'; // 🟪 右指標 j
    else div.style.backgroundColor = '#FFFFFF';                        // ⚪ 其他

    numbersEl.appendChild(div);
  });
}

async function quickSort(start = 0, end = arr.length - 1) {
  if (stopRequested) return;
  if (start >= end) return;

  while (paused) await delay(50);

  const p = await partition(start, end);

  // pivot 確定 → 標綠
  renderQuickSort([], [], [], [], [p]);
  await delay(+speedInput.value);

  await quickSort(start, p - 1);
  await quickSort(p + 1, end);
  // 最後：整段變綠（可選） 
  if (end - start > 1) 
    renderQuickSort([], [], [], [], Array.from({ length: end - start + 1 }, (_, i) => start + i));
}

async function partition(start, end) {
  const pivot = arr[start];
  let i = start + 1;
  let j = end;

  renderQuickSort([], [], [start], [], []); // 標示 pivot
  await delay(+speedInput.value);

  while (true) {
    while (paused) await delay(50);
    if (stopRequested) return;

    // 左指標往右找比 pivot 大的
    while (i <= end && arr[i] <= pivot) {
      while (paused) await delay(50);
      renderQuickSort([i], [j], [start], [], []);
      await delay(+speedInput.value);
      i++;
    }

    // 右指標往左找比 pivot 小的
    while (j >= start && arr[j] > pivot) {
      while (paused) await delay(50);
      renderQuickSort([i], [j], [start], [], []);
      await delay(+speedInput.value);
      j--;
    }

    if (i >= j) break;

    // 交換
    swap(i, j);
    renderQuickSort([i], [j], [start], [i, j], []);
    await delay(+speedInput.value);
  }

  // pivot 換到中間正確位置
  swap(start, j);
  renderQuickSort([], [], [j], [start, j], [j]);
  await delay(+speedInput.value);

  return j;
}

  async function heapSort() {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
    for (let i = n - 1; i >= 0; i--) {
      swap(0, i);
      renderNumbers([], [], Array.from({ length: n - i }, (_, k) => n - 1 - k), [0, i]);
      await delay(+speedInput.value);
      await heapify(i, 0);
    }
    renderNumbers([], [], Array.from({ length: n }, (_, k) => k));
  }

  async function heapify(n, i) {
    while (paused) await delay(50);
    if (stopRequested) return;
    let largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      swap(i, largest);
      renderNumbers([], [], [], [i, largest]);
      await delay(+speedInput.value);
      await heapify(n, largest);
    }
  }

  // ---------------- 執行 ----------------
async function startSort() {
    if (running) return;
    running = true;
    stopRequested = false;
    paused = false;
    startBtn.disabled = true;
    shuffleBtn.disabled = true;
    sizeInput.disabled = true;
    algoSelect.disabled = true;
    stopBtn.textContent = 'pause';

    switch (algoSelect.value) {
      case 'bubble': await bubbleSort(); break;
      case 'selection': await selectionSort(); break;
      case 'insertion': await insertionSort(); break;
      case 'merge': await mergeSort(); break;
      case 'quick': await quickSort(); break;
      case 'heap': await heapSort(); break;
    }

    running = false;
    startBtn.disabled = false;
    shuffleBtn.disabled = false;
    sizeInput.disabled = false;
    algoSelect.disabled = false;
    stopBtn.textContent = 'pause';
  }

  function stopSort() {
    if (!running) return;
    paused = !paused; // 切換暫停/繼續
    stopBtn.textContent = paused ? 'resume' : 'pause';
  }

  shuffleBtn.addEventListener('click', () => { if (!running) buildArray(); });
  startBtn.addEventListener('click', () => startSort());
  stopBtn.addEventListener('click', stopSort);

  buildArray(+sizeInput.value);
})();