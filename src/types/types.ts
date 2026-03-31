export type menuProps = {
  menuOpen: boolean;
};

export type handleMenuProps = {
  handleMenuOpen: (state: boolean) => void;
};

export type animate = {
  animate: boolean
}

export type logoContrastProps = {
  logoOnLight: boolean
}

export type logoClickProps = {
  onLogoClick?: () => void
}
