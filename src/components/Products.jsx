import { products } from '../data/products';
import { Reveal } from './Reveal';

export function Products() {
  return (
    <section className="products" id="products">
      <div className="container">
        <div className="products-header">
          <div>
            <Reveal className="section-eyebrow">Our portfolio</Reveal>
            <Reveal delay={1} className="section-title">
              Four bets.
              <br />
              <em>One thesis.</em>
            </Reveal>
          </div>
          <Reveal
            delay={2}
            className="section-lead"
            style={{ maxWidth: 360, textAlign: 'right' }}
          >
            Each product targets a sector where AI can eliminate friction that has existed for
            decades.
          </Reveal>
        </div>

        <div className="products-grid">
          {products.map((product) => {
            const CardTag = product.href ? 'a' : 'div';
            const isExternal = product.href?.startsWith('http');
            const cardProps = product.href
              ? {
                  href: product.href,
                  ...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {}),
                  'aria-label': isExternal
                    ? `${product.name} — open website`
                    : `${product.name} — view pitch deck`,
                }
              : {};

            return (
              <Reveal key={product.name} delay={product.delay}>
                <CardTag
                  className={`product-card${product.href ? ' product-card--link' : ''}`}
                  {...cardProps}
                >
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
                    {product.tags.map((tag) => (
                      <span key={tag} className="product-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardTag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
