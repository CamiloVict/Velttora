import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './Reveal';

function tagLabel(tag) {
  return typeof tag === 'string' ? tag : tag.label;
}

export function Products() {
  const { t } = useI18n();
  const p = t.products;

  return (
    <section className="products" id="products">
      <div className="container">
        <div className="products-header">
          <div>
            <Reveal className="section-eyebrow">{p.eyebrow}</Reveal>
            <Reveal delay={1} className="section-title">
              {p.titleLine1}
              <br />
              <em>{p.titleLine2}</em>
            </Reveal>
          </div>
          <Reveal
            delay={2}
            className="section-lead"
            style={{ maxWidth: 360, textAlign: 'right' }}
          >
            {p.lead}
          </Reveal>
        </div>

        <div className="products-grid">
          {p.items.map((product) => {
            const isExternal = product.href?.startsWith('http');
            const cardClass = `product-card${product.href ? ' product-card--link' : ''}`;
            const cardLabel = isExternal
              ? `${product.name} — ${p.openWebsite}`
              : `${product.name} — ${p.viewPitch}`;

            const cardBody = (
              <>
                <div className="product-num">{product.num}</div>
                <div className="product-status">{product.status}</div>
                <div className="product-icon">{product.icon}</div>
                <div className="product-name">
                  {product.name}
                  {product.href && <span className="product-external">↗</span>}
                </div>
                <div className="product-tagline">{product.tagline}</div>
                <p className="product-desc">{product.description}</p>
                <div className="product-tags">
                  {product.tags.map((tag) => {
                    const label = tagLabel(tag);
                    const tagHref = typeof tag === 'object' ? tag.href : null;

                    if (tagHref) {
                      return (
                        <span
                          key={label}
                          role="link"
                          tabIndex={0}
                          className="product-tag product-tag--link"
                          aria-label={`${product.name} — ${p.openWebsite}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(tagHref, '_blank', 'noopener,noreferrer');
                          }}
                          onKeyDown={(e) => {
                            if (e.key !== 'Enter' && e.key !== ' ') return;
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(tagHref, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          {label}
                        </span>
                      );
                    }

                    return (
                      <span key={label} className="product-tag">
                        {label}
                      </span>
                    );
                  })}
                </div>
              </>
            );

            return (
              <Reveal key={product.name} delay={product.delay} className="product-card-reveal">
                {product.href ? (
                  <a
                    href={product.href}
                    className={cardClass}
                    aria-label={cardLabel}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {cardBody}
                  </a>
                ) : (
                  <div className={cardClass}>{cardBody}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
