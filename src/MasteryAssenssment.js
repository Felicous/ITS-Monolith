/**
 * Predicts the students knowlegde via Bayesian Knowledge Tracing.
 * Source of the Formulas: https://www.cs.williams.edu/~iris/res/bkt-balloon/index.html
 * @param {number} pPrev - Probability that the studen learned the concept previously.
 * @param {boolean} correct - Students awnser to the task.
 */
export function assessMastery(pPrev, correct) {
    /** 
     * @typedef {number} pWillLearn - Probability that the Student will learn the concept with this task.
     * @typedef {number} pSlip - Probability that the student will answer incorrectly despite knowing the concept.
     * @typedef {number} pGuess - Probability that the student will answer correctly despite not knowing the concept.
     * @typedef {number} pLearnedAwnser - conditional probability that the student learned the concept previously.
     */
    const pWillLearn = 0.20;
    const pSlip = 0.05;
    const pGuess = 0.30;
    let pLearnedAwnser;

    if (correct) {  // If the awnser is correct
        pLearnedAwnser = (pPrev * (1 - pSlip)) / (pPrev * (1 - pSlip) + (1 - pPrev) * pGuess);
    } else {  // If the awnser is incorrect
        pLearnedAwnser = (pPrev * pSlip) / (pPrev * pSlip + (1 - pPrev) * (1 - pGuess));
    }

    return (pLearnedAwnser + (1 - pLearnedAwnser) * pWillLearn);
}