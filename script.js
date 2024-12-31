
function calculateScore() {
    let scores = [];
    let categories = document.querySelectorAll('.appraisal-category');

    categories.forEach(category => {
        let select = category.querySelector('select');
        scores.push(parseInt(select.value));
    });

    let totalScore = scores.reduce((sum, score) => sum + score, 0);
    let maxPossibleScore = scores.length * 5; // Calculate the maximum possible score
    let percentageScore = (totalScore / maxPossibleScore) * 100;

    let resultsDiv = document.getElementById('results');
    resultsDiv.textContent = `Your school's appraisal score is: ${percentageScore.toFixed(2)}%`;

    let interpretation = "";

    if (percentageScore <= 40) {
        interpretation = "Areas for significant improvement. Below Expectations";
    } else if (percentageScore <= 60) {
        interpretation = "Developing in key areas.Approaching Expectations";
    } else if (percentageScore <= 80) {
        interpretation = "Strong performance in most areas.Meeting Expectations";
    } else {
        interpretation = "Exemplary performance across key trends.Exceeding Expectations";
    }

    resultsDiv.textContent += ` (${interpretation})`;
}
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
function calculateScore() {
    const categories = [
        'personalized-learning',
        'technology-integration',
        'focus-on-skills',
        'lifelong-learning',
        'equity-inclusion'
    ];

    let totalScore = 0;
    const results = {};

    categories.forEach(category => {
        const value = parseInt(document.getElementById(category).value);
        totalScore += value;
        results[category] = value;
    });

    const averageScore = totalScore / categories.length;
    displayResults(results, averageScore);
}

function displayResults(results, averageScore) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    const strengthsWeaknesses = analyzeResults(results);

    resultsDiv.innerHTML = `
        <h3>Assessment Results</h3>
        <p><strong>Overall Score:</strong> ${averageScore.toFixed(1)} out of 5</p>
        <div class="results-details">
            <h4>Areas of Strength:</h4>
            <ul>
                ${strengthsWeaknesses.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
            <h4>Areas for Improvement:</h4>
            <ul>
                ${strengthsWeaknesses.weaknesses.map(w => `<li>${w}</li>`).join('')}
            </ul>
        </div>
    `;
}

function analyzeResults(results) {
    const strengths = [];
    const weaknesses = [];
    const categoryNames = {
        'personalized-learning': 'Personalized Learning',
        'technology-integration': 'Technology Integration',
        'focus-on-skills': 'Essential Skills Focus',
        'lifelong-learning': 'Lifelong Learning',
        'equity-inclusion': 'Equity and Inclusion'
    };

    for (const [category, score] of Object.entries(results)) {
        if (score >= 4) {
            strengths.push(`${categoryNames[category]} (Score: ${score}/5)`);
        } else if (score <= 2) {
            weaknesses.push(`${categoryNames[category]} (Score: ${score}/5)`);
        }
    }

    return { strengths, weaknesses };
}