export default function Answer({
  word,
  soundmark,
  onToNextStatement,
}: {
  onToNextStatement: () => void;
  word: string;
  soundmark: string;
}) {
  const audioUrl = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;

  return (
    <div>
      <div>{word}</div>
      <div>{soundmark}</div>
      <div>
        <audio controls autoPlay>
          <source src={audioUrl} type="audio/mpeg"></source>
        </audio>
      </div>
      <button onClick={() => onToNextStatement()}>next</button>
    </div>
  );
}
