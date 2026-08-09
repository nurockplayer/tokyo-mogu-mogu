/**
 * UI foundation showcase (Issue #42 dev verification).
 *
 * Renders every shared primitive from `src/ui` so the foundation can be
 * visually verified at 375px and desktop widths. Reaches only the
 * `/_ui` dev route; it is not part of the S0–S8 demo journey.
 */
import { useState } from 'react';
import { Button, ButtonLink, Card, Chip, EmptyState, Header, InfoList, Modal, ProgressBar, RouteStep, Mobility, Segmented, StepDots, StorySection, SupportAction, Tag, Toast } from '../ui';

const INFO_ITEMS = [
  { label: '住所', value: '東京都西多摩郡奥多摩町氷川' },
  { label: 'アクセス', value: 'JR青梅線 奥多摩駅から徒歩約10分' },
  { label: '営業時間', value: '9:00–17:00（水曜定休）' },
  { label: '料金', value: '入場無料' },
];

export function UiShowcasePage() {
  const [segIndex, setSegIndex] = useState(0);
  return (
    <div className="tmm-page">
      <Header logo="東京もぐもぐ" tagline="知って、訪れて、応援する。東京の食文化の旅。">
        <div className="tmm-locale-toggle">
          <button type="button" className="tmm-locale-toggle__btn" aria-pressed="true">JA</button>
          <button type="button" className="tmm-locale-toggle__btn" aria-pressed="false">EN</button>
          <button type="button" className="tmm-locale-toggle__btn" aria-pressed="false">繁中</button>
        </div>
      </Header>

      <h2>Segmented control</h2>
      <Segmented
        label="コースの長さを選ぶ"
        selected={segIndex}
        onChange={setSegIndex}
        options={[
          { key: 'half', label: '半日コース' },
          { key: 'full', label: '1日コース' },
        ]}
      />

      <h2>Buttons</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '12px 0' }}>
        <Button>はじめる</Button>
        <Button variant="secondary">戻る</Button>
        <Button variant="orange">GET!</Button>
        <Button disabled>無効</Button>
        <ButtonLink variant="secondary" href="#/">Link button</ButtonLink>
      </div>

      <h2>Chips</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '12px 0' }}>
        <Chip selected>卵・乳製品なし</Chip>
        <Chip>魚介アレルギー</Chip>
        <Chip>ベジタリアン</Chip>
        <Chip>制限はありません</Chip>
      </div>

      <h2>Progress</h2>
      <ProgressBar value={2} max={5} label="質問 3 / 5" />
      <div style={{ margin: '16px 0' }}>
        <StepDots total={5} current={2} />
      </div>

      <h2>Cards</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <Card>
          <strong>診断結果</strong>
          <p>あなたに合った食文化はこちら</p>
        </Card>
        <Card feature>
          <strong>奥多摩 × 東京わさび</strong>
          <p>山あいの清水が育む、300年以上の歴史。</p>
        </Card>
      </div>

      <h2>Story section</h2>
      <StorySection kicker="STORY 01" title="なぜ奥多摩で生まれたのか">
        <p>多摩川の上流、奥多摩の谷あいを流れる清水は、東京わさびの栽培に理想的な環境を育んできました。</p>
      </StorySection>

      <h2>Route step</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <RouteStep number={1} name="奥多摩わさび栽培場" role="わさび田の作り手に出会う">
          <Mobility mode="train" duration="約60分" />
        </RouteStep>
        <RouteStep number={2} name="奥多摩町観光案内所" role="地域の情報を集める">
          <Mobility mode="walk" duration="約10分" />
        </RouteStep>
      </div>

      <h2>Practical info</h2>
      <InfoList items={INFO_ITEMS} />

      <h2>Support actions</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <SupportAction icon="🛒" title="買う" description="生産者のわさび加工品を購入すると、作り手の継承を直接支えます。" href="https://example.com">
          詳細を見る
        </SupportAction>
        <SupportAction icon="💌" title="寄付する" description="継承支援の仕組みは調整中です。" disabled>
          準備中
        </SupportAction>
      </div>

      <h2>Tags</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
        <Tag tone="success">営業中</Tag>
        <Tag tone="warning">要予約</Tag>
        <Tag tone="danger">定休日</Tag>
        <Tag tone="info">英語対応</Tag>
      </div>

      <h2>Toast & modal</h2>
      <Toast message="旅程を保存しました" onClose={() => {}} />
      <Modal open title="確認" actions={<Button variant="secondary">キャンセル</Button>}>
        <p>この操作を実行しますか？</p>
      </Modal>

      <h2>Empty state</h2>
      <EmptyState
        icon="🗺️"
        title="まだ旅程がありません"
        description="診断から始めて、あなたのモデルルートを作ってみましょう。"
        action={<Button variant="secondary">診断を始める</Button>}
      />
    </div>
  );
}
