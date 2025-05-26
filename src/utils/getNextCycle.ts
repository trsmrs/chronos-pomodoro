export function getNextCycle(currentCycle: number) {
    return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}

// cycle inicia como zero, mas se já tiver um valor, ele pega o valor atual e soma +1
// e quando chega a valor 8 ele volta para 1