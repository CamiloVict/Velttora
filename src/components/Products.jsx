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

            return (
              <Reveal key={product.name} delay={product.delay} className="product-card-reveal">
                <div
                  className={`product-card${product.href ? ' product-card--link' : ''}`}
                >
                  {product.href && (
                    <a
                      href={product.href}
                      className="product-card-hit"
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      aria-label={
                        isExternal
                          ? `${product.name} — ${p.openWebsite}`
                          : `${product.name} — ${p.viewPitch}`
                      }
                    />
                  )}
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
                      const href = typeof tag === 'object' ? tag.href : null;

                      if (href) {
                        return (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="product-tag product-tag--link"
                            aria-label={`${product.name} — ${p.openWebsite}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {label}
                          </a>
                        );
                      }

                      return (
                        <span key={label} className="product-tag">
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
