/*
# ================================================================
# 株式会社ポテパン様 技術課題  
# ストップウォッチアプリケーション作成
# ストップウォッチ処理
# 001 CREATE 2023.10.03 Shoya Ito
# ================================================================
# （参考サイト）https://m-kenomemo.com/react-stopwatch/
*/

// 時間表示
const showTime = document.getElementById('time');
// 各種ボタン
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// 初期状態ではスタートボタン以外押下できないようにする
startButton.disabled = false;
stopButton.disabled = true;
resetButton.disabled = true;

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイマー処理ID
let timerID;


// 時間表示用関数
function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);

  // "HH:MM:ss.fff" 表記
  const hh = String(currentTime.getHours()-9).padStart(2, '0');
  const mm = String(currentTime.getMinutes()).padStart(2, '0');
  const ss = String(currentTime.getSeconds()).padStart(2, '0');
  const fff = String(currentTime.getMilliseconds()).padStart(3, '0');

  showTime.textContent = `${hh}:${mm}:${ss}.${fff}`;
  timerID = setTimeout(displayTime, 10);
}

// スタートボタン押下時処理
startButton.addEventListener('click', () => {
  // 各ボタンの活性化・非活性化
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  startTime = Date.now();
  displayTime();
});

// ストップボタン押下時処理
stopButton.addEventListener('click', function() {
  // 各ボタンの活性化・非活性化
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  // タイマー処理停止
  clearTimeout(timerID);
  stopTime += (Date.now() - startTime);
});

// リセットボタン押下時処理
resetButton.addEventListener('click', function() {
  // 各ボタンの活性化・非活性化
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;

  // タイマー処理停止
  clearTimeout(timerID);
  // 表示時間をリセット
  showTime.textContent = '00:00:00.000';
  stopTime = 0;
});
