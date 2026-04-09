import styles from './MembershipSection.module.css';

type Pillar = {
  title: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    title: 'Relationship-centered',
    body: 'A dedicated designer who learns your preferences and builds a long-term travel profile—so every trip gets easier and better.',
  },
  {
    title: 'Humanity at our core',
    body: 'Travel should feel calm and cared-for. We handle complexity quietly, with transparency, taste, and attention to detail.',
  },
  {
    title: 'Mutual respect',
    body: 'We work with trusted partners and communities to create experiences that are meaningful, responsible, and genuinely special.',
  },
];

export default function MembershipSection() {
  return (
    <section className={styles.section} id="register">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>The Private Travel Club</div>
          <h2 className={styles.title}>That goes beyond.</h2>
          <p className={styles.subtitle}>
            There are those who travel. And then there are those who travel with complete ease — guided by taste, trust, and a single point of contact.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((p) => (
            <div key={p.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a className={styles.ctaButton} href="/?register=1#register">
            Register your interest
          </a>
          <div className={styles.fine}>
            Or speak to our concierge at <a href="/contact">contact</a>.
          </div>
        </div>
      </div>
    </section>
  );
}

