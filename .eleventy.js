module.exports = function(eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("assets");
  
  // Process Markdown files
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  
  return {
    dir: {
      input: "content",          // Cel's Obsidian vault for Personal Site
      output: "_site",           // Generated site
      includes: "_includes",     // Templates
      layouts: "_layouts"        // Layout files
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk"
  };
};
