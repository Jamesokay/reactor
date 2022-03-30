import './emojis.css'

export default function Emojis() {
    const emojis = []
    for (var i = 128513; i < 128591; i++) {
      emojis.push(i)
    }   
    return (
        <div className='emojiContainer'>
        {emojis.map((e) => (
          <span key={e}>{String.fromCodePoint(e)}</span>
        ))}
      </div>
    )
}
