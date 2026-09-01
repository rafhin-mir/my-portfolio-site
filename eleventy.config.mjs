export default function(eleventyConfig) {
  // Static passthrough — copy to _site/ preserving directory structure
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/scripts");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // Other entries from a video collection, excluding the current one. Optionally
  // capped at `limit` — omit it to get every other entry (client-side JS then
  // picks a random subset on each page load so the "more work" list stays fresh).
  eleventyConfig.addFilter("otherVideos", function(videos, currentSlug, limit) {
    const others = videos.filter(v => v.slug !== currentSlug);
    return limit ? others.slice(0, limit) : others;
  });

  // Resolve a possibly-relative asset path (e.g. a local poster) against the
  // site's base URL, while leaving already-absolute URLs (e.g. Vimeo CDN
  // thumbnails) untouched — needed since og:image/twitter:image must always
  // be a full absolute URL per the Open Graph / Twitter Card spec.
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    return base + url;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
