export const Card = (props) => {

  const formatToLocaleDate = (date) =>
    date !== null && date !== undefined
      ? new Date(date).toLocaleDateString('pt-BR')
      : undefined;

  const { id, genre, title, release_date, short_description, thumbnail } = props.data

  return (
    <div className="card" key={id}>
      <div className="title">{title}</div>
      <img className="thumb" src={thumbnail} alt={title}></img>
      <div className="release">Release date: <span className="date">{formatToLocaleDate(release_date)}</span> Genre: <span className="date">{genre}</span></div>
      <p className="description">{short_description}</p>
    </div>
  );
}
