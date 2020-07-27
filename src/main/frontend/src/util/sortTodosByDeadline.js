const compareSubstrings = (a, b, begin, end) => {
    return a.substring(begin, end).localeCompare(b.substring(begin, end));
}

// date format: "dd-mm-yyyy hh:mm"

const compareByYear = (a, b) => compareSubstrings(a, b, 6, 10);
const compareByMonth = (a, b) => compareSubstrings(a, b, 3, 5);
const compareByDay = (a, b) => compareSubstrings(a, b, 0, 2);
const compareByTime = (a, b) => compareSubstrings(a, b, 11, 16);

const compareOrder = [
    compareByYear,
    compareByMonth,
    compareByDay,
    compareByTime
]

const sortTodosByDeadline = (a, b) => {
    const deadlineA = a.deadline;
    const deadlineB = b.deadline;
    if (!deadlineA || !deadlineB) {
        if (!deadlineA && !deadlineB) {
            return 0;
        } else {
            return !deadlineA ? 1 : -1;
        }
    }

    let res = 0;
    let i = 0;
    while (res === 0 && i < compareOrder.length) {
        res = compareOrder[i++](deadlineA, deadlineB);
    }
    return res;
}

export default sortTodosByDeadline;