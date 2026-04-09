import styles from './Values.module.css';

const values = [
  {
    title: 'Uncompromising Luxury',
    description: 'We believe in the luxury of space, time, and silence. Our journeys are private, bespoke, and meticulously curated to the highest standards of comfort.',
    icon: '✨'
  },
  {
    title: 'Unrivaled Expert Access',
    description: 'From senior naturalists to royal historians, we provide access to the people who shape India’s narrative, ensuring every moment is filled with depth.',
    icon: '🗝️'
  },
  {
    title: 'Conservation & Legacy',
    description: 'Luxury travel should be a force for good. We partner with local communities and conservation efforts to ensure India’s heritage and wild spaces endure.',
    icon: '🌿'
  },
  {
    title: 'Bespoke Storytelling',
    description: 'No two journeys are the same. We listen to your desires and craft a narrative that is uniquely yours, from the first greeting to the final farewell.',
    icon: '📖'
  }
];

export default function Values() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="modern-caps" style={{ color: 'var(--gold)', marginBottom: '16px', display: 'block' }}>Our Philosophy</span>
          <h2 className={styles.title}>The Principles of Exceptional Travel</h2>
        </div>
        
        <div className={styles.grid}>
          {values.map((value, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{value.icon}</div>
              <h3 className={styles.cardTitle}>{value.title}</h3>
              <p className={styles.cardDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
