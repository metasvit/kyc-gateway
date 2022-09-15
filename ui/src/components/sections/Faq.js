import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const sectionHeader = {
    title: "FAQ",
    // paragraph: 'Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.'
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div>
            <h4>What is this project for?</h4>
            <p className="text-sm mb-0">
              DeFi, DEX, DAO, NFT, IDO and other protocols require to complete
              KYC for participation.
            </p>
          </div>

          <div>
            <h4>What it does?</h4>
            <p className="text-sm mb-0">
              Verifies user`s proof of identity on-chain. For example check user
              identity proof Binance Account Bound token on BSC and use it via a
              smart contact call on another blockchain.
            </p>
          </div>

          <div>
            <h4>How it is done?</h4>
            <p className="text-sm mb-0">
              Merkel-tree created from all collected soul-bound tokens. Merkle
              root stored on a different blockchains.
            </p>
          </div>

          <div>
            <h4>What's next?</h4>
            <ul className="text-sm mb-0">
              <li>Support more blockchains</li>
              <li>Support more identity proofs providers</li>
              <li>Extend Lens protocol</li>
              <li>
                Extend to support more data like NFT cross-chain ownership
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
