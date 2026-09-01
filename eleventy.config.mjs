export default function(eleventyConfig) {
  // Static passthrough — copy to _site/ preserving directory structure
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/scripts");

  // Other entries from a video collection, excluding the current one. Optionally
  // capped at `limit` — omit it to get every other entry (client-side JS then
  // picks a random subset on each page load so the "more work" list stays fresh).
  eleventyConfig.addFilter("otherVideos", function(videos, currentSlug, limit) {
    const others = videos.filter(v => v.slug !== currentSlug);
    return limit ? others.slice(0, limit) : others;
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
