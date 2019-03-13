import NextConfig from "next/config";
import NextI18Next from "next-i18next";

const { localeSubpaths } = NextConfig().publicRuntimeConfig;

const NextI18NextInstance = new NextI18Next({
  otherLanguages: ["es"],
  localeSubpaths
});

export default NextI18NextInstance;

export const { appWithTranslation, withNamespaces } = NextI18NextInstance;
