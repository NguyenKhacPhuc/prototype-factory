export interface DesignSystem {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  backgroundColor: string;
  fontFamily: string;
  style: string;
}

export interface Prototype {
  folder: string;
  appName: string;
  tagline: string;
  designSystem: DesignSystem;
  screens: string[];
  description: string;
  features: (string | { title: string; detail: string })[];
  audience: string;
  category: string;
  useCases: string[];
  hasScreenshot?: boolean;
}
