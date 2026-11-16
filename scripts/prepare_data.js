import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const contentDir = path.join(rootDir, 'content');
const srcDataDir = path.join(rootDir, 'src', 'data');

// Ensure destination exists
if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

// 1. Copy graduands.json
const graduandsRaw = fs.readFileSync(path.join(contentDir, 'data', 'graduands.json'), 'utf8');
const graduands = JSON.parse(graduandsRaw).map(g => ({
  ...g,
  image: g.image.startsWith('/') ? g.image : `/${g.image}`
}));
fs.writeFileSync(path.join(srcDataDir, 'graduands.json'), JSON.stringify(graduands, null, 2));

// 2. Copy records.json
const recordsRaw = fs.readFileSync(path.join(contentDir, 'data', 'records.json'), 'utf8');
const records = JSON.parse(recordsRaw);
fs.writeFileSync(path.join(srcDataDir, 'records.json'), JSON.stringify(records, null, 2));

// 3. Copy department_data.json
const deptRaw = fs.readFileSync(path.join(contentDir, 'Not_sorted', 'remain_extraction', 'department_data.json'), 'utf8');
const departmentData = JSON.parse(deptRaw);
fs.writeFileSync(path.join(srcDataDir, 'department_data.json'), JSON.stringify(departmentData, null, 2));

// 4. Process all text files in content/text
const textFiles = fs.readdirSync(path.join(contentDir, 'text')).filter(f => f.endsWith('.md'));

const magazineArticles = textFiles.map(file => {
  const filePath = path.join(contentDir, 'text', file);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  const baseName = file.replace('.md', '');

  let category = 'Article';
  let title = '';
  let author = '';
  let quote = '';
  let image = '';
  let subtitle = '';

  const lines = rawContent.split(/\r?\n/).map(l => l.trim());

  // Extract first header as title
  const titleLine = lines.find(l => l.startsWith('# '));
  if (titleLine) {
    title = titleLine.replace(/^#\s+/, '').trim();
  }

  // Detect category & image mapping
  if (baseName === 'editorial_faruk') {
    category = 'Editorial';
    author = 'Faruk Abdulkadir Waziri (Editor-in-Chief)';
    image = '/images/text/faruk_abdulkadir_waziri.jpg';
  } else if (baseName === 'dean_speach') {
    category = "Dean's Address";
    author = "Prof. Ya'u S. Haruna (Dean, Faculty of Engineering & Engineering Technology)";
    image = '/images/text/dean_speach.jpg';
  } else if (baseName === 'hod_speach') {
    category = "HOD's Address";
    author = 'Prof. A. L. Amoo (Head of Department)';
    image = '/images/text/hod_speach.jpg';
  } else if (baseName === 'best_graduating_student_abduliadi') {
    category = 'Valedictory Spotlight';
    author = 'Abduliadi Abdulbaki (Best Graduating Student)';
    image = '/images/text/abduliadi_abdulbaki.jpg';
  } else if (baseName === 'award_message_olabisi') {
    category = 'Award Message';
    author = 'Faruk Olabisi (Entrepreneur of the Year)';
    image = '/images/text/olabisi_faruk.jpg';
  } else if (baseName === 'goodwill_message_saliu') {
    category = 'Goodwill Message';
    author = 'Saliu Abdulgafar (Provost Marshal)';
    image = '/images/text/saliu_abdulgafar.jpg';
  } else if (baseName.startsWith('article_')) {
    category = 'Technical Paper';
    const authorLine = lines.find(l => l.includes('**Author:**'));
    if (authorLine) {
      author = authorLine.replace('**Author:**', '').trim();
    }
    const imgName = baseName.replace('article_', '');
    // Match with text images
    if (imgName === 'afolabi') image = '/images/text/afolabi_wasiu_opeyemi.jpg';
    else if (imgName === 'hussaini') image = '/images/text/hussaini_adamu_hardawa.jpg';
    else if (imgName === 'sarkes') image = '/images/text/sarkes_lawehmat_silas.jpg';
    else if (imgName === 'umar') image = '/images/text/umar_ibrahim_anchau.jpg';
  } else if (baseName.startsWith('interview_')) {
    category = 'Faculty Interview';
    const imgName = `${baseName}.jpg`;
    image = `/images/text/${imgName}`;
  } else if (baseName.startsWith('project_')) {
    category = 'Capstone Project';
    const imgName = `${baseName}.jpg`;
    image = `/images/text/${imgName}`;
  }

  // Extract pull quote if present (> "...")
  const quoteLines = lines.filter(l => l.startsWith('>'));
  if (quoteLines.length > 0) {
    quote = quoteLines.map(l => l.replace(/^>\s*/, '')).join(' ').replace(/“|”/g, '"').trim();
  }

  // Calculate read time
  const wordCount = rawContent.split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  return {
    id: baseName,
    file,
    category,
    title,
    subtitle,
    author,
    quote,
    image,
    wordCount,
    readingTime,
    rawContent
  };
});

// Sort in magazine sequence: Cover/Editorial -> Speeches -> Articles -> Interviews -> Projects -> Awards
const categoryOrder = {
  'Editorial': 1,
  "Dean's Address": 2,
  "HOD's Address": 3,
  'Valedictory Spotlight': 4,
  'Technical Paper': 5,
  'Faculty Interview': 6,
  'Capstone Project': 7,
  'Goodwill Message': 8,
  'Award Message': 9
};

magazineArticles.sort((a, b) => {
  const orderA = categoryOrder[a.category] || 99;
  const orderB = categoryOrder[b.category] || 99;
  return orderA - orderB;
});

fs.writeFileSync(path.join(srcDataDir, 'magazineContent.json'), JSON.stringify(magazineArticles, null, 2));

console.log(`Successfully compiled:
- ${graduands.length} Graduands
- ${records.people.length} Committee People
- ${departmentData.staff.academic.length + departmentData.staff.technical.length + departmentData.staff.hod_office.length} Staff members
- ${magazineArticles.length} Magazine Sections/Articles`);
