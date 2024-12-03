const navigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {

  // Add navigation plugin
  eleventyConfig.addPlugin(navigationPlugin);

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  // Posts grouped by year, sorted by date within each year
  eleventyConfig.addCollection("postsByYear", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    const grouped = {};

    // Group posts by year
    posts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    // Sort posts within each year in reverse chronological order
    Object.keys(grouped).forEach(year => {
      grouped[year].sort((a, b) => b.date - a.date);
    });

    // Return Map sorted by year in descending order
    return new Map([...Object.entries(grouped)]
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)));
  });

  eleventyConfig.addCollection("paginatedPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post")
        .sort((a, b) => b.date - a.date);
  });

  /**
   * FILTERS
   */

  // Navigation active state (selected page)
  eleventyConfig.addFilter("isActive", function (pageUrl, currentUrl) {
    console.log(`Comparing: ${pageUrl} with ${currentUrl}`);
    return currentUrl === pageUrl ? "active" : "";
  });

  eleventyConfig.addFilter("groupByYear", posts => {
    const grouped = {};
    posts.forEach(post => {
        const year = new Date(post.date).getFullYear();
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(post);
    });

    // Sort posts within each year
    Object.keys(grouped).forEach(year => {
        grouped[year].sort((a, b) => b.date - a.date);
    });

    return new Map([...Object.entries(grouped)]
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)));
  });

  // Get current page from URL
  eleventyConfig.addFilter("currentPage", function (currentPage) {
    return currentPage.split('/').pop();
  });

  // Date formatting filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', { day: '2-digit', month: 'short', timeZone: 'UTC' });
  });

  eleventyConfig.addFilter("formatDateLong", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      day: '2-digit',
      timeZone: 'UTC'
    });
  });

  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return new Date(dateObj).toISOString();
  });

  // Format date for posts
  eleventyConfig.addFilter("formatDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', { day: '2-digit', month: 'short', timeZone: 'UTC' });
  });

  eleventyConfig.addFilter("slice", (array, start, end) => {
      return array.slice(start, end);
  });

  // Coopy assets for deployment
  eleventyConfig.addPassthroughCopy("src/assets");

  // Directory configuration
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    pathPrefix: "/P81.62.16-KN-Website/"
  };
};