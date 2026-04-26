import { BIO } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './About.module.scss';

export function About() {
  const firstName = BIO.name.split(' ')[0];

  return (
    <section id="about" className={styles['about']}>
      <div className={styles['about__inner']}>
        <div className={`${styles['about__label']} mono`}>
          <Dot color="var(--moss)" />
          01 · About
        </div>
        <div className={styles['about__body']}>
          <p className={`${styles['about__lede']} serif`}>
            I'm {firstName}. I care about the work, the people doing it, and the odd hours in between when the best ideas show up.
          </p>
          <p className={styles['about__text']}>
            {BIO.about} When I'm away from the screen I'm probably on a bike, making pasta from scratch, or losing at chess to my nine-year-old.
          </p>
        </div>
      </div>
    </section>
  );
}
