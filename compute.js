// compute.mjs
export function computeCohortData(students) {
  const groupedByCohort = Object.groupBy(students, ({ cohort }) => cohort);

  return Object.entries(groupedByCohort).map(([cohort, students]) => {
    // Filter out students with mark "ABJ"
    const presentStudents = students.filter(student => student.mark !== "ABJ");

    // Calculate average mark
    const totalMarks = presentStudents.reduce((sum, student) => sum + student.mark, 0);
    const averageMark = (totalMarks / presentStudents.length).toFixed(2);

    // Find best mark with max
    const bestMark = Math.max(...presentStudents.map(student => student.mark));

    // Find lowest mark with min
    const lowestMark = Math.min(...presentStudents.map(student => student.mark));

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(presentStudents.reduce((sum, student) => sum + Math.pow(student.mark - averageMark, 2), 0) / presentStudents.length);

    // Count number of students with mark < 10 (AJ)
    const countAJ = presentStudents.filter(student => student.mark < 10).length;

    // Count number of students with mark >= 10 (ADM)
    const countADM = presentStudents.filter(student => student.mark >= 10).length;

    // Count number of students with mark "ABJ"
    const countABJ = students.filter(student => student.mark === "ABJ").length;

    return { cohort, students: presentStudents, averageMark, bestMark, lowestMark, standardDeviation, countAJ, countADM, countABJ };
  });
}