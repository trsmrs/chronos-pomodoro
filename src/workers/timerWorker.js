// esse script é basicamente para o navegador não por em pausa o meu timer 
// quando o navegador ou a página do Pomodoro estiver fora de foco

let isRunning = false;

self.onmessage = function (event) {
    if (isRunning) return
    isRunning = true;

    const state = event.data;
    const { activedTask, secondsRemaining } = state;

    const endDate = activedTask.startDate + secondsRemaining * 1000;

    const now = Date.now();
    let countDownSeconds = Math.floor((endDate - now) / 1000);

    function tick() {
        const now = Date.now();
        countDownSeconds = Math.floor((endDate - now) / 1000);

        self.postMessage(countDownSeconds);

        setTimeout(tick, 1000);
    }

    tick();
}