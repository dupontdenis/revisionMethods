import { computeCohortData } from './compute.js';

let students = [];

const cohorts = ["DDI", "INFO", "DDD"];
const names = ["Grace", "Hank", "Ivy", "Jack", "Kara", "Leo", "Mia", "Nina", "Oscar", "Paul", "Quinn", "Rita", "Sam", "Tina", "Uma", "Zane", "Brian", "Derek", "Victor", "Wendy", "Xander", "Yara"];

// Function to generate a random name
function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}

// Function to generate a random mark between 0 and 20 or "ABJ"
function getRandomMark() {
  const randomValue = Math.random();
  if (randomValue < 0.1) { // 10% chance
    return "ABJ";
  } else {
    return Math.floor(Math.random() * 21);
  }
}

// Function to render students
function renderStudents() {
  const studentDataSection = document.getElementById('student-data');
  studentDataSection.innerHTML = ''; // Clear previous data

  students.forEach((student, index) => {
    const studentArticle = document.createElement('article');

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = `Name: ${student.name}`;
    studentArticle.appendChild(nameParagraph);

    const cohortParagraph = document.createElement('p');
    cohortParagraph.textContent = `Cohort: ${student.cohort}`;
    studentArticle.appendChild(cohortParagraph);

    const markParagraph = document.createElement('p');
    markParagraph.textContent = `Mark: ${student.mark}`;
    studentArticle.appendChild(markParagraph);

    studentArticle.addEventListener('click', () => {
      students.splice(index, 1); // Remove student from array
      renderStudents(); // Re-render students
      renderCohortData(); // Recompute and render cohort data
    });

    studentDataSection.appendChild(studentArticle);
  });
}

// Function to render cohort data
function renderCohortData() {
  const cohortDataElement = document.getElementById('cohort-data');
  cohortDataElement.innerHTML = ''; // Clear previous data

  const cohortData = computeCohortData(students);
  cohortData.forEach(({ cohort, averageMark, bestMark, lowestMark, standardDeviation, countAJ, countADM, countABJ }) => {
    const cohortElement = document.createElement('div');
    cohortElement.innerHTML = `
      <h2>Cohort: ${cohort}</h2>
      <p>Average Mark: ${averageMark}</p>
      <p>Best Mark: ${bestMark}</p>
      <p>Lowest Mark: ${lowestMark}</p>
      <p>Standard Deviation: ${standardDeviation.toFixed(2)}</p>
      <p>Number of Students (AJ): ${countAJ}</p>
      <p>Number of Students (ADM): ${countADM}</p>
      <p>Number of Students (ABJ): ${countABJ}</p>
    `;
    cohortDataElement.appendChild(cohortElement);
  });
}

document.getElementById('add-student').addEventListener('click', () => {
  const name = getRandomName();
  const mark = getRandomMark();
  const cohort = cohorts[Math.floor(Math.random() * cohorts.length)];

  students.push({ name, cohort, mark });
  renderStudents();
  renderCohortData();
});

// Initial render of cohort data
renderCohortData();