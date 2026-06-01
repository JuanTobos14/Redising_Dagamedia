import { useLanguage } from '../../context/LanguageContext';
import { DIRECTOR_IMAGES, TEAM_IMAGES } from '../../data/aboutUsData';
import styles from './AboutUs.module.css';

function TeamTitle() {
  const { t } = useLanguage();

  return (
    <h3 className={styles['about-team-title']}>
      {t('about_team_title_pre')}
      <span className="text-orange">
        {t('about_team_title_highlight')}
      </span>
      {t('about_team_title_post')}
    </h3>
  );
}

function TextBlock({ titleKey, descriptionKey, className }) {
  const { t } = useLanguage();

  return (
    <div className={className}>
      <h4 className={styles['about-subsection-title']}>
        {t(titleKey)}
      </h4>

      <p className={`${styles['about-subsection-text']} text-normal`}>
        {t(descriptionKey)}
      </p>
    </div>
  );
}

function AboutImage({ image, className, priority = false }) {
  return (
    <div className={`${styles['about-image-card']} ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          '--about-image-fit': image.fit || 'cover',
          '--about-image-position': image.position || 'center',
        }}
      />
    </div>
  );
}

function ImageGroup({ images, wrapperClassName, cardClassName }) {
  return (
    <div className={wrapperClassName}>
      {images.map((image, index) => (
        <AboutImage
          key={image.id}
          image={image}
          className={cardClassName}
          priority={index === 0}
        />
      ))}
    </div>
  );
}

export default function AboutUs() {
  const { t } = useLanguage();

  return (
    <section
      className={`${styles['about-section']} section-padded reveal-on-scroll`}
      id="nosotros"
    >
      <h2 className="section-label">
        {t('about_title')}
      </h2>

      <TeamTitle />

      <p className={`${styles['about-team-desc']} text-normal`}>
        {t('about_team_desc')}
      </p>

      <div className={styles['about-layout']}>
        <div className={styles['about-left-column']}>
          <TextBlock
            className={styles['about-directors-text']}
            titleKey="about_directing_title"
            descriptionKey="about_directing_desc"
          />

          <ImageGroup
            images={TEAM_IMAGES}
            wrapperClassName={styles['about-photos-grid']}
            cardClassName={styles['team-photo']}
          />
        </div>

        <div className={styles['about-right-column']}>
          <ImageGroup
            images={DIRECTOR_IMAGES}
            wrapperClassName={styles['about-character-showcase']}
            cardClassName={styles['director-photo']}
          />

          <TextBlock
            className={styles['about-company-info']}
            titleKey="about_company_title"
            descriptionKey="about_company_desc"
          />
        </div>
      </div>
    </section>
  );
}