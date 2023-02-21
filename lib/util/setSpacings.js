const defaultSizeLookup = { 1: 4, 2: 16, 3: 24, 4: 32, 5: 48, 6: 64 };

export default options => {
  const defaultPadding = options.defaultPadding || {
    top: { base: 0, sm: 0, lg: 0 },
    bottom: { base: 0, sm: 0, lg: 0 },
  };

  const defaultMargin = options.defaultMargin || {
    top: { base: 0, sm: 0, lg: 0 },
    bottom: { base: 0, sm: 0, lg: 0 },
  };

  const chosenSizeLookup = options.sizeLookup || defaultSizeLookup;

  return {
    setMarginTop: ({ marginTopSmall, marginTopMedium, marginTopLarge }) => {
      const { base, lg, sm } = defaultMargin.top;

      const mtBase = `mt-${setSizes(marginTopSmall || base, chosenSizeLookup)}`;
      const mtSmall = `sm:mt-${setSizes(marginTopMedium || marginTopSmall || sm, chosenSizeLookup)}`;
      const mtLarge = `lg:mt-${setSizes(marginTopLarge || marginTopMedium || marginTopSmall || lg, chosenSizeLookup)}`;

      return `${mtBase} ${mtSmall} ${mtLarge}`;
    },
    setMarginBottom: ({ marginBottomSmall, marginBottomMedium, marginBottomLarge }) => {
      const { base, lg, sm } = defaultMargin.bottom;

      const mbBase = `mb-${setSizes(marginBottomSmall || base, chosenSizeLookup)}`;
      const mbSmall = `sm:mb-${setSizes(marginBottomMedium || marginBottomSmall || sm, chosenSizeLookup)}`;
      const mbLarge = `lg:mb-${setSizes(
        marginBottomLarge || marginBottomMedium || marginBottomSmall || lg,
        chosenSizeLookup
      )}`;

      return `${mbBase} ${mbSmall} ${mbLarge}`;
    },
    setPaddingTop: ({ paddingTopSmall, paddingTopMedium, paddingTopLarge }) => {
      const { base, lg, sm } = defaultPadding.top;

      const ptBase = `pt-${setSizes(paddingTopSmall || base, chosenSizeLookup)}`;
      const ptSmall = `sm:pt-${setSizes(paddingTopMedium || paddingTopSmall || sm, chosenSizeLookup)}`;
      const ptLarge = `lg:pt-${setSizes(
        paddingTopLarge || paddingTopMedium || paddingTopSmall || lg,
        chosenSizeLookup
      )}`;

      return `${ptBase} ${ptSmall} ${ptLarge}`;
    },
    setPaddingBottom: ({ paddingBottomSmall, paddingBottomMedium, paddingBottomLarge }) => {
      const { base, lg, sm } = defaultPadding.bottom;

      const pbBase = `pb-${setSizes(paddingBottomSmall || base, chosenSizeLookup)}`;
      const pbSmall = `sm:pb-${setSizes(paddingBottomMedium || paddingBottomSmall || sm, chosenSizeLookup)}`;
      const pbLarge = `lg:pb-${setSizes(
        paddingBottomLarge || paddingBottomMedium || paddingBottomSmall || lg,
        chosenSizeLookup
      )}`;

      return `${pbBase} ${pbSmall} ${pbLarge}`;
    },
  };
};

const setSizes = function(size, sizeLookup) {
  const foundSize = sizeLookup[size];
  return foundSize || 0;
};
