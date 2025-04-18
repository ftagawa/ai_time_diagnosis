document.addEventListener('DOMContentLoaded', function () {
    // DOM要素の取得
    const questionnaireSection = document.getElementById('questionnaireSection');
    const resultSection = document.getElementById('resultSection');
    const prevBtn = document.getElementById('prevBtn');
    const progressIndicator = document.getElementById('progressIndicator');
    const questionNumber = document.getElementById('questionNumber');
    const restartBtn = document.getElementById('restartBtn');
    const departmentOptions = document.getElementById('departmentOptions');

    // 回答を格納する変数
    let answers = {
        industry: '',
        department: '',
        tools: '',
        documents: '',
        tasks: ''
    };

    // 現在の質問インデックス
    let currentQuestionIndex = 0;

    // 全質問のスライド要素を取得
    const questionSlides = document.querySelectorAll('.question-slide');
    const totalQuestions = questionSlides.length;

    // 質問表示の更新
    function updateQuestionDisplay() {
        // すべてのスライドを非表示にする
        questionSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 現在の質問を表示する
        questionSlides[currentQuestionIndex].classList.add('active');

        // 進捗状況の更新
        progressIndicator.style.width = `${(currentQuestionIndex + 1) / totalQuestions * 100}%`;
        questionNumber.textContent = `質問 ${currentQuestionIndex + 1}/${totalQuestions}`;

        // ボタンの状態更新 - Restore prevBtn logic
        prevBtn.disabled = currentQuestionIndex === 0;

        // 現在表示されている質問の全オプションにイベントリスナーを追加
        const currentOptions = questionSlides[currentQuestionIndex].querySelectorAll('.option');
        currentOptions.forEach(option => {
            // 既存のイベントリスナーを削除して重複を防ぐ
            option.removeEventListener('click', handleOptionClick);
            // 新しくイベントリスナーを追加
            option.addEventListener('click', handleOptionClick);
        });
    }

    // オプション選択のイベントハンドラ
    function handleOptionClick(e) {
        const clickedOption = e.currentTarget;
        const allOptions = clickedOption.parentElement.querySelectorAll('.option');

        allOptions.forEach(option => {
            option.classList.remove('selected');
        });

        clickedOption.classList.add('selected');

        // 回答を保存
        const questionId = questionSlides[currentQuestionIndex].id;
        const selectedValue = clickedOption.dataset.value;

        switch (questionId) {
            case 'q1':
                answers.industry = selectedValue;
                // 次の質問の部門選択肢を更新
                updateDepartmentOptions();
                break;
            case 'q2':
                answers.department = selectedValue;
                break;
            case 'q3':
                answers.tools = selectedValue;
                break;
            case 'q4':
                answers.documents = selectedValue;
                break;
            case 'q5':
                answers.tasks = selectedValue;
                break;
        }

        // --- Automatic Navigation Logic --- 
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            updateQuestionDisplay();
        } else {
            // 最後の質問の場合は結果を表示
            showResults();
        }
        // --- End Automatic Navigation Logic ---
    }

    // 部門選択肢の動的更新
    function updateDepartmentOptions() {
        departmentOptions.innerHTML = '';

        let departmentChoices;

        switch (answers.industry) {
            case 'office':
                departmentChoices = [
                    { value: 'hr', icon: '👥', text: '総務・人事' },
                    { value: 'finance', icon: '💰', text: '経理・財務' },
                    { value: 'planning', icon: '📈', text: '企画・マーケティング' },
                    { value: 'it', icon: '💻', text: 'IT・システム管理' }
                ];
                break;
            case 'sales':
                departmentChoices = [
                    { value: 'sales', icon: '🤝', text: '営業・販売' },
                    { value: 'support', icon: '🎧', text: 'カスタマーサポート' },
                    { value: 'marketing', icon: '📣', text: 'マーケティング・広報' },
                    { value: 'service', icon: '🏪', text: '店舗・サービス管理' }
                ];
                break;
            case 'medical':
                departmentChoices = [
                    { value: 'doctor', icon: '⚕️', text: '医師・看護師' },
                    { value: 'caregiver', icon: '🤲', text: '介護士・ケアスタッフ' },
                    { value: 'admin', icon: '📋', text: '事務・管理部門' },
                    { value: 'counselor', icon: '🗣️', text: '相談員・支援員' }
                ];
                break;
            case 'manufacturing':
                departmentChoices = [
                    { value: 'production', icon: '🏭', text: '製造・生産管理' },
                    { value: 'research', icon: '🔬', text: '研究開発・設計' },
                    { value: 'quality', icon: '✅', text: '品質管理・検査' },
                    { value: 'tech_support', icon: '🛠️', text: '技術サポート' }
                ];
                break;
            default:
                departmentChoices = [];
        }

        departmentChoices.forEach(choice => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.dataset.value = choice.value;

            const iconDiv = document.createElement('div');
            iconDiv.className = 'option-icon';
            iconDiv.textContent = choice.icon;

            const textDiv = document.createElement('div');
            textDiv.className = 'option-text';
            textDiv.textContent = choice.text;

            optionDiv.appendChild(iconDiv);
            optionDiv.appendChild(textDiv);
            departmentOptions.appendChild(optionDiv);
        });
    }

    // 結果を表示する関数
    function showResults() {
        // 診断セクションを非表示に、結果セクションを表示に
        questionnaireSection.classList.remove('active');
        resultSection.classList.add('active');

        // 職種に基づいた活用事例を取得
        const industryKey = answers.industry;
        const departmentKey = answers.department;

        // 職種に該当する活用事例を取得
        const relevantUseCases = useCasesData.filter(useCase => {
            // 職種の配列に該当部門が含まれているか確認
            return useCase.applicableDepartments.some(dept =>
                (dept.industry === industryKey && dept.department === departmentKey) ||
                (dept.industry === industryKey && dept.department === 'all') ||
                (dept.industry === 'all' && dept.department === departmentKey) ||
                (dept.industry === 'all' && dept.department === 'all')
            );
        });

        // 時間短縮量でソート
        relevantUseCases.sort((a, b) => b.timeSaved - a.timeSaved);

        // 総時間短縮量を計算
        const totalTimeSaved = relevantUseCases.reduce((sum, useCase) => sum + useCase.timeSaved, 0);
        document.getElementById('totalTimeSaved').textContent = totalTimeSaved.toFixed(1);

        // 活用事例リストを生成
        const useCasesList = document.getElementById('useCasesList');
        useCasesList.innerHTML = '';

        relevantUseCases.forEach(useCase => {
            const useCaseItem = document.createElement('div');
            useCaseItem.className = 'use-case-item';

            const description = document.createElement('div');
            description.className = 'use-case-description';
            description.textContent = useCase.description;

            const timeSaved = document.createElement('div');
            timeSaved.className = 'time-saved';
            timeSaved.textContent = `月${useCase.timeSaved}時間`;

            useCaseItem.appendChild(description);
            useCaseItem.appendChild(timeSaved);
            useCasesList.appendChild(useCaseItem);
        });

        // グラフを生成（上位5件）
        createChart(relevantUseCases.slice(0, 5));
    }

    // グラフを生成する関数
    function createChart(useCases) {
        const ctx = document.getElementById('timeChart').getContext('2d');

        // 既存のチャートを破棄
        if (window.myChart) {
            window.myChart.destroy();
        }

        // データの準備
        const labels = useCases.map(useCase => useCase.description);
        const data = useCases.map(useCase => useCase.timeSaved);

        // チャートの作成
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '月間短縮時間（時間）',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '月間短縮時間（時間）'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // 「もう一度診断する」ボタンのイベントリスナー
    restartBtn.addEventListener('click', function () {
        // 全ての選択をリセット
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });

        // 回答をリセット
        answers = {
            industry: '',
            department: '',
            tools: '',
            documents: '',
            tasks: ''
        };

        // 最初の質問に戻る
        currentQuestionIndex = 0;
        updateQuestionDisplay();

        // 結果画面から質問画面に切り替え
        resultSection.classList.remove('active');
        questionnaireSection.classList.add('active');
    });

    // 「前へ」ボタンのイベントリスナー - Restored listener
    prevBtn.addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            updateQuestionDisplay();
        }
    });

    // 初期表示
    updateQuestionDisplay();
});