import backIcon from '../../../assets/figma-296/back.svg';

interface Issue296HeaderProps {
  title: string;
  backLabel?: string;
  onBack?: () => void;
}

export function Issue296Header({ title, backLabel, onBack }: Issue296HeaderProps) {
  return (
    <div className="issue-296-chrome">
      <header className="issue-296-header">
        {onBack ? (
          <button className="issue-296-back" type="button" onClick={onBack} aria-label={backLabel}>
            <img src={backIcon} alt="" />
          </button>
        ) : null}
        <h1>{title}</h1>
      </header>
    </div>
  );
}
