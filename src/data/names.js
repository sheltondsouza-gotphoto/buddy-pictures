// Generate 50 unique names with 5 groups and 5 teachers
// Each name has: { name, group, teacher, job }
// All names have job: "Test job"

const groups = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
const teachers = ['Ms. Johnson', 'Mr. Smith', 'Ms. Williams', 'Mr. Brown', 'Ms. Davis'];

// First names pool
const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'James', 'Mia', 'Benjamin', 'Charlotte', 'Lucas', 'Amelia',
  'Henry', 'Harper', 'Alexander', 'Evelyn', 'Michael', 'Abigail', 'Daniel',
  'Emily', 'Matthew', 'Elizabeth', 'Aiden', 'Sofia', 'Joseph', 'Avery',
  'David', 'Ella', 'Jackson', 'Madison', 'Logan', 'Scarlett', 'John',
  'Victoria', 'Luke', 'Aria', 'Jack', 'Grace', 'Owen', 'Chloe', 'Wyatt',
  'Penelope', 'Carter', 'Layla', 'Julian', 'Riley', 'Levi', 'Zoey'
];

// Last names pool
const lastNames = [
  'Anderson', 'Martinez', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin',
  'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris',
  'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen',
  'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Mitchell', 'Roberts', 'Turner', 'Phillips',
  'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez',
  'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy'
];

// Generate 50 unique names
const generateNames = () => {
  const names = [];
  let nameIndex = 0;
  const usedNames = new Set();
  
  // Distribute 50 names across 5 groups and 5 teachers (2 names per teacher-group combination)
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    for (let teacherIndex = 0; teacherIndex < teachers.length; teacherIndex++) {
      // 2 names per teacher-group combination (5 groups * 5 teachers * 2 = 50)
      for (let i = 0; i < 10; i++) {
        let firstName, lastName, fullName;
        let attempts = 0;
        
        // Ensure unique names
        do {
          const firstIdx = (nameIndex + attempts) % firstNames.length;
          const lastIdx = Math.floor((nameIndex + attempts) / firstNames.length) % lastNames.length;
          firstName = firstNames[firstIdx];
          lastName = lastNames[lastIdx];
          fullName = `${firstName} ${lastName}`;
          attempts++;
        } while (usedNames.has(fullName) && attempts < 100);
        
        // If still not unique, add a number
        if (usedNames.has(fullName)) {
          fullName = `${firstName} ${lastName} ${nameIndex + 1}`;
        }
        
        usedNames.add(fullName);
        
        names.push({
          name: fullName,
          group: groups[groupIndex],
          teacher: teachers[teacherIndex],
          job: 'Test job'
        });
        
        nameIndex++;
      }
    }
  }
  
  return names;
};

export const namesData = generateNames();

// Organize names by job -> group -> teacher
export const organizeByHierarchy = (names) => {
  const organized = {};
  
  names.forEach(name => {
    if (!organized[name.job]) {
      organized[name.job] = {};
    }
    if (!organized[name.job][name.group]) {
      organized[name.job][name.group] = {};
    }
    if (!organized[name.job][name.group][name.teacher]) {
      organized[name.job][name.group][name.teacher] = [];
    }
    organized[name.job][name.group][name.teacher].push(name);
  });
  
  return organized;
};
