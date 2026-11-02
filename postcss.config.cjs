/* The kit's CSS opens with an @import of Montserrat from fonts.googleapis.com.
   The site serves the font itself (src/fonts.css), so that request is only a
   slower second copy: dropped here, at build time. */
const dropGoogleFonts = {
  postcssPlugin: "drop-google-fonts",
  AtRule: {
    import: (rule) => {
      if (rule.params.includes("fonts.googleapis.com")) rule.remove();
    },
  },
};

module.exports = {
  plugins: [
    dropGoogleFonts,
    require("postcss-preset-mantine"),
    require("postcss-simple-vars")({
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    }),
  ],
};
