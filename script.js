document.addEventListener('DOMContentLoaded', function () {
    // DOM要素の取得
    const questionnaireSection = document.getElementById('questionnaireSection');
    const resultSection = document.getElementById('resultSection');
    const prevBtn = document.getElementById('prevBtn');
    const progressIndicator = document.getElementById('progressIndicator');
    const questionNumber = document.getElementById('questionNumber');
    const restartBtn = document.getElementById('restartBtn');
    const q2OptionsContainer = document.getElementById('q2Options'); // Q2の選択肢コンテナ
    const shareOnXBtn = document.getElementById('shareOnXBtn');

    // 回答を格納する変数
    let answers = {
        q1: '', // 職種分類
        q2: '', // 業務分類
        q3: '', // 業務特徴
        q4: '', // 効率化ニーズ
        q5: ''  // PC使用時間
    };

    let currentQuestionIndex = 0;
    const questionSlides = document.querySelectorAll('.question-slide');
    const totalQuestions = questionSlides.length;

    // Q2の選択肢データ
    const q2ChoicesData = {
        corporate: [ // Q1: コーポレート・バックオフィス系
            { value: 'office_assistant', icon: '📋', text: 'A. 事務・アシスタント業務（一般事務, 営業事務, 秘書）' },
            { value: 'admin_dept', icon: '⚖️', text: 'B. 管理部門（総務, 人事, 経理, 財務, 法務, 広報）' },
            { value: 'management_planning', icon: '📊', text: 'C. 経営企画・管理職' },
            { value: 'corporate_other', icon: '📎', text: 'D. その他（例：バックオフィス系の特殊業務）' }
        ],
        tech_rd: [ // Q1: 専門技術・研究開発系
            { value: 'it_engineer', icon: '💻', text: 'A. ITエンジニア・技術職（システムエンジニア, プログラマー）' },
            { value: 'data_research', icon: '📈', text: 'B. データ分析・リサーチ系（データサイエンティスト, リサーチャー）' },
            { value: 'researcher', icon: '🔬', text: 'C. 研究職（研究者）' },
            { value: 'tech_other', icon: '⚙️', text: 'D. その他（例：エンジニア系の特殊業務）' }
        ],
        human_service: [ // Q1: ヒューマンサービス・専門職系
            { value: 'education_childcare', icon: '🧑‍🏫', text: 'A. 教育・保育職（教員, 保育士）' },
            { value: 'medical_professional', icon: '⚕️', text: 'B. 医療職（医師, 看護師, 薬剤師, 理学療法士）' },
            { value: 'care_professional', icon: '🤲', text: 'C. 介護専門職系（訪問介護員, 介護福祉士）' },
            { value: 'human_other', icon: '🤝', text: 'D. その他（例：ケア系の特殊業務）' }
        ],
        business_customer: [ // Q1: ビジネス推進・顧客対応系
            { value: 'sales', icon: '💼', text: 'A. 営業（法人営業, 個人営業）' },
            { value: 'customer_support', icon: '🎧', text: 'B. カスタマーサポート・オペレーター' },
            { value: 'hospitality_retail', icon: '🛍️', text: 'C. 接客・販売・サービス系（飲食店スタッフ, ホテルスタッフ, 販売スタッフ）' },
            { value: 'web_marketing_planning', icon: '🌐', text: 'D. Web・マーケティング・企画職' }
        ]
    };

    // 質問表示の更新
    function updateQuestionDisplay() {
        questionSlides.forEach(slide => slide.classList.remove('active'));
        questionSlides[currentQuestionIndex].classList.add('active');

        progressIndicator.style.width = `${(currentQuestionIndex + 1) / totalQuestions * 100}%`;
        questionNumber.textContent = `質問 ${currentQuestionIndex + 1}/${totalQuestions}`;
        prevBtn.disabled = currentQuestionIndex === 0;

        // 現在の質問のオプションにイベントリスナーを（再）設定
        const currentOptions = questionSlides[currentQuestionIndex].querySelectorAll('.option');
        currentOptions.forEach(option => {
            option.removeEventListener('click', handleOptionClick); // 念のため削除
            option.addEventListener('click', handleOptionClick);
        });
    }

    // Q2の選択肢を動的に生成・更新
    function updateQ2Options() {
        q2OptionsContainer.innerHTML = ''; // 既存の選択肢をクリア
        const selectedQ1Value = answers.q1;

        if (q2ChoicesData[selectedQ1Value]) {
            q2ChoicesData[selectedQ1Value].forEach(choice => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.dataset.value = choice.value;

                const iconDiv = document.createElement('div');
                iconDiv.className = 'option-icon';
                iconDiv.textContent = choice.icon;

                const textDiv = document.createElement('div');
                textDiv.className = 'option-text';
                textDiv.innerHTML = choice.text; // HTMLタグを含む場合があるのでinnerHTML

                optionDiv.appendChild(iconDiv);
                optionDiv.appendChild(textDiv);
                q2OptionsContainer.appendChild(optionDiv);
            });
        }
        // Q2の新しいオプションにもイベントリスナーを設定する必要があるため、updateQuestionDisplayを呼ぶ
        // ただし、Q2のオプション生成後に呼び出すように調整が必要
    }

    // オプション選択のイベントハンドラ
    function handleOptionClick(e) {
        const clickedOption = e.currentTarget;
        const questionId = questionSlides[currentQuestionIndex].id; // q1, q2, q3...
        const selectedValue = clickedOption.dataset.value;

        // 選択状態の更新
        const allOptionsInSlide = clickedOption.parentElement.querySelectorAll('.option');
        allOptionsInSlide.forEach(opt => opt.classList.remove('selected'));
        clickedOption.classList.add('selected');

        // 回答を保存
        answers[questionId] = selectedValue;

        if (questionId === 'q1') {
            updateQ2Options(); // Q1の回答に基づいてQ2の選択肢を更新
        }

        // 次の質問へ進むか結果表示
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            updateQuestionDisplay();
        } else {
            showResults();
        }
    }

    // メインクラスタを判定する関数
    function determineMainCluster(q1, q2) {
        // T（Text/Office）、D（Data/Dev）、H（Health/Edu）、S（Service/Field）
        if (q1 === 'corporate') { // コーポレート・バックオフィス系
            // 2-1, 2-2, 2-3 はT
            if (['office_assistant', 'admin_dept', 'management_planning'].includes(q2)) return 'T';
            return 'T'; // その他もTと仮定
        }
        if (q1 === 'tech_rd') { // 専門技術・研究開発系
            // 2-1, 2-2, 2-3 はD
            if (['it_engineer', 'data_research', 'researcher'].includes(q2)) return 'D';
            return 'D'; // その他もDと仮定
        }
        if (q1 === 'human_service') { // ヒューマンサービス・専門職系
            // 2-1, 2-2, 2-3 はH
            if (['education_childcare', 'medical_professional', 'care_professional'].includes(q2)) return 'H';
            return 'H'; // その他もHと仮定
        }
        if (q1 === 'business_customer') { // ビジネス推進・顧客対応系
            if (q2 === 'sales' || q2 === 'web_marketing_planning') return 'T'; // 営業、WebマーケはT
            if (q2 === 'customer_support') return 'T'; // カスタマーサポートもT (または状況によりD)
            if (q2 === 'hospitality_retail') return 'S'; // 接客・販売はS
            return 'S'; // その他はSと仮定
        }
        return 'Unknown'; // どれにも当てはまらない場合
    }

    // 結果を表示する関数
    function showResults() {
        questionnaireSection.classList.remove('active');
        resultSection.classList.add('active');

        console.log("User Raw Answers:", JSON.parse(JSON.stringify(answers)));

        const mainCluster = determineMainCluster(answers.q1, answers.q2);

        let totalTimeSaved = 0;
        const useCasesList = document.getElementById('useCasesList');
        useCasesList.innerHTML = '';

        // --- メインクラスタに合致する活用事例を取得 (サブクラスタ条件は問わない) ---
        const mainClusterOnlyUseCases = useCasesData.filter(useCase => {
            if (!mainCluster || mainCluster === "Unknown") return false; // mainClusterが不正ならフィルタしない
            return useCase.applicableMainClusters.includes(mainCluster) || useCase.applicableMainClusters.includes("ALL");
        }).sort((a, b) => b.timeSaved - a.timeSaved);

        if (mainClusterOnlyUseCases.length === 0 && mainCluster && mainCluster !== "Unknown") {
            // data.js の中身を少し表示して、mainCluster と比較する
            const sampleDataForMainCluster = useCasesData.filter(uc => uc.description.toLowerCase().includes(mainCluster.toLowerCase().substring(0, 1))); //簡易検索
        }

        // --- サブクラスタ事例の選定 (メインクラスタ一致が前提) ---
        // (メインクラスタ + Q3一致) OR (メインクラスタ + Q4一致) OR (メインクラスタ + Q5一致)
        let subClusterCandidateCases = [];
        if (mainCluster && mainCluster !== "Unknown") { // 有効なメインクラスタがある場合のみサブクラスタを検索
            useCasesData.forEach(useCase => {
                // 0. メインクラスタに合致が前提
                const isMainClusterMatch = useCase.applicableMainClusters.includes(mainCluster) || useCase.applicableMainClusters.includes("ALL");
                if (!isMainClusterMatch) return; // メインに合致しなければスキップ

                // サブクラスタ定義があるか
                if (!useCase.subClusters) return;

                // 1. (メイン + Q3一致)
                const q3Match = useCase.subClusters.q3 && (useCase.subClusters.q3.includes(answers.q3) || useCase.subClusters.q3.includes("ALL"));
                // 2. (メイン + Q4一致)
                const q4Match = useCase.subClusters.q4 && (useCase.subClusters.q4.includes(answers.q4) || useCase.subClusters.q4.includes("ALL"));
                // 3. (メイン + Q5一致)
                const q5Match = useCase.subClusters.q5 && (useCase.subClusters.q5.includes(answers.q5) || useCase.subClusters.q5.includes("ALL"));

                if (q3Match || q4Match || q5Match) { // いずれかのサブ条件に合致 (かつメインにも合致)
                    subClusterCandidateCases.push(useCase);
                }
            });
        }

        // サブクラスタ候補から重複を除去しソート
        const uniqueSubClusterUseCases = Array.from(new Set(subClusterCandidateCases.map(uc => uc.id)))
            .map(id => subClusterCandidateCases.find(uc => uc.id === id))
            .sort((a, b) => b.timeSaved - a.timeSaved);

        // --- 表示する事例の選定と合計時間の計算 ---
        const mainCasesToShow = mainClusterOnlyUseCases.slice(0, 5);
        const subCasesToShow = uniqueSubClusterUseCases.filter(
            subCase => !mainCasesToShow.find(mainCase => mainCase.id === subCase.id) // メイン表示と重複しない
        ).slice(0, 3);

        let displayedUseCases = [];

        if (mainCasesToShow.length > 0) {
            const heading = document.createElement('h4');
            heading.textContent = `あなたの業種におすすめの活用事例 (上位${mainCasesToShow.length}件)`;
            useCasesList.appendChild(heading);
            mainCasesToShow.forEach(useCase => {
                if (!displayedUseCases.find(uc => uc.id === useCase.id)) {
                    const useCaseItem = createUseCaseElement(useCase);
                    useCasesList.appendChild(useCaseItem);
                    totalTimeSaved += useCase.timeSaved;
                    displayedUseCases.push(useCase);
                }
            });
        }

        if (subCasesToShow.length > 0) {
            const heading = document.createElement('h4');
            heading.textContent = `あなたの業務スタイル・ニーズに合う活用事例 (上位${subCasesToShow.length}件)`;
            useCasesList.appendChild(heading);
            subCasesToShow.forEach(useCase => {
                if (!displayedUseCases.find(uc => uc.id === useCase.id)) {
                    const useCaseItem = createUseCaseElement(useCase);
                    useCasesList.appendChild(useCaseItem);
                    totalTimeSaved += useCase.timeSaved;
                    displayedUseCases.push(useCase);
                }
            });
        }

        if (displayedUseCases.length === 0) {
            useCasesList.innerHTML = '<p>あなたにぴったりの具体的な活用事例は見つかりませんでした。一般的なAI活用をお試しください。</p>';
        }

        document.getElementById('totalTimeSaved').textContent = totalTimeSaved.toFixed(1);
    }

    // 活用事例のHTML要素を生成するヘルパー関数
    function createUseCaseElement(useCase, type) {
        const useCaseItem = document.createElement('div');
        useCaseItem.className = 'use-case-item';
        // typeに応じてタグ付けしても良い（例：<span class="tag">${type}</span>）
        useCaseItem.innerHTML = `
            <div class="use-case-description">${useCase.description}</div>
            <div class="time-saved">月${useCase.timeSaved.toFixed(1)}時間</div>
        `;
        return useCaseItem;
    }

    // Xシェアボタンのイベントリスナー
    if (shareOnXBtn) {
        shareOnXBtn.addEventListener('click', function () {
            const timeSavedText = document.getElementById('totalTimeSaved').textContent;
            const mainClusterText = document.getElementById('mainClusterResult').textContent;
            const tweetText = `生成AI活用診断の結果、私は【${mainClusterText}クラスタ】で月${timeSavedText}時間の業務短縮が期待できるみたい！🙌\n皆さんも試してみませんか？\n\n#生成AI業務効率化 #AI活用診断\n`;
            const toolUrl = window.location.href;
            const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(toolUrl)}`;
            window.open(twitterIntentUrl, '_blank', 'width=600,height=400');
        });
    }

    // 「もう一度診断する」ボタン
    restartBtn.addEventListener('click', function () {
        answers = { q1: '', q2: '', q3: '', q4: '', q5: '' };
        currentQuestionIndex = 0;
        q2OptionsContainer.innerHTML = ''; // Q2の選択肢をクリア
        document.querySelectorAll('.option.selected').forEach(opt => opt.classList.remove('selected'));
        updateQuestionDisplay();
        resultSection.classList.remove('active');
        questionnaireSection.classList.add('active');
        // if (window.myChart instanceof Chart) { window.myChart.destroy(); } // グラフ使用時
    });

    // 「前へ」ボタン
    prevBtn.addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            // Q2に戻る場合、選択肢は保持されているが、再描画は必要
            updateQuestionDisplay();
        }
    });

    // 初期表示
    updateQuestionDisplay();
});