import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";

const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Steps to integrate",
  };

  const p1 = `
    IBABGateway _gateway;
    modifier onlyKYCAllowed(address account) {
        require(_gateway.isRegistered(account), 'Account should pass KYC');
        _;
    }
  `;

  const p2 = `
    function _beforeTokenTransfer(
      address from,
      address to,
      uint256 amount
    ) internal virtual override onlyKYCAllowed(_msgSender()) {
        super._beforeTokenTransfer(from, to, amount);
    }
  `;

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item-content center-content-mobile reveal-from-left">
              <h3 className="mt-0 mb-12">1. Add modifier to a contract</h3>
              <p className="m-0">
                <pre>{p1}</pre>
              </p>
            </div>

            <div className="split-item-content center-content-mobile reveal-from-left">
              <h3 className="mt-0 mb-12">2. Check identity proof on action</h3>
              <p className="m-0">
                <pre>{p2}</pre>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
