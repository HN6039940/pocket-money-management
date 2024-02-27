# サイトURL
URL:[pocket-money-management](https://app.netlify.com/sites/pocket-money-management/overview)

## サービス概要

このアプリは、主に日頃のお小遣いや些細な収入や支出のデータを入力し、
集計を行いどのくらい利用しているのかをグラフを通して可視化をできるようにしたものです。
主に今月分や過去7日間分、今年度の月別分などのデータにフォーカスしているため直近の収支の比較に便利です。
開発背景は、限られたお金を月単位、日単位の細かいやり取りをすることが多かったので
上記に書いてある通り、ピンポイントでのデータ収集を行う所に特化したいと思い開発しました。

![topPage](https://github.com/HN6039940/pocket-money-management/assets/60053407/63ff4fbd-afcc-4b70-9da3-8b405fc2991c)
![DashBoard](https://github.com/HN6039940/pocket-money-management/assets/60053407/a8d12fb0-da6f-4256-994a-84946078d2a1)

## 機能

- ダッシュボード

- 入力画面

- フィールドテーブル

- ログイン機能

### ダッシュボード

入力した収支がグラフとして反映されます。

月の収支比較
月の予算と支出比較

支出ごとに設定できるタグ・ラベルがどれほどの数使っているか

今日の日付を基準に7日間別の収支の比較

のグラフが表示されます。


### 入力画面

データを入力する画面です。
収入と支出の金額、日付、支出は種類というフォームで独自の物を具体的に設定できます。
（例えば、生活費など）

![form](https://github.com/HN6039940/pocket-money-management/assets/60053407/1e220be4-96a9-47be-893e-098b80d6ae38)
### テーブル

今まで入力したデータを収支別でみることができます。
また、削除機能でデータの削除が行えます。

![Table](https://github.com/HN6039940/pocket-money-management/assets/60053407/85ea7ddb-83db-44c5-a7f0-4932de70aba5)
### ログイン機能

Googleまたはメールアドレスを利用して新規登録、ログインができます。
データを永続的に保持する為にログインは必須です。

![LoginPage](https://github.com/HN6039940/pocket-money-management/assets/60053407/43406559-cbde-486f-8fe0-4cca2b63edbd)
![SignOut](https://github.com/HN6039940/pocket-money-management/assets/60053407/15a35b79-b935-4173-bc63-c29c2a89af8a)
---

## 主な使用技術

| フロントエンド   | バックエンド/DB | 認証     |
| ---------------- | --------------- | -------- |
| React TypeScript | fireStore       | fireAuth |

- その他使用技術

| Style        | UI      | Source Management | Hosting |
| ------------ | ------- | ----------------- | ------- |
| TailWind CSS | deisyUI | Git/GitHub        | netlify |

| library               |
| --------------------- |
| redux toolkit         |
| react-router          |
| @tanstack react-query |
| react-hook-form       |
| zod                   |
| uuid                  |
| reselect              |

---

## リリース履歴

2024/02/27 v1 公開

---

## 制作期間

15日 (2024/02/12 ~ 2024/02/27)

## 開発中

ページネーションの追加
ダークモードの追加
