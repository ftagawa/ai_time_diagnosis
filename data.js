// 活用事例データ
const useCasesData = [
    {
        description: "議事録作成支援",
        timeSaved: 2.0,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "メール・チャットの返信作成",
        timeSaved: 1.7,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "資料作成(PowerPoint/Excel)",
        timeSaved: 2,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "リサーチ・分析作業の支援",
        timeSaved: 2.0,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "文章要約作成",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "文字起こし（音声／画像）",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "ブレスト（思考整理）",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "メール返信の下書き作成",
        timeSaved: 3.3,
        applicableDepartments: [
            { industry: 'sales', department: 'sales' },
            { industry: 'sales', department: 'support' },
            { industry: 'office', department: 'hr' },
            { industry: 'office', department: 'finance' }
        ]
    },
    {
        description: "FAQ・マニュアル作成",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'office', department: 'hr' },
            { industry: 'office', department: 'it' },
            { industry: 'sales', department: 'support' }
        ]
    },
    {
        description: "企画アイデアのたたき台",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'office', department: 'planning' },
            { industry: 'sales', department: 'marketing' },
            { industry: 'sales', department: 'sales' }
        ]
    },
    {
        description: "業務の手順書作成支援",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'office', department: 'finance' },
            { industry: 'manufacturing', department: 'production' },
            { industry: 'manufacturing', department: 'quality' }
        ]
    },
    {
        description: "SNS投稿文のドラフト",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'sales', department: 'marketing' },
            { industry: 'office', department: 'planning' },
            { industry: 'office', department: 'hr' }
        ]
    },
    {
        description: "社内報・ニュースの作成",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'office', department: 'hr' },
            { industry: 'sales', department: 'marketing' }
        ]
    },
    {
        description: "報告資料の要点整理",
        timeSaved: 1.3,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "書類のフォーマット化支援",
        timeSaved: 0.7,
        applicableDepartments: [
            { industry: 'office', department: 'hr' },
            { industry: 'office', department: 'finance' }
        ]
    },
    {
        description: "クレーム対応の文案作成",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'sales', department: 'sales' },
            { industry: 'sales', department: 'support' }
        ]
    },
    {
        description: "イベントレポート作成",
        timeSaved: 0.8,
        applicableDepartments: [
            { industry: 'sales', department: 'marketing' },
            { industry: 'sales', department: 'sales' },
            { industry: 'office', department: 'hr' }
        ]
    },
    {
        description: "介護記録の要点整理",
        timeSaved: 3.3,
        applicableDepartments: [
            { industry: 'medical', department: 'caregiver' }
        ]
    },
    {
        description: "カルテ・看護記録の下書き支援",
        timeSaved: 2.0,
        applicableDepartments: [
            { industry: 'medical', department: 'doctor' }
        ]
    },
    {
        description: "シフト連絡・調整文の作成",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'sales', department: 'service' },
            { industry: 'medical', department: 'admin' },
            { industry: 'medical', department: 'caregiver' }
        ]
    },
    {
        description: "利用者向けお知らせ文の作成",
        timeSaved: 0.7,
        applicableDepartments: [
            { industry: 'medical', department: 'admin' },
            { industry: 'medical', department: 'caregiver' }
        ]
    },
    {
        description: "説明資料の読み上げ要約",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'medical', department: 'all' },
            { industry: 'office', department: 'all' }
        ]
    },
    {
        description: "保護者・家族への説明補助文",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'medical', department: 'doctor' },
            { industry: 'medical', department: 'caregiver' },
            { industry: 'medical', department: 'counselor' }
        ]
    },
    {
        description: "備品発注リストの整理",
        timeSaved: 0.7,
        applicableDepartments: [
            { industry: 'medical', department: 'admin' },
            { industry: 'sales', department: 'service' }
        ]
    },
    {
        description: "接客対応マニュアルの作成支援",
        timeSaved: 0.5,
        applicableDepartments: [
            { industry: 'sales', department: 'service' },
            { industry: 'sales', department: 'sales' }
        ]
    },
    {
        description: "手書きメモの清書",
        timeSaved: 1.0,
        applicableDepartments: [
            { industry: 'medical', department: 'all' },
            { industry: 'manufacturing', department: 'production' }
        ]
    },
    {
        description: "簡単な健康指導案の作成",
        timeSaved: 0.7,
        applicableDepartments: [
            { industry: 'medical', department: 'doctor' },
            { industry: 'medical', department: 'caregiver' },
            { industry: 'medical', department: 'counselor' }
        ]
    },
    {
        description: "文章の作成",
        timeSaved: 10.0,
        applicableDepartments: [
            { industry: 'sales', department: 'sales' },
            { industry: 'sales', department: 'marketing' },
            { industry: 'office', department: 'planning' },
            { industry: 'office', department: 'hr' }
        ]
    },
    {
        description: "文章の校正・添削",
        timeSaved: 5.0,
        applicableDepartments: [
            { industry: 'sales', department: 'marketing' },
            { industry: 'office', department: 'planning' }
        ]
    },
    {
        description: "記事の執筆",
        timeSaved: 5.0,
        applicableDepartments: [
            { industry: 'sales', department: 'marketing' },
            { industry: 'office', department: 'planning' },
            { industry: 'office', department: 'hr' }
        ]
    },
    {
        description: "語彙の保管とアイデア出し",
        timeSaved: 3.8,
        applicableDepartments: [
            { industry: 'sales', department: 'marketing' },
            { industry: 'sales', department: 'sales' }
        ]
    },
    {
        description: "業務リストの作成",
        timeSaved: 5.0,
        applicableDepartments: [
            { industry: 'sales', department: 'sales' },
            { industry: 'office', department: 'all' },
            { industry: 'manufacturing', department: 'all' }
        ]
    },
    {
        description: "仕事での質問に素早く回答",
        timeSaved: 3.3,
        applicableDepartments: [
            { industry: 'office', department: 'it' },
            { industry: 'office', department: 'hr' },
            { industry: 'office', department: 'finance' }
        ]
    },
    {
        description: "図の作成支援",
        timeSaved: 2.7,
        applicableDepartments: [
            { industry: 'office', department: 'planning' },
            { industry: 'sales', department: 'marketing' },
            { industry: 'manufacturing', department: 'research' }
        ]
    },
    {
        description: "プログラミングのアシスト",
        timeSaved: 4.0,
        applicableDepartments: [
            { industry: 'office', department: 'it' },
            { industry: 'manufacturing', department: 'research' },
            { industry: 'manufacturing', department: 'tech_support' }
        ]
    },
    {
        description: "業務プロセス自動生成",
        timeSaved: 3.0,
        applicableDepartments: [
            { industry: 'office', department: 'it' },
            { industry: 'office', department: 'planning' }
        ]
    },
    {
        description: "ナレッジマネジメント強化",
        timeSaved: 2.0,
        applicableDepartments: [
            { industry: 'office', department: 'planning' },
            { industry: 'office', department: 'it' }
        ]
    },
    {
        description: "自律的な問題対応",
        timeSaved: 2.0,
        applicableDepartments: [
            { industry: 'office', department: 'it' },
            { industry: 'sales', department: 'support' }
        ]
    },
    {
        description: "Excel作業の効率化",
        timeSaved: 5.0,
        applicableDepartments: [
            { industry: 'office', department: 'finance' },
            { industry: 'office', department: 'hr' },
            { industry: 'office', department: 'planning' }
        ]
    },
    {
        description: "翻訳作業",
        timeSaved: 2.5,
        applicableDepartments: [
            { industry: 'office', department: 'all' },
            { industry: 'manufacturing', department: 'research' }
        ]
    },
    {
        description: "会議資料のデータ分析",
        timeSaved: 2.7,
        applicableDepartments: [
            { industry: 'office', department: 'planning' },
            { industry: 'office', department: 'finance' },
            { industry: 'sales', department: 'marketing' }
        ]
    },
    {
        description: "メールの文章をフォーマルに調整",
        timeSaved: 5.0,
        applicableDepartments: [
            { industry: 'sales', department: 'sales' },
            { industry: 'office', department: 'hr' },
            { industry: 'office', department: 'finance' }
        ]
    },
    {
        description: "上司とのコミュニケーション改善",
        timeSaved: 1.7,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    },
    {
        description: "部下とのコミュニケーション改善",
        timeSaved: 1.7,
        applicableDepartments: [
            { industry: 'all', department: 'all' }
        ]
    }
];