type EmojiProps = {
  label?: string;
  symbol: string;
};

export default function Emoji({ label, symbol }: EmojiProps): JSX.Element {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label || ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
}
