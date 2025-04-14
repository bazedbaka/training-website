function Morphology() {
  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p>Фенек — найменший представник родини псових, за розмірами він менший за свійських котів. Морда коротка, загострена. Очі великі.</p>
        </section>
        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
            <li>Висота в загривку 18–22 см, довжина тіла — 30–40 см, хвоста — до 30 см, важить він до 1,5 кг. Морда коротка, загострена</li>
            <li>Очі великі</li>
            <li>Вуха фенека — найбільші серед хижаків відносно до величини голови; вони досягають 15 см у довжину і потрібні для кращого охолодження тіла в денну спеку.</li>
          </ul>
        </section>
        <figure className="text-center">
        <img src="https://s3.animalia.bio/animals/photos/full/1x1/lisichkajpg.webp?id=c066d8276ba3048e1f0fa25b31c3e1fa" alt="Фенек відпочиває на піску" class="img-fluid rounded my-4"/>
        <figcaption class="text-muted">Фенек відпочиває</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;