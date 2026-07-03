export function InputAnalysis(task, input) {

    // ensures that input can reliably be compared to the expected solution
    const normalizedInput = input
        .map(x => x.toLowerCase())
        .sort();

    const normalizedSolution = task.solution
        .map(x => x.toLowerCase())
        .sort();


    return (normalizedInput === normalizedSolution);

}