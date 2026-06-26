export function assessMastery(p_prev, correct) {
    if (correct) {
        p_prev += 0.1;
    } else {
        p_prev += 0.01;
    }
    return (p_prev);
}