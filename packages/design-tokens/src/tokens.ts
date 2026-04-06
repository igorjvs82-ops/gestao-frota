export const colorTokens = {
  brand: {
    deep: {
      900: "#0B1020",
      800: "#111933",
      700: "#1E2A52",
      600: "#2A3A73"
    }
  },
  accent: {
    pastoral: {
      500: "#8B5CF6",
      400: "#A78BFA",
      300: "#C4B5FD"
    }
  },
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F4F4F5",
    300: "#D4D4D8",
    500: "#71717A",
    700: "#3F3F46",
    900: "#18181B",
    950: "#09090B"
  },
  semantic: {
    success: { 500: "#22C55E" },
    warning: { 500: "#F59E0B" },
    error: { 500: "#EF4444" },
    info: { 500: "#3B82F6" }
  }
} as const;

export const roleColorTokens = {
  dark: {
    bg: {
      canvas: "#09090B",
      elevated: "#111933",
      inverse: "#FAFAFA"
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#D4D4D8",
      muted: "#A1A1AA",
      inverse: "#18181B"
    },
    border: {
      subtle: "#27272A",
      strong: "#3F3F46"
    }
  },
  light: {
    bg: {
      canvas: "#FFFFFF",
      elevated: "#FAFAFA",
      inverse: "#111933"
    },
    text: {
      primary: "#18181B",
      secondary: "#3F3F46",
      muted: "#71717A",
      inverse: "#FAFAFA"
    },
    border: {
      subtle: "#E4E4E7",
      strong: "#D4D4D8"
    }
  }
} as const;

export const typographyTokens = {
  fontFamily: {
    sans: "Inter, system-ui, sans-serif",
    serif: '"Source Serif 4", Georgia, serif'
  },
  fontSize: {
    caption: "12px",
    bodySm: "14px",
    bodyMd: "16px",
    bodyLg: "18px",
    h4: "20px",
    h3: "24px",
    h2: "32px",
    h1: "40px",
    display1: "56px",
    display2: "64px"
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7
  }
} as const;

export const spacingTokens = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px"
} as const;

export const radiusTokens = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "999px"
} as const;

export const shadowTokens = {
  sm: "0 1px 2px rgba(9, 9, 11, 0.12)",
  md: "0 8px 24px rgba(9, 9, 11, 0.16)",
  lg: "0 16px 40px rgba(9, 9, 11, 0.22)"
} as const;

export const motionTokens = {
  duration: {
    fast: "120ms",
    normal: "180ms",
    slow: "260ms"
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    productive: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  }
} as const;
